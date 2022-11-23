import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Image_ from "../../../component/Image.js";

const defaultPhotoUrl = "https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/photo.png?alt=media";

export default StudentProfile = ({ navigation, route }) => {
    console.log(route?.params);
    const studentUid = route?.params?.studentUid;
    const studentName = route?.params?.studentName;
    const studentGrade = route?.params?.studentGrade;
    const studentSchoolName = route?.params?.studentSchoolName;
    const studentEducation = route?.params?.studentEducation;
    const studentMatchingInfo = route?.params?.studentMatchingInfo;
    const studentAddress = route?.params?.studentAddress;
    const studentPhotoUrl = route?.params?.studentPhotoUrl;

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
                            url={studentPhotoUrl ? studentPhotoUrl : defaultPhotoUrl}
                            showButton={false}
                            rounded={true}
                            width_={100}
                            height_={100}
                        ></Image_>
                    </View>
                    <View style={{ flex: 4, flexDirection: "column" }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text>{studentName}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text>정석고 1학년 / 성적 중하위</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", paddingRight: 5 }}>
                            <Button
                                mode="contained"
                                color="skyblue"
                                onPress={() =>
                                    navigation
                                        .getParent()
                                        .navigate("Chat", {
                                            screen: "ChannelList",
                                            params: { studentUid: studentUid, studentName: studentName, studentPhotoUrl: studentPhotoUrl },
                                        })
                                }
                            >
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
                            <Text style={{ flex: 5 }}>월 {studentMatchingInfo?.money / 10000}만원</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 7 }}>
                            <Text style={{ flex: 1, textAlign: "right", marginRight: 5 }}>지역 : </Text>
                            <Text style={{ flex: 5 }}>{studentAddress}</Text>
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
