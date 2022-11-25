import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, View, FlatList, Alert, TextInput } from "react-native";
import Image_ from "../../../component/Image.js";
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
    //console.log('채널 안');
    //console.log(params);
    // {"channelId": "JM9GLE7QwHwjD8aVJQsu", "displayName": "선생3",
    // "displayPhotoUrl": "https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/profile%2FWkjsWVFc59hz9lpwi7szwv6FCrr1%2Fphoto.png?alt=media&token=9dfc2balt=media&token=9dfc2b07-1f7f-44ac-83e4-a425ca118b2a",
    // "otherUid": "WkjsWVFc59hz9lpwi7szwv6FCrr1"}
    const { uid, name, photoUrl } = getCurrentUser();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState([]);

    useEffect(() => {
        const messageRef = collection(db, "channels", params?.channelId, "messages");
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
        navigation.setOptions({ headerTitle: params?.displayName || "Channel" });
    }, []);

    const _handleMessageSend = async (messageList) => {
        const newMessage = messageList[0];
        try {
            //console.log('핸들메세지내부');
            //console.log(params?.channelId);
            //console.log(newMessage);
            await createMessage({
                channelId: params?.channelId,
                message: newMessage,
            });
        } catch (e) {
            Alert.alert("Send Message Error", e.message);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
            <GiftedChat
                listViewProps={{
                    style: { backgroundColor: style.colorList.skyBlue },
                }}
                placeholder="Enter a message..."
                messages={messages}
                user={{ _id: uid, name, avatar: photoUrl }}
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
