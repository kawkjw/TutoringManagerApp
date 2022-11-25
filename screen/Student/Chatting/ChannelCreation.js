import React, { useState, useEffect } from "react";
import { View, Text, Alert, TextInput } from "react-native";
import Button from "../../../component/Button.js";
import Input from "../../../component/Input.js";
import style from "../../style.js";
import { getCurrentUser, createChannel, db } from "../../../config/MyBase.js";
import { getDocs, query, collection, where, addDoc, updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";

const ChannelCreation = ({ navigation, route }) => {
    const [guestId, setGuestId] = useState("");
    const [guestName, setGuestName] = useState("");
    const { uid: hostUid, name: hostName, photoUrl: hostPhotoUrl } = getCurrentUser();

    const createNewChannel = async () => {
        console.log("삐용");
        console.log(guestId);
        await getDocs(query(collection(db, "users"), where("id", "==", guestId))).then((guest) => {
            console.log("첫번째 then 시작");
            console.log(guest);
            if (guest.empty) {
                Alert.alert("오류", "해당 아이디를 가진 사람이 없습니다", [{ text: "확인" }], { cancelable: false });
            } else {
                // console.log('게스트가 존재');
                // console.log(guest.docs[0].data());
                const { name: guestName, uid: guestUid, photoURL: guestPhotoUrl } = guest.docs[0].data();
                // console.log('게스트 정보 초기화');
                // console.log(guestName, '      ', guestUid);
                // console.log(guestPhotoUrl);
                let newChannelId = "";
                Alert.alert(guestName, "초대하려는 사람의 이름이 맞습니까?", [
                    {
                        text: "취소",
                        style: "cancel",
                    },
                    {
                        text: "확인",
                        onPress: async () => {
                            // console.log(
                            //   `이제 ${guestName}과 ${hostName}의 채널을 생성해야 함`
                            // );
                            // console.log(hostUid);
                            // console.log(hostPhotoUrl);
                            // console.log(guestPhotoUrl);
                            await addDoc(collection(db, "channels"), {
                                createdAt: Date.now(),
                                hostUid: hostUid,
                                hostName: hostName,
                                hostPhotoUrl: hostPhotoUrl,
                                guestUid: guestUid,
                                guestName: guestName,
                                guestPhotoUrl: guestPhotoUrl,
                            })
                                .then(async (document) => {
                                    console.log("여기가 두번째 then");
                                    console.log(document.id);
                                    await updateDoc(doc(db, "users", hostUid), {
                                        myChannels: arrayUnion(document.id),
                                    });
                                    await updateDoc(doc(db, "users", guestUid), {
                                        myChannels: arrayUnion(document.id),
                                    });
                                    await updateDoc(doc(db, "channels", document.id), {
                                        id: document.id,
                                    });
                                    newChannelId = document.id;
                                })
                                .then(() => {
                                    console.log("여기가 세번째 then");
                                    console.log(newChannelId);
                                    Alert.alert(
                                        "성공",
                                        "채팅방 생성",
                                        [
                                            {
                                                text: "확인",
                                                onPress: () =>
                                                    navigation.replace("Channel", {
                                                        otherUid: guestUid,
                                                        //guestId,
                                                        displayName: guestName,
                                                        //hostUid,
                                                        //hostName,
                                                        displayPhotoUrl: guestPhotoUrl,
                                                        //hostPhotoUrl,
                                                        channelId: newChannelId,
                                                    }),
                                            },
                                        ],
                                        {
                                            cancelable: false,
                                        }
                                    );
                                });
                        },
                    },
                ]);
            }
        });
    };

    return (
        <View style={style.container}>
            <Input
                label="채팅할 상대방의 아이디를 입력해주세요"
                value={guestId}
                placeholder="상대방의 id 입력"
                onChangeText={setGuestId}
                onSubmitEditing={() => {
                    setGuestId(guestId.trim());
                    //_handleCreateButtonPress();
                }}
                disabled={false}
            ></Input>
            <Button title="초대하기" isFilled={true} onPress={() => createNewChannel()}></Button>
        </View>
    );
};

export default ChannelCreation;
