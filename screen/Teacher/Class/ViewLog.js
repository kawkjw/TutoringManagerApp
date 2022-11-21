import React, { useState } from "react";
import { View, Text } from "react-native";
import { ProgressBar, Surface, TextInput, Button } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default ViewLog = () => {
    const [todayStudy, setTodayStudy] = useState("적분하는 방법");
    const [nextStudy, setNextStudy] = useState("적분을 이용한 문제풀이");
    const [homework, setHomework] = useState("오늘 배운 것 복습");

    return (
        <View style={{ flex: 1, backgroundColor: "#e6f7ff" }}>
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 7 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 30, marginRight: 10 }}>수학</Text>
                    <Text style={{ fontSize: 15 }}>학생1 학생</Text>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>2022.11.13 수업 일지 - 5회차</Text>
            </View>
            <View style={{ alignItems: "center" }}>
                <Surface
                    style={{
                        width: wp("90%"),
                        height: hp("50%"),
                        padding: 15,
                    }}
                >
                    <View style={{ width: wp("50%") }}>
                        <Text style={{ marginBottom: 5, fontSize: 15 }}>책 제목(수학)</Text>
                        <ProgressBar progress={0.7} style={{ height: hp("2%"), borderRadius: 10, marginBottom: 5 }} />
                        <Text style={{ fontSize: 15 }}>70% 진행</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 20, marginBottom: 5 }}>오늘 배운 것</Text>
                        <TextInput dense={true} style={{ marginBottom: 10 }} value={todayStudy} onChangeText={setTodayStudy} />
                        <Text style={{ fontSize: 20, marginBottom: 5 }}>다음 시간에 배울 것</Text>
                        <TextInput dense={true} style={{ marginBottom: 10 }} value={nextStudy} onChangeText={setNextStudy} />
                        <Text style={{ fontSize: 20, marginBottom: 5 }}>오늘의 숙제</Text>
                        <TextInput dense={true} style={{ marginBottom: 5 }} value={homework} onChangeText={setHomework} />
                    </View>
                    <Button mode="outlined" style={{ position: "absolute", right: 10, bottom: 10 }}>
                        확인
                    </Button>
                </Surface>
            </View>
        </View>
    );
};
