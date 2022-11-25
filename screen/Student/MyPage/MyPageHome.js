import React, { useContext, useState, useEffect } from "react";
import { Text, View, TextInput, Alert, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../../Auth";
import { getCurrentUser, updateUserPhoto, db, auth } from "../../../config/MyBase";
import {
    getDocs,
    collection,
    deleteDoc,
    doc,
    setDoc,
    query,
    orderBy,
    getDoc,
    ref,
    onValue,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import Image_ from "../../../component/Image.js";
import style from "../../style";
import { Button } from "react-native-paper";

export default MyPageScreen = ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [memo, setMemo] = useState("");
    const [education, setEducation] = React.useState("");
    const [address, setAddress] = React.useState("");
    const { signOut } = useContext(AuthContext);
    const user = getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [grade, setGrade] = useState("");
    const [schoolname, setSchoolname] = useState("");

    console.log(user);

    const _handlePhotoChange = async (url) => {
        console.log("핸들 포토 체인지");
        try {
            //spinner.start();
            const updatedUser = await updateUserPhoto(url);

            setPhotoUrl(updatedUser.photoUrl);
        } catch (e) {
            Alert.alert("Photo Error", e.message);
        } finally {
            //spinner.stop();
        }
    };

    useEffect(() => {
        const userId = getCurrentUser().uid;
        const unsub = onSnapshot(doc(db, `users/${userId}/`), (doc) => {
            console.log("Current data: ", doc.data());
            setName(doc.data().name);
            setMemo(doc.data().memo);
            setEducation(doc.data().education);
            setAddress(doc.data().address);
            setId(doc.data().id);
            setGrade(doc.data().grade);
            setSchoolname(doc.data().schoolName);
        });
        return () => unsub();
    }, []);

    //updateUserPhoto('s');
    return (
        <ScrollView>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        marginHorizontal: 20,
                        marginVertical: 15,
                    }}
                >
                    <Image_ url={photoUrl} onChangeImage={_handlePhotoChange} showButton={true} rounded={true}></Image_>
                </View>
                <View
                    style={{
                        flex: 1,

                        //backgroundColor: styles.colorList.navy,
                        backgroundColor: "#cce6ff",
                        //opacity: 0.2,
                        borderRadius: 15,
                        padding: 15,
                        width: style.size.width_ - 40,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: style.colorList.navy,
                            marginBottom: 15,
                        }}
                    >
                        아이디: {id}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: style.colorList.navy,
                            marginBottom: 15,
                        }}
                    >
                        이름: {name}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: style.colorList.navy,
                            marginBottom: 15,
                        }}
                    >
                        학력: {schoolname} {grade}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: style.colorList.navy,
                            marginBottom: 15,
                        }}
                    >
                        성적: {education}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: style.colorList.navy,
                            marginBottom: 15,
                        }}
                    >
                        지역: {address}
                    </Text>
                    <Text style={{ textDecorationLine: "underline", marginBottom: 15 }}>자기소개{"\n"}</Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: style.colorList.navy,
                        }}
                    >
                        {memo}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.8,
                        marginBottom: 40,
                        marginTop: 10,
                        //backgroundColor: style.colorList.navy,
                        width: style.size.width_ - 40,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                        <View
                            style={{
                                backgroundColor: "#cce6ff",
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                marginTop: 20,
                                marginBottom: 10,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ fontSize: 22, color: style.colorList.navy }}>기본 프로필 설정</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("DailyRecordList")}>
                        <View
                            style={{
                                backgroundColor: "#cce6ff",
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                                marginVertical: 10,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ fontSize: 22, color: style.colorList.navy }}>알림 설정</Text>
                        </View>
                    </TouchableOpacity>

                    <View
                        style={{
                            backgroundColor: "#cce6ff",
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            marginVertical: 10,
                            borderRadius: 8,
                        }}
                    >
                        <Text style={{ fontSize: 22, color: style.colorList.navy }}>QnA</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: "#cce6ff",
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            marginVertical: 10,
                            borderRadius: 8,
                        }}
                    >
                        <Text style={{ fontSize: 22, color: style.colorList.navy }}>공지사항</Text>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        marginBottom: 20,
                    }}
                >
                    <Button mode="contained" onPress={signOut}>
                        로그아웃
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};
