import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Alert, RefreshControl, StatusBar, Platform } from "react-native";
import { Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { auth, db } from "../../../config/MyBase";
import { arrayRemove, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { pushNotificationsToPerson } from "../../../config/MyExpo";
import { uploadNewClassSchedule } from "../../../config/calendarFunctions.js";
import style from "../../style";

export default ClassList = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [myClass, setMyClass] = useState([]);
    const day = ["월", "화", "수", "목", "금", "토", "일"];

    const getClass = async () => {
        await getDoc(doc(db, "users", auth.currentUser.uid)).then(async (document) => {
            const classId = document.data().myClass;
            let temp = [];

            const promises = classId.map(async (id) => {
                await getDoc(doc(db, "classes", id)).then(async (document) => {
                    let docTemp = document.data();
                    const { dayBool, teacherUid } = docTemp;

                    await getDoc(doc(db, "users", teacherUid)).then((teacher) => {
                        docTemp.teacherName = teacher.data().name;
                    });
                    let dayString = "";
                    dayBool.forEach((bool, index) => {
                        if (bool) {
                            dayString += day[index] + " ";
                        }
                    });
                    docTemp.dayString = dayString;
                    docTemp.id = id;
                    temp.push(docTemp);
                });
            });
            await Promise.all(promises);

            setMyClass(temp);
        });
    };

    const isFocused = useIsFocused();

    const onRefresh = () => {
        getClass().then(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        if (isFocused) onRefresh();
    }, [isFocused]);

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: style.colorList.skyBlue,
            }}
        >
            <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "default"} />
            <View style={{ flex: 10, alignSelf: "stretch", paddingVertical: 15 }}>
                <ScrollView
                    style={{ flex: 1, alignSelf: "stretch" }}
                    contentContainerStyle={{ alignItems: "center" }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                >
                    {loading ? (
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text>Loading...</Text>
                        </View>
                    ) : (
                        <>
                            {myClass.map((c, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{ marginVertical: 10 }}
                                    onPress={() => {
                                        if (!c.studentAccept) {
                                            Alert.alert("초대 수락하시겠습니까?", "", [
                                                {
                                                    text: "거절",
                                                    onPress: () => {
                                                        Alert.alert(
                                                            "정말로 거절하시겠습니까?",
                                                            "",
                                                            [
                                                                { text: "취소" },
                                                                {
                                                                    text: "확인",
                                                                    onPress: async () => {
                                                                        await updateDoc(doc(db, "users", auth.currentUser.uid), {
                                                                            myClass: arrayRemove(c.id),
                                                                        });
                                                                        await updateDoc(doc(db, "users", c.teacherUid), {
                                                                            myClass: arrayRemove(c.id),
                                                                        });
                                                                        await deleteDoc(doc(db, "classes", c.id)).then(async () => {
                                                                            await pushNotificationsToPerson(
                                                                                auth.currentUser.displayName,
                                                                                c.teacherUid,
                                                                                "초대 거절함",
                                                                                `${auth.currentUser.displayName}이 거절하였습니다`
                                                                            );
                                                                            onRefresh();
                                                                        });
                                                                    },
                                                                },
                                                            ],
                                                            { cancelable: false }
                                                        );
                                                    },
                                                },
                                                {
                                                    text: "수락",
                                                    onPress: async () => {
                                                        uploadNewClassSchedule(c);
                                                        await updateDoc(doc(db, "classes", c.id), {
                                                            studentAccept: true,
                                                        }).then(async () => {
                                                            await pushNotificationsToPerson(
                                                                auth.currentUser.displayName,
                                                                c.teacherUid,
                                                                "초대 수락함",
                                                                `${auth.currentUser.displayName}이 수락하였습니다`
                                                            );
                                                            onRefresh();
                                                        });
                                                    },
                                                },
                                            ]);
                                        } else {
                                            navigation.navigate("ViewClass", { classData: c });
                                        }
                                    }}
                                >
                                    <Surface
                                        style={{
                                            width: wp("90%"),
                                            height: hp("15%"),
                                            paddingHorizontal: 20,
                                            justifyContent: "center",
                                            backgroundColor: c.studentAccept ? "white" : "#ff4d4d",
                                            marginBottom: 10,
                                            borderRadius: 15,
                                        }}
                                    >
                                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{c.className}</Text>
                                            <Text style={{ marginLeft: 10 }}>{c.teacherName} 선생님</Text>
                                        </View>
                                        <Text style={{ marginTop: 8 }}>{c.dayString}</Text>
                                        {c.studentAccept ? null : <Text style={{ marginTop: 8 }}>아직 수락안함</Text>}
                                    </Surface>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};
