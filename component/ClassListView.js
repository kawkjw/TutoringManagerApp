import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import style from "../screen/style.js";
import { uploadNewSchedule, db, getCurrentUser, deleteSchedule } from "../config/MyBase.js";
import { collection, query, orderBy, onSnapshot, QuerySnapshot, limit } from "firebase/firestore";

export const ClassListView = (params) => {
    const [schedules, setSchedules] = useState([]);
    const user = getCurrentUser();
    const year = params?.dateInfo?.year;
    const month = params?.dateInfo?.month;
    const date = params?.dateInfo?.date;

    useEffect(() => {
        const scheduleRef = collection(db, `schedules/${user.uid}/${year}/${month}/${date}`);

        const q = query(scheduleRef, orderBy("startHour", "asc"), limit(5));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            });
            setSchedules(list);
            //console.log(list);
        });
        return () => unsubscribe();
    }, []);

    const schedulesSize = schedules.length;

    return (
        <View>
            {schedulesSize > 0 ? (
                <Text
                    style={{
                        color: "black",
                        fontSize: 13,
                        backgroundColor: "#80c1ff",
                    }}
                >
                    {schedules[0].scheduleName.length > 4 ? schedules[0].scheduleName.substr(0, 3) + ".." : schedules[0].scheduleName}
                </Text>
            ) : (
                ""
            )}
            {schedulesSize > 1 ? (
                <Text
                    style={{
                        color: "black",
                        fontSize: 13,
                        backgroundColor: "#80c1ff",
                    }}
                >
                    {schedules[1].scheduleName.length > 4 ? schedules[1].scheduleName.substr(0, 3) + ".." : schedules[1].scheduleName}
                </Text>
            ) : (
                ""
            )}
            {schedulesSize > 2 ? (
                <Text
                    style={{
                        color: "black",
                        fontSize: 13,
                        backgroundColor: "#80c1ff",
                    }}
                >
                    {schedules[2].scheduleName.length > 4 ? schedules[2].scheduleName.substr(0, 3) + ".." : schedules[2].scheduleName}
                </Text>
            ) : (
                ""
            )}
            {schedulesSize > 3 ? (
                <Text
                    style={{
                        color: "black",
                        fontSize: 13,
                        backgroundColor: "#80c1ff",
                    }}
                >
                    {schedules[3].scheduleName.length > 4 ? schedules[3].scheduleName.substr(0, 3) + ".." : schedules[3].scheduleName}
                </Text>
            ) : (
                ""
            )}
            {schedulesSize > 4 ? (
                <Text
                    style={{
                        color: style.colorList.navy,
                        fontSize: 13,
                        fontWeight: "500",
                        //backgroundColor: style.colorList.blue,
                    }}
                >
                    ...더보기
                </Text>
            ) : (
                ""
            )}
        </View>
    );
};
