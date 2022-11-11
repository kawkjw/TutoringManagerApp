import React, { useContext, useState } from "react";
import { Button, Text, View, TextInput, Alert } from "react-native";
import { AuthContext } from "../Auth";
import { getCurrentUser, updateUserPhoto } from "../../config/MyBase";

import Image_ from "../../component/Image.js";
import style from "../style";

function MyPageScreen({ navigation, route }) {
    const { signOut } = useContext(AuthContext);
    const user = getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

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

    //updateUserPhoto('s');
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: 20,
                    marginVertical: 15,
                }}
            >
                <Image_ url={photoUrl} onChangeImage={_handlePhotoChange} showButton={true} rounded={true}></Image_>
                <View
                    style={{
                        flex: 1,
                        marginLeft: 20,
                        //backgroundColor: styles.colorList.navy,
                        backgroundColor: "#cce6ff",
                        //opacity: 0.2,
                        borderRadius: 15,
                        padding: 15,
                    }}
                >
                    <Text style={{ fontSize: 15, color: style.colorList.navy }}>여기에 이름이 나와야해요: {user.name}</Text>
                    <Text style={{ fontSize: 15, color: style.colorList.navy }}>여기에 아이디가 나와야해요: {user.email}</Text>
                </View>
            </View>
            <View
                style={{
                    flex: 0.8,
                    marginBottom: 40,
                    marginTop: 10,
                    //backgroundColor: styles.colorList.navy,
                    width: style.size.width_ - 40,
                }}
            >
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
            <Button title="로그아웃" onPress={signOut} />
        </View>
    );
}

export default MyPageScreen;
