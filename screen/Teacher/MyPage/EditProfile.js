import React, { useEffect, useState } from "react";
import { Surface, TextInput, Button } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, TouchableOpacity, Text, Keyboard } from "react-native";
import { db, auth, getCurrentUser } from "../../../config/MyBase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import Image_ from "../../../component/Image.js";

const EditProfile = ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [memo, setMemo] = useState("");
    const [education, setEducation] = useState("");
    const [address, setAddress] = useState("");
    const user = getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

    useEffect(() => {
        const userId = getCurrentUser().uid;
        const unsub = onSnapshot(doc(db, `users/${userId}/`), (doc) => {
            console.log("Current data: ", doc.data());
            setName(doc.data().name);
            setMemo(doc.data().memo);
            setEducation(doc.data().education);
            setAddress(doc.data().address);
        });
        return () => unsub();
    }, []);

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

    const changeName = async () => {
        console.log(name);
        await updateDoc(doc(db, "users", auth.currentUser.uid), { name: name });
    };

    const changeMemo = async () => {
        console.log(memo);
        await updateDoc(doc(db, "users", auth.currentUser.uid), { memo: memo });
    };

    const changeAddress = async () => {
        console.log(address);
        await updateDoc(doc(db, "users", auth.currentUser.uid), { address: address });
    };
    const changeEducation = async () => {
        console.log(education);
        await updateDoc(doc(db, "users", auth.currentUser.uid), { education: education });
    };

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
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
                            url={photoUrl}
                            onChangeImage={_handlePhotoChange}
                            showButton={true}
                            rounded={true}
                            width_={100}
                            height_={100}
                        ></Image_>
                    </View>
                    <View style={{ flex: 4, flexDirection: "column" }}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>이름: {name}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>학력: {education}</Text>
                        </View>
                        {/*<View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ fontWeight: "bold", textDecorationLine: "underline", marginBottom: 5 }}>자기소개</Text>
                        <Text style={{ fontWeight: "bold" }}>{memo}</Text>
                </View>*/}
                    </View>
                </Surface>
                <Surface
                    style={{
                        width: wp("90%"),
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
                                marginLeft: 5,
                            }}
                        >
                            상세정보
                        </Text>
                        <View style={{ flexDirection: "row", marginBottom: 7 }}>
                            <TextInput
                                dense={true}
                                mode="outlined"
                                label="이름"
                                value={name}
                                onChangeText={setName}
                                style={{ fontSize: 16, flex: 5, marginRight: 5 }}
                            />
                            <Button
                                style={{ marginTop: 5, marginLeft: 5, justifyContent: "center" }}
                                mode="contained"
                                onPress={() => changeName(name)}
                            >
                                수정
                            </Button>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 7 }}>
                            <TextInput
                                mode="outlined"
                                multiline={true}
                                label="자기소개"
                                value={memo}
                                onChangeText={setMemo}
                                style={{ fontSize: 16, flex: 5, marginRight: 5 }}
                            />
                            <Button
                                style={{ marginTop: 5, marginLeft: 5, justifyContent: "center" }}
                                mode="contained"
                                onPress={() => changeMemo(memo)}
                            >
                                수정
                            </Button>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 7 }}>
                            <TextInput
                                dense={true}
                                mode="outlined"
                                label="학력"
                                value={education}
                                onChangeText={setEducation}
                                style={{ fontSize: 16, flex: 5, marginRight: 5 }}
                            />
                            <Button
                                style={{ marginTop: 5, marginLeft: 5, justifyContent: "center" }}
                                mode="contained"
                                onPress={() => changeEducation(education)}
                            >
                                수정
                            </Button>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 7 }}>
                            <TextInput
                                dense={true}
                                mode="outlined"
                                label="지역"
                                value={address}
                                onChangeText={setAddress}
                                style={{ fontSize: 16, flex: 5, marginRight: 5 }}
                            />
                            <Button
                                style={{ marginTop: 5, marginLeft: 5, justifyContent: "center" }}
                                mode="contained"
                                onPress={() => changeAddress(address)}
                            >
                                수정
                            </Button>
                        </View>
                    </View>
                </Surface>
            </TouchableOpacity>
        </View>
    );
};
export default EditProfile;
