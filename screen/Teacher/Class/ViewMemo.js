import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Keyboard, Alert } from "react-native";
import { Surface, TextInput, Button, List } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/MyBase";
import Modal from "react-native-modal";

export default ViewMemo = ({ navigation, route }) => {
    const classData = route.params?.classData;
    const [loading, setLoading] = useState(true);
    const [classMemo, setClassMemo] = useState(classData.memo);
    const [modalVisible, setModalVisible] = useState(false);
    const [memoText, setMemoText] = useState("");
    const [isNew, setIsNew] = useState(false);
    const [memoIndex, setMemoIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const day = ["월", "화", "수", "목", "금", "토", "일"];

    const getMemo = async () => {
        await getDoc(doc(db, "classes", classData.id)).then((classDoc) => {
            setClassMemo(classDoc.data().memo);
        });
    };

    useEffect(() => {
        if (loading) {
            getMemo().then(() => {
                setLoading(false);
            });
        }
    }, [loading]);

    const DayTime = () => {
        return (
            <List.Section>
                <List.Accordion
                    title={"수업 요일 " + classData.dayString}
                    expanded={expanded}
                    onPress={() => setExpanded(!expanded)}
                    left={(props) => <List.Icon {...props} icon={expanded ? "chevron-down" : "chevron-right"} />}
                    right={() => undefined}
                    style={{ padding: 0, backgroundColor: "#e6f7ff" }}
                    titleStyle={{ fontWeight: "bold", fontSize: 20 }}
                >
                    {classData.dayBool.map((b, index) => {
                        if (b) {
                            const timeString =
                                classData.dayTime[index].startHour +
                                ":" +
                                classData.dayTime[index].startMinute +
                                " ~ " +
                                classData.dayTime[index].endHour +
                                ":" +
                                classData.dayTime[index].endMinute;
                            return (
                                <List.Item
                                    key={index}
                                    style={{ paddingLeft: 40 }}
                                    title={timeString}
                                    left={(props) => (
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{day[index] + " "}</Text>
                                        </View>
                                    )}
                                />
                            );
                        }
                    })}
                </List.Accordion>
            </List.Section>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#e6f7ff" }}>
            <Modal
                isVisible={modalVisible}
                coverScreen={false}
                onBackdropPress={() => {
                    setModalVisible(false);
                    setMemoText("");
                }}
                style={{ alignItems: "center" }}
            >
                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: wp("70%"),
                            height: hp("30%"),
                            backgroundColor: "white",
                            padding: 10,
                        }}
                    >
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 20 }}>{isNew ? "메모 입력" : "메모 수정"}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <TextInput
                                multiline={true}
                                value={memoText}
                                onChangeText={setMemoText}
                                style={{ width: wp("60%"), height: hp("10%") }}
                            />
                        </View>
                        {isNew ? (
                            <Button
                                mode="contained"
                                color="skyblue"
                                style={{ width: wp("60%") }}
                                onPress={async () => {
                                    await updateDoc(doc(db, "classes", classData.id), { memo: [...classMemo, memoText] });
                                    Alert.alert("", "저장되었습니다", [
                                        {
                                            text: "확인",
                                            onPress: () => {
                                                setMemoText("");
                                                setLoading(true);
                                                setModalVisible(false);
                                            },
                                        },
                                    ]);
                                }}
                            >
                                등록
                            </Button>
                        ) : (
                            <View style={{ flexDirection: "row" }}>
                                <Button
                                    mode="contained"
                                    color="#ff6666"
                                    style={{ width: wp("29%"), marginRight: 5 }}
                                    onPress={async () => {
                                        await updateDoc(doc(db, "classes", classData.id), {
                                            memo: arrayRemove(classMemo[memoIndex]),
                                        });
                                        Alert.alert("", "삭제되었습니다", [
                                            {
                                                text: "확인",
                                                onPress: () => {
                                                    setMemoText("");
                                                    setMemoIndex(0);
                                                    setLoading(true);
                                                    setModalVisible(false);
                                                },
                                            },
                                        ]);
                                    }}
                                >
                                    삭제
                                </Button>
                                <Button
                                    mode="contained"
                                    color="skyblue"
                                    style={{ width: wp("29%") }}
                                    onPress={async () => {
                                        let tempMemo = [...classMemo];
                                        tempMemo[memoIndex] = memoText;
                                        await updateDoc(doc(db, "classes", classData.id), { memo: tempMemo });
                                        Alert.alert("", "수정되었습니다", [
                                            {
                                                text: "확인",
                                                onPress: () => {
                                                    setMemoText("");
                                                    setMemoIndex(0);
                                                    setLoading(true);
                                                    setModalVisible(false);
                                                },
                                            },
                                        ]);
                                    }}
                                >
                                    수정
                                </Button>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 7 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 30, marginRight: 10 }}>{classData.className}</Text>
                    <Text style={{ fontSize: 15, marginRight: 10 }}>{classData.count}회 수업</Text>
                    <Text style={{ fontSize: 15 }}>{classData.studentName} 학생</Text>
                </View>
                <DayTime />
            </View>
            <ScrollView
                style={{ flex: 1, alignSelf: "stretch" }}
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
            >
                {loading ? (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text>Loading...</Text>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity
                            style={{ marginVertical: 5 }}
                            onPress={() => {
                                setModalVisible(true);
                                setIsNew(true);
                            }}
                        >
                            <Surface
                                style={{
                                    width: wp("90%"),
                                    height: hp("7%"),
                                    paddingHorizontal: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 10,
                                }}
                            >
                                <AntDesign name="plus" size={24} color="black" />
                            </Surface>
                        </TouchableOpacity>
                        {classMemo.map((m, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{ marginVertical: 5 }}
                                onPress={() => {
                                    setMemoText(m);
                                    setMemoIndex(index);
                                    setModalVisible(true);
                                    setIsNew(false);
                                }}
                            >
                                <Surface
                                    style={{
                                        width: wp("90%"),
                                        height: hp("7%"),
                                        paddingHorizontal: 10,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text>{m}</Text>
                                </Surface>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
};
