import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { List, Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { collection, getDoc, getDocs, orderBy, query, doc } from "firebase/firestore";
import { db } from "../../../config/MyBase";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";

export default ViewClass = ({ navigation, route }) => {
    const classData = route.params?.classData;
    //console.log(classData);
    const [expanded, setExpanded] = useState(false);
    const [count, setCount] = useState(classData.count);
    const day = ["월", "화", "수", "목", "금", "토", "일"];
    const [logData, setLogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

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

    const onRefresh = async () => {
        await getDoc(doc(db, "classes", classData.id)).then((classDoc) => {
            setCount(classDoc.data().count);
        });
        await getDocs(query(collection(db, "classes", classData.id, "logs"), orderBy("count", "desc"))).then((logs) => {
            let tempData = [];
            logs.forEach((log) => {
                let temp = log.data();
                temp.logId = log.id;
                tempData.push(temp);
            });
            setLogData(tempData);
        });
    };

    useEffect(() => {
        if (isFocused) setLoading(true);
    }, [isFocused]);

    useEffect(() => {
        if (loading)
            onRefresh().then(() => {
                setLoading(false);
            });
    }, [loading]);

    return (
        <View style={{ flex: 1, backgroundColor: "#e6f7ff" }}>
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 7 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 30, marginRight: 10 }}>{classData.className}</Text>
                    <Text style={{ fontSize: 15, marginRight: 10 }}>{count}회 수업</Text>
                    <Text style={{ fontSize: 15 }}>{classData.studentName} 학생</Text>
                </View>
                <DayTime />
            </View>
            <ScrollView
                style={{ flex: 1, alignSelf: "stretch" }}
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            >
                {loading ? (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text>Loading...</Text>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity
                            style={{ marginVertical: 5 }}
                            onPress={() =>
                                navigation.navigate("ViewLog", {
                                    classData: { ...classData, count: count },
                                    isNew: true,
                                    prevLog: logData.length !== 0 ? logData[0] : undefined,
                                })
                            }
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
                        {logData.map((log, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{ marginVertical: 5 }}
                                onPress={() => navigation.navigate("ViewLog", { classData: classData, logData: log, isNew: false })}
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
                                    <Text>
                                        {moment(log.date.toDate()).format("MM월 DD일")} {log.count}회차 수업 일지
                                    </Text>
                                </Surface>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
};
