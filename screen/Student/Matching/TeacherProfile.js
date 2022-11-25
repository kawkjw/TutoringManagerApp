import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Image_ from "../../../component/Image.js";

const defaultPhotoUrl = "https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/photo.png?alt=media";

export default TeacherProfile = ({ navigation, route }) => {
    console.log(route?.params);
    const teacherUid = route?.params?.teacherUid;
    const teacherName = route?.params?.teacherName;

    const teacherEducation = route?.params?.teacherEducation;
    const teacherMatchingInfo = route?.params?.teacherMatchingInfo;
    const teacherAddress = route?.params?.teacherAddress;
    const teacherPhotoUrl = route?.params?.teacherPhotoUrl;

    return (
        <View>
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
                    <View
                        style={{
                            flex: 2,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                        }}
                    >
                        <Image_
                            url={teacherPhotoUrl ? teacherPhotoUrl : defaultPhotoUrl}
                            showButton={false}
                            rounded={true}
                            width_={100}
                            height_={100}
                        ></Image_>
                    </View>
                    <View style={{ flex: 4, flexDirection: "column" }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text>{teacherName}</Text>

                            <Text>{teacherEducation}</Text>

                            <Text>{teacherAddress}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", paddingRight: 5 }}>
                            <Button
                                mode="contained"
                                color="skyblue"
                                onPress={() =>
                                    navigation.getParent().navigate("Chat", {
                                        screen: "ChannelList",
                                        params: {
                                            teacherUid: teacherUid,
                                            teacherName: teacherName,
                                            teacherPhotoUrl: teacherPhotoUrl ? teacherPhotoUrl : defaultPhotoUrl,
                                        },
                                    })
                                }
                            >
                                선생님과 대화하기
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
                        <Text
                            style={{
                                margin: 10,
                                fontWeight: "bold",
                                fontSize: 20,
                                marginBottom: 15,
                            }}
                        >
                            상세정보
                        </Text>
                        <View style={{ flexDirection: "row", marginBottom: 7 }}>
                            <Text style={{ flex: 1, textAlign: "right", marginRight: 5 }}>과외비 : </Text>
                            <Text style={{ flex: 5 }}>월 {teacherMatchingInfo?.money / 10000}만원</Text>
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
        </View>
    );
};
