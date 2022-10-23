import React, { useEffect, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db, auth } from "../../../config/MyBase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

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
                                    height: hp("10%"),
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
                                <Text>담당 학년 : {d.grade}</Text>
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
