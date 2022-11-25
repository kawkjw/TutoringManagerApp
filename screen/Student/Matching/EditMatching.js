import React, { useEffect, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db, auth, updateMatchingInfo } from "../../../config/MyBase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

export default EditMatching = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getTeachingTypeString = (teachingType) => {
        let teachingTypeString = "";
        if (teachingType[0] === true) {
            teachingTypeString += "개념설명 ";
        }
        if (teachingType[1] === true) {
            teachingTypeString += "문제풀이 ";
        }
        if (teachingType[2] === true) {
            teachingTypeString += "심화수업 ";
        }
        if (teachingType[3] === true) {
            teachingTypeString += "내신 대비 ";
        }
        if (teachingType[4] === true) {
            teachingTypeString += "수능 및 모의고사 대비 ";
        }
        return teachingTypeString;
    };

    useEffect(() => {
        const getData = async () => {
            await getDocs(collection(db, "users", auth.currentUser.uid, "matching")).then((matches) => {
                let temp = [];
                matches.forEach((match) => {
                    temp.push(match.data());

                    temp[temp.length - 1].id = match.id;
                });
                setData(temp);
                setLoading(false);
            });
        };
        if (loading) getData();
    }, [loading]);

    return (
        <>
            {loading ? (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text>loading...</Text>
                </View>
            ) : (
                <View style={{ flex: 1, alignItems: "center" }}>
                    <ScrollView
                        style={{ flex: 1, alignSelf: "stretch", marginTop: 10 }}
                        contentContainerStyle={{ alignItems: "center" }}
                        showsVerticalScrollIndicator={false}
                    >
                        {data.map((d, index) => (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "lightgrey",
                                    width: wp("90%"),
                                    height: hp("15%"),
                                    marginBottom: 5,
                                }}
                                key={index}
                            >
                                <TouchableOpacity
                                    style={{ position: "absolute", top: 0, right: 5 }}
                                    onPress={async () => {
                                        await deleteDoc(doc(db, "users", auth.currentUser.uid, "matching", d.id));
                                        setLoading(true);
                                    }}
                                >
                                    <AntDesign name="minus" size={24} color="black" />
                                </TouchableOpacity>

                                <Text>
                                    {d.subject} (월 {d.money / 10000}만원)
                                </Text>
                                <Text>{getTeachingTypeString(d.teachingType)}</Text>
                                <TouchableOpacity
                                    style={{ margin: 10 }}
                                    onPress={() => {
                                        console.log(d.id);
                                        updateMatchingInfo(d.id, d.subject);
                                        navigation.replace("MatchingHome");
                                    }}
                                >
                                    <Text>이 정보로 선생님 추천 받기</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "lightgrey",
                                width: wp("90%"),
                                height: hp("10%"),
                            }}
                            onPress={() => navigation.navigate("AddMatching")}
                        >
                            <AntDesign name="plus" size={24} color="black" />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )}
        </>
    );
};
