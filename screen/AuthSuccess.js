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
import { Alert, Keyboard, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

const Stack = createNativeStackNavigator();
const MyStack = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { signOut, errorHandle } = useContext(AuthContext);
    const [isTeacher, setIsTeacher] = useState(false);
    const [firstLogin, setFirstLogin] = useState(false);

    const getData = async (user) => {
        await getDoc(doc(db, "users", user.uid))
            .then(async (userDoc) => {
                if (!userDoc.exists()) {
                    signOut();
                } else {
                    const dbIsTeacher = userDoc.data().isTeacher;
                    const dbFirstLogin = userDoc.data().firstLogin;
                    setIsTeacher(dbIsTeacher);
                    setFirstLogin(dbFirstLogin);
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

    const UpdateProfile = ({ navigation, route }) => {
        const [address, setAddress] = useState("");
        const [education, setEducation] = useState("");
        const [open, setOpen] = useState(false);
        const [educations, setEducations] = useState([
            { label: "최하위", value: "최하위" },
            { label: "하위", value: "하위" },
            { label: "중하위", value: "중하위" },
            { label: "중위", value: "중위" },
            { label: "중상위", value: "중상위" },
            { label: "상위", value: "상위" },
            { label: "최상위", value: "최상위" },
        ]);

        return (
            <SafeAreaView>
                <TouchableOpacity style={{ height: "100%", padding: 30 }} onPress={Keyboard.dismiss} accessible={false} activeOpacity={1}>
                    <View style={{ padding: 20 }}>
                        <Text>지금 살고 있는 지역은?</Text>
                        <TextInput value={address} onChangeText={setAddress} mode="outlined" style={{ marginBottom: 0 }} dense={true} />
                        <HelperText type="info" visible={true} padding="none">
                            예) 인천광역시 미추홀구 용현동
                        </HelperText>
                    </View>
                    {isTeacher ? (
                        <View style={{ padding: 20 }}>
                            <Text>최종 학력</Text>
                            <TextInput
                                value={education}
                                onChangeText={setEducation}
                                mode="outlined"
                                style={{ marginBottom: 0 }}
                                dense={true}
                            />
                            <HelperText type="info" visible={true} padding="none">
                                예) 인하대학교
                            </HelperText>
                        </View>
                    ) : (
                        <View style={{ padding: 20, zIndex: 500 }}>
                            <Text>자신의 성적 수준은?</Text>
                            <DropDownPicker
                                open={open}
                                value={education}
                                items={educations}
                                setOpen={setOpen}
                                setValue={setEducation}
                                setItems={setEducations}
                                placeholder="학력"
                            />
                            <HelperText type="info" visible={true} padding="none">
                                솔직하게 골라야 매칭이 정확하게 이루어집니다.
                            </HelperText>
                        </View>
                    )}
                    <View style={{ padding: 20 }}>
                        <Button
                            mode="contained"
                            onPress={async () => {
                                await updateDoc(doc(db, "users", auth.currentUser.uid), {
                                    address: address,
                                    education: education,
                                    firstLogin: false,
                                }).then(() => navigation.navigate(isTeacher ? "Teacher" : "Student"));
                            }}
                            disabled={address === "" || education === ""}
                        >
                            확인
                        </Button>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        );
    };

    return (
        <Stack.Navigator>
            {isLoading ? (
                <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
            ) : isTeacher ? (
                <>
                    {firstLogin ? <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }} /> : null}
                    <Stack.Screen name="Teacher" component={TNavigator} options={{ gestureEnabled: false, headerShown: false }} />
                </>
            ) : (
                <>
                    {firstLogin ? <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }} /> : null}
                    <Stack.Screen name="Student" component={SNavigator} options={{ gestureEnabled: false, headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default AuthSuccess = ({ navigation, route }) => {
    return <MyStack />;
};
