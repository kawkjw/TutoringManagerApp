import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, View, FlatList, Alert } from "react-native";
import style from "../../style.js";
import { getCurrentUser, db, createMessage, auth } from "../../../config/MyBase.js";

import { collection, getDocs, orderBy, query, onSnapshot, where } from "firebase/firestore";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons } from "@expo/vector-icons";
import { pushNotificationsToPerson } from "../../../config/MyExpo.js";

const SendButton = (props) => {
    return (
        <Send
            {...props}
            disabled={!props.text}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 4,
            }}
        >
            <MaterialIcons name="send" size={24} color={props.text ? style.colorList.blue : style.colorList.grey_1}></MaterialIcons>
        </Send>
    );
};

const Channel = ({ navigation, route: { params } }) => {
    const { uid, name, photoUrl } = getCurrentUser();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState([]);

    useEffect(() => {
        const messageRef = collection(db, "channels", params?.id, "messages");
        //console.log('메세지ref 정보:     ', messageRef);

        const messageQuery = query(messageRef, orderBy("createdAt", "desc"));
        //console.log(messageQuery);
        const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
            const messageList = [];
            querySnapshot.forEach((doc) => {
                messageList.push(doc.data());
            });
            setMessages(messageList);
        });
        return () => unsubscribe();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: params.inviteUser || "Channel" });
    }, []);

    const _handleMessageSend = async (messageList) => {
        const newMessage = messageList[0];
        await createMessage({ channelId: params.id, message: newMessage })
            .then(async () => {
                await getDocs(query(collection(db, "users"), where("id", "==", params.inviteUser))).then(async (users) => {
                    await pushNotificationsToPerson(auth.currentUser.displayName, users.docs[0].data().uid, "새로운 채팅", newMessage.text);
                });
            })
            .catch((error) => {
                Alert.alert("Send Message Error", error.message);
            });
    };
    console.log("초대한 사람의 uid, name:     ", uid, name);
    console.log("초대할 사람의 id  (params(inviteUser)):    ", params);

    return (
        <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
            <GiftedChat
                listViewProps={{
                    style: { backgroundColor: style.colorList.skyBlue },
                }}
                placeholder="Enter a message..."
                messages={messages}
                user={{ _id: uid, name: name, avatar: photoUrl }}
                onSend={_handleMessageSend}
                alwaysShowSend={true}
                textInputProps={{
                    autoCapitalize: "none",
                    autoCorrect: false,
                    textContentType: "none", // iOS only
                    underlineColorAndroid: "transparent", // Android only
                }}
                multiline={false}
                renderUsernameOnMessage={true}
                scrollToBottom={true}
                renderSend={(props) => <SendButton {...props} />}
            />
        </View>
    );
};

export default Channel;
