import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, FlatList } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { getCurrentUser, getMatchingInfo, db } from "../../../config/MyBase.js";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { getSortedStudentList } from "../../../config/getSortedList.js";
import style from "../../style.js";
import Image_ from "../../../component/Image.js";

//import { GetScore } from '../../../config/getScore.js';
const defaultPhotoUrl = "https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/photo.png?alt=media";

export default MatchingHome = ({ navigation, route }) => {
    //console.log('=======      render home start       ========');
    const [currentMatchingInfoId, setCurrentMatchingInfoId] = useState("");
    const [dayBool, setDayBool] = useState([]);
    const [dayTime, setDayTime] = useState([]);
    const [subject, setSubject] = useState("");
    const [money, setMoney] = useState(-1);
    const [teachingType, setTeachingType] = useState([]);
    const [educationLevel, setEducationLevel] = useState([]);
    const [studentInfoList, setStudentInfoList] = useState([]);
    const [matchingInfoChanged, setMatchingInfoChanged] = useState(false);
    const [isSub3Finished, setIsSub3Finished] = useState(false);
    const [elementaryChecked, setElementryChecked] = useState(false);
    const [middleChecked, setMiddleChecked] = useState(false);
    const [high1Checked, setHigh1Checked] = useState(false);
    const [high2Checked, setHigh2Checked] = useState(false);
    const [high3Checked, setHigh3Checked] = useState(false);
    const [matchingGradeString, setMatchingGradeString] = useState("");
    const [weight1, setWeight1] = useState(20);
    const [weight2, setWeight2] = useState(20);
    const [weight3, setWeight3] = useState(20);
    const [weight4, setWeight4] = useState(20);
    const [weight5, setWeight5] = useState(20);

    const userId = getCurrentUser().uid;

    useEffect(() => {
        const unsub1 = onSnapshot(doc(db, "users", userId), (doc) => {
            // console.log('unsub1: 로그인한 사용자의 currentMatchingId를 가져옴');
            //console.log('unsub1 data: ', doc.data().currentMatchingId);
            setCurrentMatchingInfoId(doc.data().currentMatchingId);
        });
        return () => unsub1();
    }, []);

    useEffect(() => {
        let unsub2 = () => {};

        if (currentMatchingInfoId === undefined) {
            console.log("매칭 정보가 없습니다");
        } else if (currentMatchingInfoId !== "") {
            unsub2 = onSnapshot(doc(db, `users/${userId}/matching/${currentMatchingInfoId}`), (doc) => {
                console.log("unsub2     ", studentInfoList.length);
                // console.log('unSub2 Current data: ', doc.data());
                setSubject(doc.data().subject);
                setMoney(doc.data().money);
                setTeachingType(doc.data().teachingType);
                setDayBool(doc.data().dayBool);
                setDayTime(doc.data().dayTime);
                setEducationLevel(doc.data().educationLevel);
                setElementryChecked(doc.data().elementary);
                setMiddleChecked(doc.data().middle);
                setHigh1Checked(doc.data().high1);
                setHigh2Checked(doc.data().high2);
                setHigh3Checked(doc.data().high3);
            });
        }
        return () => unsub2();
    }, [currentMatchingInfoId]);

    useEffect(() => {
        let unsub3 = () => {};
        if (currentMatchingInfoId === "") {
            const q = query(collection(db, "users"), where("isTeacher", "==", false));
            unsub3 = onSnapshot(q, (querySnapshot) => {
                const studentInfo = [];
                querySnapshot.forEach((doc) => {
                    const studentObj = {
                        uid: doc.data().uid,
                        name: doc.data().name,
                        photoUrl: doc.data().photoURL,
                        education: doc.data().education,
                        address: doc.data().address,
                        studentCurrentMatchingId: doc.data().currentMatchingId,
                        studentCurrentMatchingSubject: doc.data().currentMatchingSubject,
                    };
                    studentInfo.push(studentObj);
                });
                setStudentInfoList(studentInfo);
            });
        } else if (currentMatchingInfoId !== "") {
            setIsSub3Finished(false);
            const q = query(collection(db, "users"), where("isTeacher", "==", false), where("currentMatchingSubject", "==", subject));
            unsub3 = onSnapshot(q, (querySnapshot) => {
                console.log("unsub3        ", studentInfoList.length);
                //console.log('@@@');
                const studentInfo = [];
                //console.log({ querySnapshot });
                querySnapshot.forEach((doc) => {
                    const studentObj = {
                        uid: doc.data().uid,
                        name: doc.data().name,
                        photoUrl: doc.data().photoURL,
                        education: doc.data().education,
                        address: doc.data().address,
                        studentCurrentMatchingId: doc.data().currentMatchingId,
                        studentCurrentMatchingSubject: doc.data().currentMatchingSubject,
                        studentSchoolName: doc.data().schoolName,
                        studentGrade: doc.data().grade,
                    };
                    console.log({ studentObj });
                    studentInfo.push(studentObj);
                });
                //console.log(studentInfo);
                setStudentInfoList(studentInfo);
                setIsSub3Finished(true);
            });
        }

        return () => unsub3();
    }, [currentMatchingInfoId, subject]);

    useEffect(() => {
        if (!isSub3Finished) {
            return;
        }

        let unsub4 = () => {};
        console.log("여기?");
        const studentInfoList_ = studentInfoList.slice();
        for (let i = 0; i < studentInfoList_?.length; i++) {
            const uid_ = studentInfoList_[i].uid;
            const matchingId_ = studentInfoList_[i].studentCurrentMatchingId;
            const name_ = studentInfoList_[i].name;
            //console.log(i, '   ', uid_, '   ', matchingId_, '   ', name_);
            unsub4 = onSnapshot(doc(db, "users", uid_, "matching", matchingId_), (doc) => {
                // console.log('for문 안의 unsub4      ', i);
                // console.log(doc.data());
                studentInfoList_[i].matchingInfo = doc.data();
                setStudentInfoList(studentInfoList_);
            });
        }

        return () => unsub4();
    }, [isSub3Finished]);

    const getMatchingGradeString = () => {
        let gradeString = "";
        if (currentMatchingInfoId) {
            if (elementaryChecked) {
                gradeString += "초등 ";
            }
            if (middleChecked) {
                gradeString += "중등 ";
            }
            if (high1Checked) {
                gradeString += "고1";
            }
            if (high2Checked) {
                gradeString += "고2";
            }
            if (high3Checked) {
                gradeString += "고3 또는 N수생";
            }
            console.log(gradeString);
        } else {
            gradeString = "정보 없음";
        }
        return gradeString;
    };
    const sortStudentList = () => {
        console.log("학생을 추천해줘야함");
        if (currentMatchingInfoId === "") {
            console.log("디폴트");
        } else {
            const sortedStudentInfoList = getSortedStudentList(
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
                studentInfoList
            );

            setStudentInfoList(sortedStudentInfoList);
        }
    };

    const _handleItemPress = (params) => {
        console.log(params);
        navigation.navigate("StudentProfile", params);
    };

    // console.log('out        ', studentInfoList.length, subject);
    // if (studentInfoList.length !== 0) {
    //   console.log('첫번째 학생의 info   ', studentInfoList);
    //   // console.log('첫번째 학생의 info   ', studentInfoList[0].matchingInfo);
    // }

    const Item = ({ item, onPress }) => {
        // const [studentName, setStudentName] = useState('');
        // const [studentPhotoUrl, setStudentPhotoUrl] = useState('');
        // const [education, setEducation] = useState('');
        //console.log('Item 안:       ', item);
        // useEffect(() => {
        //   const unsubscribe = onSnapshot(doc(db, 'users', item), (doc) => {
        //     console.log('Item 안의 onSnapshot');
        //     console.log(doc.data());
        //     setStudentName(doc.data().name);
        //     setStudentPhotoUrl(doc.data().photoURL);
        //     setEducation(doc.data().education);
        //   });
        //   return () => unsubscribe();
        // }, []);
        return (
            <TouchableOpacity
                style={style.itemContainer}
                onPress={() => {
                    onPress({
                        studentUid: item?.uid,
                        studentAddress: item?.address,
                        studentName: item?.name,
                        studentMatchingInfo: item?.matchingInfo,
                        studentPhotoUrl: item?.photoUrl,
                        studentGrade: item?.studentGrade,
                        studentSchoolName: item?.studentSchoolName,
                        studentEducation: item?.education,
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
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                //fontWeight: '300',

                                //marginLeft: 12,
                            }}
                        >
                            {item?.studentSchoolName} {item?.studentGrade} / {item?.education}
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
                                //fontWeight: '300',

                                //marginLeft: 12,
                            }}
                        >
                            {item?.address}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const changeWeight = (value, setWeight, isPlus, weightNumber) => {
        console.log("changeWeight 안");
        if (isPlus) {
            if (weightNumber === 1) {
                //console.log('여기 들어옴');
                setWeight1((prev) => prev + 4);
                setWeight2((prev) => prev - 1);
                setWeight3((prev) => prev - 1);
                setWeight4((prev) => prev - 1);
                setWeight5((prev) => prev - 1);
            }
            if (weightNumber === 2) {
                //console.log('여기 들어옴');
                setWeight1((prev) => prev - 1);
                setWeight2((prev) => prev + 4);
                setWeight3((prev) => prev - 1);
                setWeight4((prev) => prev - 1);
                setWeight5((prev) => prev - 1);
            }
            if (weightNumber === 3) {
                //console.log('여기 들어옴');
                setWeight1((prev) => prev - 1);
                setWeight2((prev) => prev - 1);
                setWeight3((prev) => prev + 4);
                setWeight4((prev) => prev - 1);
                setWeight5((prev) => prev - 1);
            }
            if (weightNumber === 4) {
                //console.log('여기 들어옴');
                setWeight1((prev) => prev - 1);
                setWeight2((prev) => prev - 1);
                setWeight3((prev) => prev - 1);
                setWeight4((prev) => prev + 4);
                setWeight5((prev) => prev - 1);
            }
            if (weightNumber === 5) {
                //console.log('여기 들어옴');
                setWeight1((prev) => prev - 1);
                setWeight2((prev) => prev - 1);
                setWeight3((prev) => prev - 1);
                setWeight4((prev) => prev - 1);
                setWeight5((prev) => prev + 4);
            }
            //setWeight(value + 4);
        } else {
            if (weightNumber === 1) {
                setWeight1((prev) => prev - 4);
                setWeight2((prev) => prev + 1);
                setWeight3((prev) => prev + 1);
                setWeight4((prev) => prev + 1);
                setWeight5((prev) => prev + 1);
            }
            if (weightNumber === 2) {
                setWeight1((prev) => prev + 1);
                setWeight2((prev) => prev - 4);
                setWeight3((prev) => prev + 1);
                setWeight4((prev) => prev + 1);
                setWeight5((prev) => prev + 1);
            }
            if (weightNumber === 3) {
                setWeight1((prev) => prev + 1);
                setWeight2((prev) => prev + 1);
                setWeight3((prev) => prev - 4);
                setWeight4((prev) => prev + 1);
                setWeight5((prev) => prev + 1);
            }
            if (weightNumber === 4) {
                setWeight1((prev) => prev + 1);
                setWeight2((prev) => prev + 1);
                setWeight3((prev) => prev + 1);
                setWeight4((prev) => prev - 4);
                setWeight5((prev) => prev + 1);
            }
            if (weightNumber === 5) {
                setWeight1((prev) => prev + 1);
                setWeight2((prev) => prev + 1);
                setWeight3((prev) => prev + 1);
                setWeight4((prev) => prev + 1);
                setWeight5((prev) => prev - 4);
            }
        }
    };
    const Weight = ({ weightTitle, value, setWeight, weightNumber }) => {
        //console.log(value);
        return (
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
                        {weightTitle}
                    </Text>
                </View>
                <View style={{ flex: 3, alignContent: "center", flexDirection: "row" }}>
                    <View
                        style={{
                            flex: 3,
                            borderWidth: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            backgroundColor: "white",
                            borderColor: style.colorList.navy,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 24,
                                marginVertical: 2,
                                color: "black",
                            }}
                        >
                            {value}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 2,
                            //borderWidth: 1
                        }}
                    >
                        <TouchableOpacity
                            style={{ marginHorizontal: 3 }}
                            onPress={() => changeWeight(value, setWeight, true, weightNumber)}
                        >
                            <AntDesign name="plussquareo" size={20} color={style.colorList.navy} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 3 }}
                            onPress={() => changeWeight(value, setWeight, false, weightNumber)}
                        >
                            <AntDesign name="minussquareo" size={20} color={style.colorList.navy} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <TouchableOpacity style={{ marginVertical: 6, marginHorizontal: 3 }}>
          <AntDesign name='plussquareo' size={22} color='black' />
        </TouchableOpacity>
        <Text style={{ fontSize: 22 }}>{value}</Text>
        <TouchableOpacity style={{ marginVertical: 6, marginHorizontal: 3 }}>
          <AntDesign name='minussquareo' size={22} color='black' />
        </TouchableOpacity> */}
            </View>
        );
    };
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
                    flex: 1.5,
                    flexDirection: "row",
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
                        {subject ? `${subject} / ${matchingGradeString}` : "현재 매칭 정보가 없습니다"} {getMatchingGradeString()}
                    </Text>

                    <Text style={{ fontSize: 18, color: style.colorList.navy }}>
                        성적 :{" "}
                        {educationLevel.map((value) => {
                            //console.log(value);
                            if (value.checked == true) {
                                return value.level + "  ";
                            }
                        })}
                    </Text>
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
                    flex: 3.5,
                    //backgroundColor: style.colorList.grey_0,
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
                    <Weight value={weight1} weightTitle={"과외비"} setWeight={setWeight1} weightNumber={1}></Weight>
                    <Weight value={weight2} weightTitle={"지역"} setWeight={setWeight2} weightNumber={2}></Weight>
                    <Weight value={weight3} weightTitle={"수업 방식"} setWeight={setWeight3} weightNumber={3}></Weight>
                    <Weight value={weight4} weightTitle={"시간"} setWeight={setWeight4} weightNumber={4}></Weight>
                    <Weight value={weight5} weightTitle={"성적 수준"} setWeight={setWeight5} weightNumber={5}></Weight>
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
                        onPress={sortStudentList}
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
                        onPress={sortStudentList}
                        style={{
                            width: 100,
                            height: 40,
                            backgroundColor: style.colorList.navy,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 15,
                        }}
                    >
                        {/* <Ionicons name='settings' size={30} color='black' /> */}
                        <Text style={{ color: style.colorList.white }}>학생 추천 받기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flex: 10,
                    alignSelf: "stretch",
                    backgroundColor: style.colorList.white,
                    paddingHorizontal: 5,
                }}
            >
                <FlatList
                    keyExtractor={(item) => {
                        //console.log('키 익스트래터    ', item);
                        return item.uid;
                    }}
                    data={studentInfoList}
                    renderItem={({ item }) => {
                        //console.log('렌더 아이템      ', item);
                        return <Item item={item} onPress={_handleItemPress}></Item>;
                    }}
                    windowSize={3}
                ></FlatList>
                {/* <Text>여기에 학생들 추천</Text>
        <Text>{studentInfoList.length}</Text> */}
            </View>
        </View>
    );
};
