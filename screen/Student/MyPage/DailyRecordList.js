import React, { useContext, useEffect, useRef, useState } from "react";
import { Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, ScrollView, TouchableOpacity, Text, TextInput, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db, auth, getCurrentUser } from "../../../config/MyBase";
import { getDocs, collection, deleteDoc, doc, setDoc, query, orderBy, getDoc } from "firebase/firestore";
import style from "../../style";
import { UserInterfaceIdiom } from "expo-constants";
import { async } from "@firebase/util";

const DailyRecordList = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flex: 10, alignSelf: "stretch" }}>
                <ScrollView
                    style={{ flex: 1, alignSelf: "stretch" }}
                    contentContainerStyle={{ alignItems: "center" }}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => navigation.navigate("DailyRecord")}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("8%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                backgroundColor: "lightblue",
                            }}
                        >
                            <Text style={{ fontSize: 22 }}>2022년 10월 4일 화요일 수업일지</Text>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("8%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                backgroundColor: "lightblue",
                            }}
                        >
                            <Text style={{ fontSize: 22 }}>2022년 10월 6일 목요일 수업일지</Text>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("8%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                backgroundColor: "lightblue",
                            }}
                        >
                            <Text style={{ fontSize: 22 }}>2022년 10월 11일 화요일 수업일지</Text>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("8%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                backgroundColor: "lightblue",
                            }}
                        >
                            <Text style={{ fontSize: 22 }}>2022년 10월 13일 목요일 수업일지</Text>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("8%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                backgroundColor: "lightblue",
                            }}
                        >
                            <Text style={{ fontSize: 22 }}>2022년 10월 18일 화요일 수업일지</Text>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("8%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                backgroundColor: "lightblue",
                            }}
                        >
                            <Text style={{ fontSize: 22 }}>2022년 10월 20일 목요일 수업일지</Text>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("8%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                backgroundColor: "lightblue",
                            }}
                        >
                            <Text style={{ fontSize: 22 }}>2022년 10월 25일 화요일 수업일지</Text>
                        </Surface>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => navigation.navigate("AddClass")}>
                        <Surface style={{ width: wp("90%"), height: hp("15%"), alignItems: "center", justifyContent: "center" }}>
                            <AntDesign name="pluscircle" size={30} color="black" style={{ margin: 13 }} />
                            <Text>수업 일지 생성</Text>
                        </Surface>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};
export default DailyRecordList;
