import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { db, auth } from "../config/MyBase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";
import { AuthContext } from "./Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Test from "./Test";

const Stack = createNativeStackNavigator();
const MyStack = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { signOut, errorHandle } = useContext(AuthContext);

    const getData = async (user) => {
        await getDoc(doc(db, "users", user.uid))
            .then(async (userDoc) => {
                if (!userDoc.exists()) {
                    signOut();
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
            ) : (
                <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
};

export default AuthSuccess = ({ navigation, route }) => {
    return <MyStack />;
};
