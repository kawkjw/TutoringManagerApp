import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUser, getMatchingInfo, db } from "../../../config/MyBase.js";
import { collection, doc, onSnapshot, query, where, getDoc, updateDoc } from "firebase/firestore";
import { getSortedTeacherList } from "../../../config/getSortedList.js";
import style from "../../style.js";
import Image_ from "../../../component/Image.js";
import TeacherProfile from "./TeacherProfile.js";

//import { GetScore } from '../../../config/getScore.js';
const defaultPhotoUrl = "https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/photo.png?alt=media";
//'https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/logo.png?alt=media';
//'https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/defaultProfile.png?alt=media';

export default MatchingHome = ({ navigation, route }) => {
    console.log("render MatchingHome start @@@@");
    // console.log(navigation);
    // console.log(route);
    //const [currentMatchingInfo, setCurrentMatchingInfo] = useState('default');
    const userId = getCurrentUser().uid;
    //const currentMatchingInfo = '';

    const [currentMatchingInfo, setCurrentMatchingInfo] = useState("");
    const [dayBool, setDayBool] = useState([]);
    const [dayTime, setDayTime] = useState([]);
    const [subject, setSubject] = useState("");
    const [money, setMoney] = useState(-1);
    const [teachingType, setTeachingType] = useState([]);
    const [educationLevel, setEducationLevel] = useState([]);
    const [teacherInfoList, setTeacherInfoList] = useState([]);
    const [isSub3Finished, setIsSub3Finished] = useState(false);
    const [isSub4Finished, setIsSub4Finished] = useState(false);
    const [weight1, setWeight1] = useState("20");
    const [weight2, setWeight2] = useState("20");
    const [weight3, setWeight3] = useState("20");
    const [weight4, setWeight4] = useState("20");
    const [weight5, setWeight5] = useState("20");

    useEffect(() => {
        const unsub = onSnapshot(doc(db, `users/${userId}/`), (doc) => {
            //console.log('Current data: ', doc.data().currentMatchingId);
            setCurrentMatchingInfo(doc.data().currentMatchingId);
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        let unsub2 = () => {};

        if (currentMatchingInfo === undefined) {
            console.log("nothing");
        } else if (currentMatchingInfo !== "") {
            unsub2 = onSnapshot(doc(db, `users/${userId}/matching/${currentMatchingInfo}`), (doc) => {
                console.log("unSub2 Current data: ", doc.data());
                setSubject(doc.data().subject);
                setMoney(doc.data().money);
                setTeachingType(doc.data().teachingType);
                setDayBool(doc.data().dayBool);
                setDayTime(doc.data().dayTime);
                setEducationLevel(doc.data().educationLevel);
            });
        }
        return () => unsub2();
    }, [currentMatchingInfo]);

    useEffect(() => {
        let unsub3 = () => {};
        if (currentMatchingInfo === "") {
            return;
        } else if (currentMatchingInfo !== "") {
            setIsSub3Finished(false);
            const q = query(collection(db, "users"), where("isTeacher", "==", true), where("currentMatchingSubject", "==", subject));
            unsub3 = onSnapshot(q, (querySnapshot) => {
                console.log("unsub3        ", teacherInfoList.length);
                //console.log('@@@');
                const teacherInfo = [];
                //console.log({ querySnapshot });
                querySnapshot.forEach((doc) => {
                    const teacherObj = {
                        uid: doc.data().uid,
                        name: doc.data().name,
                        photoUrl: doc.data().photoURL,
                        education: doc.data().education,
                        address: doc.data().address,
                        teacherCurrentMatchingId: doc.data().currentMatchingId,
                        teacherCurrentMatchingSubject: doc.data().currentMatchingSubject,
                    };
                    console.log({ teacherObj });
                    teacherInfo.push(teacherObj);
                });
                //console.log(studentInfo);
                setTeacherInfoList(teacherInfo);
                setIsSub3Finished(true);
            });
        }
        return () => unsub3();
    }, [currentMatchingInfo, subject]);

    useEffect(() => {
        if (!isSub3Finished) {
            return;
        }
        let unsub4 = () => {};
        console.log("unsub4");
        const teacherInfoList_ = teacherInfoList.slice();
        teacherInfoList_.forEach(async (teacherItem, index) => {
            // if (index === 0) {
            //   setIsSub4Finished(false);
            // }

            //console.log(teacherItem?.name);
            const docSnap = await getDoc(doc(db, "users", teacherItem?.uid, "matching", teacherItem?.teacherCurrentMatchingId));

            console.log("docSnap안의 데이터:    ", docSnap.data());
            teacherItem.matchingInfo = docSnap.data();
            // teacherInfoList_[index].matchingInfo = docSnap.data();

            if (index + 1 === teacherInfoList_.length) {
                setIsSub4Finished(true);
            }
        });

        if (isSub4Finished) {
            console.log(teacherInfoList_);
            setTeacherInfoList(teacherInfoList_);
        }

        // for (let i = 0; i < teacherInfoList_?.length; i++) {
        //   const uid_ = teacherInfoList_[i].uid;
        //   const matchingId_ = teacherInfoList_[i].teacherCurrentMatchingId;
        //   const name_ = teacherInfoList_[i].name;
        //   //console.log(i, '   ', uid_, '   ', matchingId_, '   ', name_);
        //   unsub4 = onSnapshot(
        //     doc(db, 'users', uid_, 'matching', matchingId_),
        //     (doc) => {
        //       console.log('for문 안의 unsub4      ', i);
        //       console.log(doc.data());
        //       teacherInfoList_[i].matchingInfo = doc.data();
        //       setTeacherInfoList(teacherInfoList_);
        //     }
        //   );
        // }

        return () => unsub4();
    }, [isSub3Finished, isSub4Finished]);

    const sortTeacherList = async () => {
        console.log("선생님을 추천해줘야함");
        if (currentMatchingInfo === "default") {
            console.log("디폴트");
        } else {
            const weightList = [
                { title: "weight1", value: weight1 },
                { title: "weight2", value: weight2 },
                { title: "weight3", value: weight3 },
                { title: "weight4", value: weight4 },
                { title: "weight5", value: weight5 },
            ];
            await updateDoc(doc(db, "users", userId), {
                lastWeight: weightList,
            });
            const sortedTeacherInfoList = getSortedTeacherList(
                {
                    subject,
                    money,
                    teachingType,
                    dayBool,
                    dayTime,
                    educationLevel,
                    weight1,
                    weight2,
                    weight3,
                    weight4,
                    weight5,
                },

                teacherInfoList
            );

            setTeacherInfoList(sortedTeacherInfoList);
        }
    };

    const _handleItemPress = (params) => {
        console.log(params);
        navigation.navigate("TeacherProfile", params);
    };

    const getMyWeight = async () => {
        console.log("나의 비율을 불러줘야함");
        const docSnap = await getDoc(doc(db, "users", userId));
        console.log(docSnap.data().lastWeight);
        const weightList = docSnap.data().lastWeight;
        console.log(weightList[0].value);
        console.log(weightList[1].value);
        console.log(weightList[2].value);
        setWeight1(weightList[0].value);
        setWeight2(weightList[1].value);
        setWeight3(weightList[2].value);
        setWeight4(weightList[3].value);
        setWeight5(weightList[4].value);
    };

    //console.log('render MatchingHome:', studentList);

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

    const Item = ({ item, onPress }) => {
        console.log("과외비:    ", item?.matchingInfo?.money);
        console.log(item);
        return (
            <TouchableOpacity
                style={style.itemContainer}
                onPress={() => {
                    onPress({
                        teacherUid: item?.uid,
                        teacherName: item?.name,
                        teacherMatchingInfo: item?.matchingInfo,
                        teacherPhotoUrl: item?.photoUrl,
                        teacherEducation: item?.education,
                        teacherAddress: item?.address,
                    });
                }}
            >
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Image_
                        url={item?.photoUrl ? item?.photoUrl : defaultPhotoUrl}
                        showButton={false}
                        rounded={true}
                        width_={60}
                        height_={60}
                    ></Image_>
                    <View
                        style={{
                            //backgroundColor: 'pink',
                            flex: 2,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "600",
                                marginVertical: 20,
                                marginLeft: 20,
                            }}
                        >
                            {item?.name}
                        </Text>
                    </View>
                    <View
                        style={{
                            //backgroundColor: 'grey',
                            flex: 5,
                            borderLeftWidth: 0.3,
                            paddingLeft: 10,
                            marginLeft: 10,
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                //fontWeight: '300',

                                //marginLeft: 12,
                            }}
                        >
                            {item?.education}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                //fontWeight: '300',

                                //marginLeft: 12,
                            }}
                        >
                            과외비 월 {item?.matchingInfo?.money / 10000}만원
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            {item?.address}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    // console.log(
    //   '        =======teacherInfo',
    //   teacherInfoList,
    //   '    ============='
    // );
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: style.colorList.skyBlue,
            }}
        >
            <View
                style={{
                    //flex: 1.5,
                    flexDirection: "row",
                    height: 65,
                }}
            >
                <View
                    style={{
                        flex: 3,
                        justifyContent: "center",
                        paddingHorizontal: 15,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            color: style.colorList.navy,
                            fontWeight: "550",
                        }}
                    >
                        {subject ? `${subject} / 월 ${money / 10000}만원` : "현재 매칭 정보가 없습니다"}
                    </Text>

                    <Text style={{ fontSize: 18, color: style.colorList.navy }}>수업 방식 : {getTeachingTypeString(teachingType)}</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("EditMatching")}
                        style={{
                            width: 100,
                            height: 50,
                            backgroundColor: style.colorList.navy,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 15,
                        }}
                    >
                        {/* <Ionicons name='settings' size={30} color='black' /> */}
                        <Text style={{ color: style.colorList.white }}>매칭 정보 설정</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    //flex: 3.5,
                    height: 180,
                    //backgroundColor: style.colorList.grass,
                    alignSelf: "stretch",
                    paddingHorizontal: 15,
                }}
            >
                <View
                    style={{
                        //backgroundColor: 'pink',
                        flex: 1.3,
                        justifyContent: "center",
                        borderTopWidth: 0.5,
                        borderColor: style.colorList.navy,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "400",
                            marginVertical: 2,
                            color: style.colorList.navy,
                        }}
                    >
                        나의 추천 비율 조정
                    </Text>
                </View>

                <View
                    style={{
                        //backgroundColor: 'green',
                        flex: 3,
                        flexDirection: "row",
                        //borderBottomWidth: 0.3,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            //borderWidth: 1,
                            alignContent: "center",
                        }}
                    >
                        <View
                            style={{
                                flex: 2,
                                alignItems: "center",
                                //backgroundColor: 'yellow',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginVertical: 2,
                                    color: style.colorList.navy,
                                }}
                            >
                                과외비
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 3,
                                borderWidth: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                backgroundColor: "white",
                                borderColor: style.colorList.navy,
                                marginHorizontal: 4,
                            }}
                        >
                            <TextInput
                                value={weight1}
                                onChangeText={setWeight1}
                                keyboardType={"numeric"}
                                returnKeyType={"next"}
                                style={{
                                    fontSize: 24,
                                    marginVertical: 2,
                                    color: "black",

                                    flex: 1,
                                }}
                            ></TextInput>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            //borderWidth: 1,
                            alignContent: "center",
                        }}
                    >
                        <View
                            style={{
                                flex: 2,
                                alignItems: "center",
                                //backgroundColor: 'yellow',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginVertical: 2,
                                    color: style.colorList.navy,
                                }}
                            >
                                지역
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 3,
                                borderWidth: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                backgroundColor: "white",
                                borderColor: style.colorList.navy,
                                marginHorizontal: 4,
                            }}
                        >
                            <TextInput
                                value={weight2}
                                onChangeText={setWeight2}
                                keyboardType={"numeric"}
                                returnKeyType={"next"}
                                style={{
                                    fontSize: 24,
                                    marginVertical: 2,
                                    color: "black",

                                    flex: 1,
                                }}
                            ></TextInput>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            //borderWidth: 1,
                            alignContent: "center",
                        }}
                    >
                        <View
                            style={{
                                flex: 2,
                                alignItems: "center",
                                //backgroundColor: 'yellow',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginVertical: 2,
                                    color: style.colorList.navy,
                                }}
                            >
                                수업 방식
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 3,
                                borderWidth: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                backgroundColor: "white",
                                borderColor: style.colorList.navy,
                                marginHorizontal: 4,
                            }}
                        >
                            <TextInput
                                value={weight3}
                                onChangeText={setWeight3}
                                keyboardType={"numeric"}
                                returnKeyType={"next"}
                                style={{
                                    fontSize: 24,
                                    marginVertical: 2,
                                    color: "black",

                                    flex: 1,
                                }}
                            ></TextInput>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            //borderWidth: 1,
                            alignContent: "center",
                        }}
                    >
                        <View
                            style={{
                                flex: 2,
                                alignItems: "center",
                                //backgroundColor: 'yellow',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginVertical: 2,
                                    color: style.colorList.navy,
                                }}
                            >
                                수업 시간
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 3,
                                borderWidth: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                backgroundColor: "white",
                                borderColor: style.colorList.navy,
                                marginHorizontal: 4,
                            }}
                        >
                            <TextInput
                                value={weight4}
                                onChangeText={setWeight4}
                                keyboardType={"numeric"}
                                returnKeyType={"next"}
                                style={{
                                    fontSize: 24,
                                    marginVertical: 2,
                                    color: "black",

                                    flex: 1,
                                }}
                            ></TextInput>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            //borderWidth: 1,
                            alignContent: "center",
                        }}
                    >
                        <View
                            style={{
                                flex: 2,
                                alignItems: "center",
                                //backgroundColor: 'yellow',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginVertical: 2,
                                    color: style.colorList.navy,
                                }}
                            >
                                학력
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 3,
                                borderWidth: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                backgroundColor: "white",
                                borderColor: style.colorList.navy,
                                marginHorizontal: 4,
                            }}
                        >
                            <TextInput
                                value={weight5}
                                onChangeText={setWeight5}
                                keyboardType={"numeric"}
                                returnKeyType={"next"}
                                style={{
                                    fontSize: 24,
                                    marginVertical: 2,
                                    color: "black",

                                    flex: 1,
                                }}
                            ></TextInput>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        //backgroundColor: 'blue',
                        flex: 2,
                        justifyContent: "space-around",
                        alignContent: "center",
                        flexDirection: "row",
                        marginVertical: 5,
                    }}
                >
                    <TouchableOpacity
                        onPress={getMyWeight}
                        style={{
                            width: 160,
                            height: 40,
                            backgroundColor: style.colorList.navy,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 15,
                        }}
                    >
                        {/* <Ionicons name='settings' size={30} color='black' /> */}
                        <Text style={{ color: style.colorList.white }}>나의 추천 비율 불러오기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={sortTeacherList}
                        style={{
                            width: 120,
                            height: 40,
                            backgroundColor: style.colorList.navy,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 15,
                        }}
                    >
                        {/* <Ionicons name='settings' size={30} color='black' /> */}
                        <Text style={{ color: style.colorList.white }}>선생님 추천 받기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flex: 10,
                    alignSelf: "stretch",
                    backgroundColor: style.colorList.white,
                }}
            >
                <FlatList
                    keyExtractor={(item) => {
                        //console.log('키 익스트래터    ', item);
                        return item.uid;
                    }}
                    data={teacherInfoList}
                    renderItem={({ item }) => {
                        //console.log('렌더 아이템      ', item);
                        return <Item item={item} onPress={_handleItemPress}></Item>;
                    }}
                    windowSize={3}
                ></FlatList>
            </View>
        </View>
    );
};
