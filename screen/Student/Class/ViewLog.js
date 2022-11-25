import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ProgressBar, Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import moment from "moment";

export default ViewLog = ({ navigation, route }) => {
    const classData = route.params?.classData;
    const logData = route.params?.logData;
    const [date, setDate] = useState(new Date());
    const [todayStudy, setTodayStudy] = useState("");
    const [nextStudy, setNextStudy] = useState("");
    const [homework, setHomework] = useState("");
    const [progress, setProgress] = useState("0");
    const [bookName, setBookName] = useState("");
    const [count, setCount] = useState(classData.count + 1);

    useEffect(() => {
        if (Number(progress) > 100) {
            setProgress("100");
        }
    }, [progress]);

    useEffect(() => {
        setDate(logData.date.toDate());
        setTodayStudy(logData.todayStudy);
        setNextStudy(logData.nextStudy);
        setHomework(logData.homework);
        setProgress(logData.progress.toString());
        setCount(logData.count);
        setBookName(logData.bookName);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#e6f7ff" }}>
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 7 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 30, marginRight: 10 }}>{classData.className}</Text>
                    <Text style={{ fontSize: 15 }}>{classData.studentName} 학생</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "blue", fontWeight: "bold", fontSize: 20, marginRight: 5 }}>
                        {moment(date).format("YYYY. MM. DD.")}
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 20, flex: 3 }}>수업 일지 - {count}회차</Text>
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <Surface
                    style={{
                        width: wp("90%"),
                        height: hp("65%"),
                        padding: 15,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ width: wp("70%") }}>
                            <Text style={{ marginBottom: 5, fontSize: 15 }}>{bookName}</Text>
                            <View style={{ width: wp("50%") }}>
                                <ProgressBar
                                    progress={Number(progress) / 100}
                                    style={{ height: hp("2%"), borderRadius: 10, marginBottom: 5 }}
                                />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15 }}>{progress}% 진행</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 20, marginBottom: 5 }}>오늘 배운 것</Text>
                            <View style={{ marginBottom: 10, backgroundColor: "#e6f7ff", padding: 10 }}>
                                <Text style={{ fontSize: 17 }}>{todayStudy}</Text>
                            </View>
                            <Text style={{ fontSize: 20, marginBottom: 5 }}>다음 시간에 배울 것</Text>
                            <View style={{ marginBottom: 10, backgroundColor: "#e6f7ff", padding: 10 }}>
                                <Text style={{ fontSize: 17 }}>{nextStudy}</Text>
                            </View>
                            <Text style={{ fontSize: 20, marginBottom: 5 }}>오늘의 숙제</Text>
                            <View style={{ marginBottom: 10, backgroundColor: "#e6f7ff", padding: 10 }}>
                                <Text style={{ fontSize: 17 }}>{homework}</Text>
                            </View>
                        </View>
                    </View>
                </Surface>
            </View>
        </View>
    );
};
