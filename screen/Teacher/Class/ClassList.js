import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, RefreshControl, StatusBar, Platform } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { auth, db } from "../../../config/MyBase";
import { doc, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
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
                    const { dayBool, studentUid } = docTemp;
                    docTemp.id = document.id;

                    await getDoc(doc(db, "users", studentUid)).then((student) => {
                        docTemp.studentName = student.data().name;
                    });
                    let dayString = "";
                    dayBool.forEach((bool, index) => {
                        if (bool) {
                            dayString += day[index] + " ";
                        }
                    });
                    docTemp.dayString = dayString;
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
                                    onPress={() => navigation.navigate("ViewClass", { classData: c })}
                                >
                                    <Surface
                                        style={{
                                            width: wp("90%"),
                                            height: hp("15%"),
                                            paddingHorizontal: 15,
                                            justifyContent: "center",
                                            backgroundColor: c.studentAccept ? "white" : "#ff4d4d",
                                            marginBottom: 10,
                                            borderRadius: 15,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "flex-end",
                                            }}
                                        >
                                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{c.className}</Text>
                                            <Text
                                                style={{
                                                    marginLeft: 10,
                                                    fontSize: 18,
                                                    fontWeight: "300",
                                                }}
                                            >
                                                {c.studentName} 학생
                                            </Text>
                                        </View>
                                        <Text style={{ marginTop: 8 }}>{c.dayString}</Text>
                                        {c.studentAccept ? (
                                            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                                {c.memo.length === 0 ? (
                                                    <Text style={{ marginTop: 8 }}>메모 없음</Text>
                                                ) : (
                                                    <Text style={{ marginTop: 8 }}>{c.memo[c.memo.length - 1]}</Text>
                                                )}
                                                <TouchableOpacity onPress={() => navigation.navigate("ViewMemo", { classData: c })}>
                                                    <MaterialCommunityIcons
                                                        name="pencil-box-outline"
                                                        size={19}
                                                        color="black"
                                                        style={{ marginLeft: 3 }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <Text style={{ marginTop: 8 }}>아직 수락안함</Text>
                                        )}
                                    </Surface>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => navigation.navigate("AddClass")}>
                                <Surface
                                    style={{
                                        width: wp("90%"),
                                        height: hp("15%"),
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: style.colorList.navy,
                                        borderRadius: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            borderWidth: 2,
                                            borderColor: "white",
                                            borderRadius: 10,
                                            width: wp("86%"),
                                            height: hp("13%"),
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <AntDesign name="pluscircleo" size={24} color="white" />
                                        <Text style={{ color: "white", margin: 10, fontSize: 20 }}>새 수업 등록하기</Text>
                                    </View>
                                </Surface>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};
