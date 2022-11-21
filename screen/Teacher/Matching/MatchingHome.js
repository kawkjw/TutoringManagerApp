import React from "react";
import { View, ScrollView, TouchableOpacity, Text, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default MatchingHome = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <StatusBar barStyle={"dark-content"} />
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 3, justifyContent: "center", paddingLeft: 10 }}>
                    <Text>추천된 학생 목록</Text>
                    <Text>학생을 누르면 자세한 정보를 확인 할 수 있습니다.</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => navigation.navigate("EditMatching")}>
                        <Ionicons name="settings" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 10, alignSelf: "stretch" }}>
                <ScrollView
                    style={{ flex: 1, alignSelf: "stretch" }}
                    contentContainerStyle={{ alignItems: "center" }}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => navigation.navigate("ViewStudent")}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("13%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                flexDirection: "row",
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
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>과외비 45만원</Text>
                                </View>
                            </View>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("13%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                flexDirection: "row",
                            }}
                        >
                            <View style={{ flex: 2, alignItems: "center", justifyContent: "center", marginHorizontal: 10 }}>
                                <Ionicons name="person" size={70} color="black" />
                            </View>
                            <View style={{ flex: 4, flexDirection: "column" }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>최민형 학생</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>인하고 3학년 / 성적 중위</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>과외비 55만원</Text>
                                </View>
                            </View>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("13%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                flexDirection: "row",
                            }}
                        >
                            <View style={{ flex: 2, alignItems: "center", justifyContent: "center", marginHorizontal: 10 }}>
                                <Ionicons name="person" size={70} color="black" />
                            </View>
                            <View style={{ flex: 4, flexDirection: "column" }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>이진수 학생</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>정석고 2학년 / 성적 중상위</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>과외비 50만원</Text>
                                </View>
                            </View>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("13%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                flexDirection: "row",
                            }}
                        >
                            <View style={{ flex: 2, alignItems: "center", justifyContent: "center", marginHorizontal: 10 }}>
                                <Ionicons name="person" size={70} color="black" />
                            </View>
                            <View style={{ flex: 4, flexDirection: "column" }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>박지훈 학생</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>정석고 1학년 / 성적 중상위</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>과외비 40만원</Text>
                                </View>
                            </View>
                        </Surface>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => {}}>
                        <Surface
                            style={{
                                width: wp("90%"),
                                height: hp("13%"),
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                flexDirection: "row",
                            }}
                        >
                            <View style={{ flex: 2, alignItems: "center", justifyContent: "center", marginHorizontal: 10 }}>
                                <Ionicons name="person" size={70} color="black" />
                            </View>
                            <View style={{ flex: 4, flexDirection: "column" }}>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>안정훈 학생</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>인하고 1학년 / 성적 상위</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text>과외비 60만원</Text>
                                </View>
                            </View>
                        </Surface>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};
