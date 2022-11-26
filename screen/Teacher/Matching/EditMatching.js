import React, { useEffect, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { db, auth, updateMatchingInfo } from "../../../config/MyBase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import style from "../../style";

export default EditMatching = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await getDocs(collection(db, "users", auth.currentUser.uid, "matching")).then((matches) => {
                let temp = [];
                matches.forEach((match) => {
                    let grade = [];
                    temp.push(match.data());
                    if (match.data().elementary) grade.push("초등");
                    if (match.data().middle) grade.push("중등");
                    if (match.data().high1) grade.push("고1");
                    if (match.data().high2) grade.push("고2");
                    if (match.data().high3) grade.push("고3");
                    temp[temp.length - 1].id = match.id;
                    temp[temp.length - 1].grade = grade.join(", ");
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
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        backgroundColor: style.colorList.skyBlue,
                        paddingTop: 10,
                    }}
                >
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
                                    backgroundColor: "white",
                                    width: wp("90%"),
                                    height: hp("15%"),
                                    marginBottom: 10,
                                    borderRadius: 15,
                                }}
                                key={index}
                            >
                                <TouchableOpacity
                                    style={{ position: "absolute", top: 5, right: 5 }}
                                    onPress={async () => {
                                        await deleteDoc(doc(db, "users", auth.currentUser.uid, "matching", d.id));
                                        setLoading(true);
                                    }}
                                >
                                    <MaterialIcons name="remove-circle-outline" size={30} color={style.colorList.navy} />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 20 }}>
                                    {d.subject} / {d.grade}
                                </Text>
                                <Text>
                                    월 {d.money / 10000}만원 / 학생 수준{" : "}
                                    {d.educationLevel.map((value) => {
                                        //console.log(value);
                                        if (value.checked == true) {
                                            return value.level + "  ";
                                        }
                                    })}
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        margin: 10,
                                        backgroundColor: style.colorList.navy,
                                        width: 180,
                                        height: 40,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {
                                        // console.log(d.id, d.subject);
                                        updateMatchingInfo(d.id, d.subject);
                                        navigation.replace("MatchingHome");
                                    }}
                                >
                                    <Text style={{ fontSize: 16, color: style.colorList.white }}>이 정보로 학생 추천 받기</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: style.colorList.navy,
                                borderRadius: 10,
                                width: wp("90%"),
                                height: hp("15%"),
                                marginBottom: 15,
                            }}
                            onPress={() => navigation.navigate("AddMatching")}
                        >
                            <View
                                style={{
                                    borderWidth: 2,
                                    borderColor: "white",
                                    borderRadius: 10,
                                    width: wp("86%"),
                                    height: hp("13%"),
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <AntDesign name="pluscircleo" size={24} color="white" />
                                <Text style={{ color: "white", margin: 10, fontSize: 20 }}>새 매칭 정보 등록하기</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )}
        </>
    );
};
