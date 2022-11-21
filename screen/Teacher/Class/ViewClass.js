import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

export default ViewClass = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#e6f7ff" }}>
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 7 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 30, marginRight: 10 }}>수학</Text>
                    <Text style={{ fontSize: 15, marginRight: 10 }}>5회 수업</Text>
                    <Text style={{ fontSize: 15 }}>학생1 학생</Text>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>토 일 13:00 ~ 15:00</Text>
            </View>
            <ScrollView
                style={{ flex: 1, alignSelf: "stretch" }}
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => navigation.navigate("ViewLog")}>
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
                <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
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
                        <Text>11월 13일 5회차 수업 일지</Text>
                    </Surface>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
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
                        <Text>11월 12일 4회차 수업 일지</Text>
                    </Surface>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
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
                        <Text>11월 6일 3회차 수업 일지</Text>
                    </Surface>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
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
                        <Text>11월 5일 2회차 수업 일지</Text>
                    </Surface>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
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
                        <Text>10월 30일 1회차 수업 일지</Text>
                    </Surface>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};
