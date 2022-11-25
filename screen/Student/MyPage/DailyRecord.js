import React, { useContext, useEffect, useRef, useState } from "react";
import { Surface, List, ProgressBar, MD3Colors } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, ScrollView, TouchableOpacity, Text, TextInput, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db, auth, getCurrentUser } from "../../../config/MyBase";
import { getDocs, collection, deleteDoc, doc, setDoc, query, orderBy, getDoc } from "firebase/firestore";
import style from "../../style";
import { UserInterfaceIdiom } from "expo-constants";
import { async } from "@firebase/util";
import { Ionicons } from "@expo/vector-icons";

const DailyRecord = ({ navigation, route }) => {
    const [text, onChangeText] = React.useState("");
    const [text1, onChangeText1] = React.useState("");
    const [text2, onChangeText2] = React.useState("");

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    return (
        <View style={{ flex: 10, alignSelf: "stretch" }}>
            <ScrollView
                style={{ flex: 1, alignSelf: "stretch" }}
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ fontSize: 24 }}>2022년 10월 4일 화요일 수업일지</Text>
                <TouchableOpacity style={{ flexDirection: "row", marginVertical: 5 }}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, marginHorizontal: 10 }}>
                        <Ionicons name="book" size={70} color="black" />
                    </View>
                    <View style={{ flex: 3, flexDirection: "column" }}>
                        <View style={{ flex: 1 }}>
                            <Text>수업 정보</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, width: wp("90%") }}>
                    <List.Section title="진도 관리">
                        <List.Accordion
                            title="목차"
                            left={(props) => <List.Icon {...props} icon="bookmark" />}
                            expanded={expanded}
                            onPress={handlePress}
                        >
                            <List.Item title="1단원" />
                            <ProgressBar progress={1.0} />
                            <List.Item title="2단원" />
                            <ProgressBar progress={0.5} />
                        </List.Accordion>
                    </List.Section>
                </View>
                <Text style={{ fontSize: 24 }}>오늘 배운것</Text>
                <TextInput
                    style={{ borderWidth: 1, flex: 1, width: wp("90%"), height: hp("10%") }}
                    onChangeText={onChangeText}
                    value={text}
                ></TextInput>

                <Text style={{ fontSize: 24 }}>다음 시간에 배울것</Text>
                <TextInput
                    style={{ borderWidth: 1, flex: 1, width: wp("90%"), height: hp("10%") }}
                    onChangeText={onChangeText1}
                    value={text1}
                ></TextInput>
                <Text style={{ fontSize: 24 }}>오늘의 숙제</Text>
                <TextInput
                    style={{ borderWidth: 1, flex: 1, width: wp("90%"), height: hp("10%") }}
                    onChangeText={onChangeText2}
                    value={text2}
                ></TextInput>
            </ScrollView>
        </View>
    );
};
export default DailyRecord;
