import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { db, auth } from "../config/MyBase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";
import { AuthContext } from "./Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TNavigator from "./Teacher/TNavigator";
import SNavigator from "./Student/SNavigator";

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user.uid);
                const tempUid = await AsyncStorage.getItem("userToken");
                if (tempUid === user.uid) {
                    await getData(user).then(() => {
                        setIsLoading(false);
                    });
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
