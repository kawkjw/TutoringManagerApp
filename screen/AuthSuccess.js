import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { db, auth } from "../config/MyBase";
import { onAuthStateChanged } from "firebase/auth";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";
import { AuthContext } from "./Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TNavigator from "./Teacher/TNavigator";
import SNavigator from "./Student/SNavigator";
import { registerForPushNotificationAsync } from "../config/MyExpo";
import { Alert } from "react-native";

const Stack = createNativeStackNavigator();
const MyStack = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { signOut, errorHandle } = useContext(AuthContext);
    const [isTeacher, setIsTeacher] = useState(false);

    const getData = async (user) => {
        await getDoc(doc(db, "users", user.uid))
            .then(async (userDoc) => {
                if (!userDoc.exists()) {
                    signOut();
                } else {
                    const dbIsTeacher = userDoc.data().isTeacher;
                    setIsTeacher(dbIsTeacher);
                }
            })
            .catch((error) => {
                if (error.code === "permission-denied") {
                    alert("권한 거부");
                    signOut();
                }
            });
    };

    const storeNotificationToken = async (user) => {
        let notificationToken = null;
        let num = 0;
        while (notificationToken === null) {
            num = num + 1;
            notificationToken = await AsyncStorage.getItem("notificationToken");
            if (num === 100) {
                break;
            }
        }
        if (num === 100) {
            return;
        }
        if (notificationToken !== null) {
            await updateDoc(doc(db, "users", user.uid), { expoTokens: arrayUnion(notificationToken) });
        }
    };

    const execPromise = async (user) => {
        await registerForPushNotificationAsync()
            .then(async () => {
                await getData(user).then(async () => {
                    await storeNotificationToken(user).then(() => {
                        setIsLoading(false);
                    });
                });
            })
            .catch((error) => {
                Alert.alert(error.code, error.message.split(":")[0]);
                errorHandle();
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user.uid);
                const tempUid = await AsyncStorage.getItem("userToken");
                if (tempUid === user.uid) {
                    await execPromise(user);
                } else {
                    signOut();
                }
            } else {
                errorHandle();
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <Stack.Navigator>
            {isLoading ? (
                <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
            ) : isTeacher ? (
                <Stack.Screen name="Teacher" component={TNavigator} options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="Student" component={SNavigator} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
};

export default AuthSuccess = ({ navigation, route }) => {
    return <MyStack />;
};
