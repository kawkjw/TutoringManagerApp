import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default ViewStudent = () => {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Surface
                style={{
                    width: wp("90%"),
                    height: hp("15%"),
                    justifyContent: "center",
                    flexDirection: "row",
                    marginTop: 10,
                }}
            >
                <View style={{ flex: 2, alignItems: "center", justifyContent: "center", marginHorizontal: 10 }}>
                    <Ionicons name="person" size={70} color="black" />
                </View>
                <View style={{ flex: 4, flexDirection: "column" }}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text>김철수 학생</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text>정석고 1학년 / 성적 중하위</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", paddingRight: 5 }}>
                        <Button mode="contained" color="skyblue">
                            학생과 대화하기
                        </Button>
                    </View>
                </View>
            </Surface>
            <Surface
                style={{
                    width: wp("90%"),
                    height: hp("30%"),
                    marginTop: 10,
                }}
            >
                <View style={{ padding: 10 }}>
                    <Text style={{ margin: 10, fontWeight: "bold", fontSize: 20, marginBottom: 15 }}>상세정보</Text>
                    <View style={{ flexDirection: "row", marginBottom: 7 }}>
                        <Text style={{ flex: 1, textAlign: "right", marginRight: 5 }}>과외비 : </Text>
                        <Text style={{ flex: 5 }}>45만원</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 7 }}>
                        <Text style={{ flex: 1, textAlign: "right", marginRight: 5 }}>지역 : </Text>
                        <Text style={{ flex: 5 }}>인천광역시 미추홀구 학익동</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 7 }}>
                        <Text style={{ flex: 1, textAlign: "right", marginRight: 5 }}>과외시간 : </Text>
                        <Text style={{ flex: 5 }}>토일 2시 ~ 4시</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1, textAlign: "right", marginRight: 5 }}>과외방식 : </Text>
                        <Text style={{ flex: 5 }}>개념위주</Text>
                    </View>
                </View>
            </Surface>
        </View>
    );
};
