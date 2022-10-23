import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default MatchingHome = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
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
                    <TouchableOpacity style={{ flexDirection: "row", marginVertical: 5 }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, marginHorizontal: 10 }}>
                            <Ionicons name="person" size={70} color="black" />
                        </View>
                        <View style={{ flex: 3, flexDirection: "column" }}>
                            <View style={{ flex: 1 }}>
                                <Text>test</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>test2</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>test3</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", marginVertical: 5 }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, marginHorizontal: 10 }}>
                            <Ionicons name="person" size={70} color="black" />
                        </View>
                        <View style={{ flex: 3, flexDirection: "column" }}>
                            <View style={{ flex: 1 }}>
                                <Text>test</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>test2</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>test3</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", marginVertical: 5 }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, marginHorizontal: 10 }}>
                            <Ionicons name="person" size={70} color="black" />
                        </View>
                        <View style={{ flex: 3, flexDirection: "column" }}>
                            <View style={{ flex: 1 }}>
                                <Text>test</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>test2</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>test3</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", marginVertical: 5 }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", borderWidth: 1, marginHorizontal: 10 }}>
                            <Ionicons name="person" size={70} color="black" />
                        </View>
                        <View style={{ flex: 3, flexDirection: "column" }}>
                            <View style={{ flex: 1 }}>
                                <Text>test</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>test2</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>test3</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};
