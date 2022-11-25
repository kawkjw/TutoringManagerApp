import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { db, auth } from "../config/MyBase";
import {
    PhoneAuthProvider,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    updatePhoneNumber,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import AuthSuccess from "./AuthSuccess";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ResetPw from "./Auth/ResetPw";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();

export default Auth = () => {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    const restoreToken = async () => {
        let userToken;
        try {
            userToken = await AsyncStorage.getItem("userToken");
            return userToken;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            await restoreToken().then((token) => {
                dispatch({ type: "RESTORE_TOKEN", token: token });
            });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!state.isLoading) {
                await SplashScreen.hideAsync().catch(console.warn);
            }
        })();
    }, [state.isLoading]);

    const authContext = useMemo(
        () => ({
            signIn: async (data) => {
                const { email, password } = data;
                await signInWithEmailAndPassword(auth, email, password)
                    .then(async (response) => {
                        await AsyncStorage.setItem("userToken", response.user.uid);
                        dispatch({ type: "SIGN_IN", token: response.user.uid });
                    })
                    .catch((error) => {
                        if (error.code === "auth/wrong-password") {
                            Alert.alert("경고", "잘못된 비밀번호입니다.", [{ text: "확인" }], {
                                cancelable: false,
                            });
                        } else if (error.code === "auth/invalid-email") {
                            Alert.alert("경고", "잘못된 이메일 형식입니다.", [{ text: "확인" }], {
                                cancelable: false,
                            });
                        } else if (error.code === "auth/user-not-found") {
                            Alert.alert("경고", "가입되지 않은 아이디입니다.", [{ text: "확인" }], {
                                cancelable: false,
                            });
                        } else {
                            Alert.alert("Error", error.message, [{ text: "확인" }], {
                                cancelable: false,
                            });
                        }
                        //throw Error();
                    });
            },
            signOut: async () => {
                const token = await AsyncStorage.getItem("notificationToken");
                await updateDoc(doc(db, "users", auth.currentUser.uid), { expoTokens: arrayRemove(token) });
                signOut(auth);
                await AsyncStorage.multiRemove(["userToken", "notificationToken"]);
                dispatch({ type: "SIGN_OUT" });
            },
            signUp: async (data) => {
                const { name, phoneNumber, userId, password, verificationId, verifyCode, isTeacher } = data;
                if (userId.length < 8) {
                    Alert.alert("경고", "아이디는 8자 이상으로 해주시기 바랍니다.", [{ text: "확인" }], { cancelable: false });
                    return;
                }
                await createUserWithEmailAndPassword(auth, userId + "@test.com", password)
                    .then(async (userCredential) => {
                        const currentUser = {
                            id: userCredential.user.uid,
                            userId: userId,
                            name: name,
                            phoneNumber: phoneNumber,
                            createdDate: new Date(userCredential.user.metadata.creationTime),
                        };

                        const phoneCredential = PhoneAuthProvider.credential(verificationId, verifyCode);
                        await updatePhoneNumber(userCredential.user, phoneCredential)
                            .then()
                            .catch((error) => {
                                userCredential.user.delete();
                                throw Error(error.code);
                            });

                        await updateProfile(userCredential.user, {
                            displayName: currentUser.name,
                        });

                        await getDoc(doc(db, "users", currentUser.id)).then(async (user) => {
                            if (!user.exists()) {
                                await setDoc(doc(db, "users", currentUser.id), {
                                    uid: currentUser.id,
                                    name: currentUser.name,
                                    phoneNumber: currentUser.phoneNumber,
                                    id: currentUser.userId,
                                    createdDate: currentUser.createdDate,
                                    memo: "",
                                    isTeacher: isTeacher,
                                    myClass: [],
                                    expoTokens: [],
                                    education: "",
                                    address: "",
                                    firstLogin: true,
                                });
                                await setDoc(doc(db, "ids", currentUser.id), {
                                    id: currentUser.userId,
                                });
                            }
                        });
                    })
                    .then(() => {
                        Alert.alert("성공", "회원가입이 완료되었습니다.", [{ text: "확인" }], { cancelable: false });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        if (errorCode === "auth/email-already-in-use") {
                            Alert.alert("경고", "이미 사용된 이메일입니다.", [{ text: "확인" }], {
                                cancelable: false,
                            });
                        } else {
                            if (errorMessage === "auth/invalid-verification-code") {
                                Alert.alert("경고", "잘못된 인증 코드입니다.", [{ text: "확인" }], {
                                    cancelable: false,
                                });
                            } else if (errorMessage === "auth/credential-already-in-use") {
                                Alert.alert("경고", "이미 가입된 휴대폰번호입니다."), [{ text: "확인" }], { cancelable: false };
                            } else {
                                Alert.alert("Error", errorCode + "\n" + errorMessage, [{ text: "확인" }], { cancelable: false });
                            }
                        }
                        throw Error(errorMessage);
                    });
            },
            errorHandle: async () => {
                const keys = await AsyncStorage.getAllKeys();
                if (keys.length > 0) await AsyncStorage.multiRemove(keys);
                dispatch({ type: "SIGN_OUT" });
            },
        }),
        []
    );

    const renderGoBackButton = (navigation) => (
        <TouchableOpacity
            style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
            }}
            onPress={() => navigation.goBack()}
        >
            <MaterialIcons name="arrow-back-ios" size={25} color="black" />
        </TouchableOpacity>
    );

    const ShowSplash = () => {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={require("../assets/splash.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
        );
    };

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerTitleStyle: { color: "white" },
                    }}
                >
                    {state.isLoading ? (
                        <Stack.Screen name="loading" component={ShowSplash} options={{ headerShown: false }} />
                    ) : state.userToken === null ? (
                        <>
                            <Stack.Screen
                                name="signin"
                                component={SignIn}
                                options={{
                                    headerShown: false,
                                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                                }}
                            />
                            <Stack.Screen
                                name="resetpw"
                                component={ResetPw}
                                options={({ navigation }) => ({
                                    title: "비밀번호 초기화",
                                    gestureEnabled: false,
                                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                                    headerLeft: () => renderGoBackButton(navigation),
                                })}
                            />
                            <Stack.Screen
                                name="signup"
                                component={SignUp}
                                options={({ navigation }) => ({
                                    title: "회원가입",
                                    gestureEnabled: false,
                                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                                    headerLeft: () => renderGoBackButton(navigation),
                                })}
                            />
                        </>
                    ) : (
                        <Stack.Screen
                            name="AuthSuccess"
                            component={AuthSuccess}
                            options={{
                                headerShown: false,
                            }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};
