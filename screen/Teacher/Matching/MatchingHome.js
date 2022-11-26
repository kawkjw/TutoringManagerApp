import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, FlatList, TextInput, StatusBar, Platform } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { getCurrentUser, getMatchingInfo, db } from "../../../config/MyBase.js";
import { collection, doc, onSnapshot, query, where, updateDoc, getDoc } from "firebase/firestore";
import { getSortedStudentList } from "../../../config/getSortedList.js";
import style from "../../style.js";
import Image_ from "../../../component/Image.js";

//import { GetScore } from '../../../config/getScore.js';
const defaultPhotoUrl =
    //'https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/photo.png?alt=media';
    "https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/todayProfile.png?alt=media";

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
    const [isSub4Finished, setIsSub4Finished] = useState(false);
    const [elementaryChecked, setElementryChecked] = useState(false);
    const [middleChecked, setMiddleChecked] = useState(false);
    const [high1Checked, setHigh1Checked] = useState(false);
    const [high2Checked, setHigh2Checked] = useState(false);
    const [high3Checked, setHigh3Checked] = useState(false);
    const [matchingGradeString, setMatchingGradeString] = useState("");
    const [weight1, setWeight1] = useState("20");
    const [weight2, setWeight2] = useState("20");
    const [weight3, setWeight3] = useState("20");
    const [weight4, setWeight4] = useState("20");
    const [weight5, setWeight5] = useState("20");

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
        studentInfoList_.forEach(async (studentItem, index) => {
            const docSnap = await getDoc(doc(db, "users", studentItem?.uid, "matching", studentItem?.studentCurrentMatchingId));
            studentItem.matchingInfo = docSnap.data();
            if (index + 1 === studentInfoList_.length) {
                setIsSub4Finished(true);
            }
        });
        if (isSub4Finished) {
            console.log(studentInfoList_);
            setStudentInfoList(studentInfoList_);
        }
        return () => unsub4();
    }, [isSub3Finished, isSub4Finished]);

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
            //console.log(gradeString);
        } else {
            gradeString = "정보 없음";
        }
        return gradeString;
    };
    const sortStudentList = async () => {
        console.log("학생을 추천해줘야함");

        if (currentMatchingInfoId === "") {
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

    const changeWeight = (value, weightNumber) => {
        console.log("changeWeight 안");

        if (weightNumber === 1) {
            //console.log('여기 들어옴');
            setWeight1(value);
        }
        if (weightNumber === 2) {
            setWeight2(value);
        }
        if (weightNumber === 3) {
            setWeight3(value);
        }
        if (weightNumber === 4) {
            setWeight4(value);
        }
        if (weightNumber === 5) {
            setWeight5(value);
        }
    };

    const Weight = ({ weightValue, weightTitle, setWeight, weightNumber }) => {
        console.log(weightValue, weightTitle, setWeight, weightNumber);
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
                            marginHorizontal: 4,
                        }}
                    >
                        <TextInput
                            onChangeText={setWeight}
                            value={weightValue}
                            //keyboardType={'numeric'}
                            style={{
                                fontSize: 24,
                                marginVertical: 2,
                                color: "black",
                            }}
                        />
                    </View>
                    {/* <View
            style={{
              flex: 2,
              //borderWidth: 1
            }}
          >
            <TouchableOpacity
              style={{ marginHorizontal: 3 }}
              onPress={() => changeWeight(value, setWeight, true, weightNumber)}
            >
              <AntDesign
                name='plussquareo'
                size={20}
                color={style.colorList.navy}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: 3 }}
              onPress={() =>
                changeWeight(value, setWeight, false, weightNumber)
              }
            >
              <AntDesign
                name='minussquareo'
                size={20}
                color={style.colorList.navy}
              />
            </TouchableOpacity>
          </View> */}
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
            <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "default"} />
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
                    //flex: 3.5,
                    height: 180,
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
                                성적
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
                        alignItems: "center",
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
