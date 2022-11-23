import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform, Keyboard, Alert } from "react-native";
import { ProgressBar, Surface, TextInput, Button } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/MyBase";

export default ViewLog = ({ navigation, route }) => {
    const classData = route.params?.classData;
    const logData = route.params?.logData;
    const isNew = route.params?.isNew;
    const [date, setDate] = useState(new Date());
    const [pickerShow, setPickerShow] = useState(false);
    const [todayStudy, setTodayStudy] = useState("");
    const [nextStudy, setNextStudy] = useState("");
    const [homework, setHomework] = useState("");
    const [progress, setProgress] = useState("0");
    const [modifyProgress, setModifyProgress] = useState(false);
    const [bookName, setBookName] = useState("");
    const [modifyBookName, setModifyBookName] = useState(isNew);
    const [count, setCount] = useState(classData.count + 1);
    const [isChange, setIsChange] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setPickerShow(false);
        setDate(currentDate);
    };

    useEffect(() => {
        if (Number(progress) > 100) {
            setProgress("100");
        }
    }, [progress]);

    useEffect(() => {
        if (!isNew) {
            setDate(logData.date.toDate());
            setTodayStudy(logData.todayStudy);
            setNextStudy(logData.nextStudy);
            setHomework(logData.homework);
            setProgress(logData.progress.toString());
            setCount(logData.count);
            setBookName(logData.bookName);
        } else {
            if (route.params?.prevLog !== undefined) {
                const { bookName: prevBook, progress: prevProgress } = route.params?.prevLog;
                if (prevProgress < 100) {
                    setBookName(prevBook);
                    setModifyBookName(false);
                    setProgress(prevProgress.toString());
                }
            }
        }
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#e6f7ff" }}>
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 7 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 30, marginRight: 10 }}>{classData.className}</Text>
                    <Text style={{ fontSize: 15 }}>{classData.studentName} 학생</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {Platform.OS === "ios" ? (
                        <DateTimePicker value={date} mode="date" onChange={onChange} locale="ko" style={{ flex: 1, marginRight: 5 }} />
                    ) : (
                        <>
                            {pickerShow && <DateTimePicker value={date} mode="date" onChange={onChange} locale="ko" />}
                            <TouchableOpacity style={{ marginRight: 5 }} onPress={() => setPickerShow(true)}>
                                <Text style={{ color: "blue", fontWeight: "bold", fontSize: 20 }}>
                                    {moment(date).format("YYYY. MM. DD.")}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <Text style={{ fontWeight: "bold", fontSize: 20, flex: 3 }}>수업 일지 - {count}회차</Text>
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        setModifyProgress(false);
                    }}
                    activeOpacity={1}
                >
                    <Surface
                        style={{
                            width: wp("90%"),
                            height: hp("65%"),
                            padding: 15,
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ width: wp("70%") }}>
                                {modifyBookName ? (
                                    <TextInput
                                        dense={true}
                                        label="책 이름"
                                        value={bookName}
                                        onChangeText={setBookName}
                                        style={{ marginBottom: 5 }}
                                    />
                                ) : (
                                    <Text style={{ marginBottom: 5, fontSize: 15 }}>{bookName}</Text>
                                )}
                                <View style={{ width: wp("50%") }}>
                                    <ProgressBar
                                        progress={Number(progress) / 100}
                                        style={{ height: hp("2%"), borderRadius: 10, marginBottom: 5 }}
                                    />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {modifyProgress ? (
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <TextInput
                                                mode="outlined"
                                                dense={true}
                                                maxLength={3}
                                                value={progress}
                                                onChangeText={setProgress}
                                                onFocus={() => setIsChange(true)}
                                                keyboardType="phone-pad"
                                                style={{ marginRight: 3, height: hp("3%") }}
                                            />
                                            <Text style={{ fontSize: 15, paddingTop: 5 }}>% 진행</Text>
                                        </View>
                                    ) : (
                                        <Text style={{ fontSize: 15 }}>{progress}% 진행</Text>
                                    )}
                                    <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => setModifyProgress(!modifyProgress)}>
                                        <MaterialCommunityIcons name="pencil-box-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 20, marginBottom: 5 }}>오늘 배운 것</Text>
                                <TextInput
                                    dense={true}
                                    style={{ marginBottom: 10 }}
                                    value={todayStudy}
                                    onChangeText={setTodayStudy}
                                    onFocus={() => {
                                        setModifyProgress(false);
                                        setIsChange(true);
                                    }}
                                />
                                <Text style={{ fontSize: 20, marginBottom: 5 }}>다음 시간에 배울 것</Text>
                                <TextInput
                                    dense={true}
                                    style={{ marginBottom: 10 }}
                                    value={nextStudy}
                                    onChangeText={setNextStudy}
                                    onFocus={() => {
                                        setModifyProgress(false);
                                        setIsChange(true);
                                    }}
                                />
                                <Text style={{ fontSize: 20, marginBottom: 5 }}>오늘의 숙제</Text>
                                <TextInput
                                    dense={true}
                                    style={{ marginBottom: 5 }}
                                    value={homework}
                                    onChangeText={setHomework}
                                    onFocus={() => {
                                        setModifyProgress(false);
                                        setIsChange(true);
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Button
                                mode="outlined"
                                onPress={async () => {
                                    if (isNew) {
                                        await addDoc(collection(db, "classes", classData.id, "logs"), {
                                            date: date,
                                            count: count,
                                            progress: Number(progress),
                                            bookName: bookName,
                                            todayStudy: todayStudy,
                                            nextStudy: nextStudy,
                                            homework: homework,
                                        }).then(async () => {
                                            await updateDoc(doc(db, "classes", classData.id), { count: classData.count + 1 });
                                            Alert.alert(
                                                "성공",
                                                "일지 등록 완료하였습니다.",
                                                [{ text: "확인", onPress: () => navigation.goBack() }],
                                                { cancelable: false }
                                            );
                                        });
                                    } else {
                                        await updateDoc(doc(db, "classes", classData.id, "logs", logData.logId), {
                                            date: date,
                                            count: count,
                                            progress: Number(progress),
                                            bookName: bookName,
                                            todayStudy: todayStudy,
                                            nextStudy: nextStudy,
                                            homework: homework,
                                        }).then(() => {
                                            Alert.alert(
                                                "성공",
                                                "일지 수정 완료하였습니다.",
                                                [{ text: "확인", onPress: () => navigation.goBack() }],
                                                { cancelable: false }
                                            );
                                        });
                                    }
                                }}
                                disabled={isNew ? false : isChange ? false : true}
                            >
                                {isNew ? "등록" : "수정"}
                            </Button>
                        </View>
                    </Surface>
                </TouchableOpacity>
            </View>
        </View>
    );
};
