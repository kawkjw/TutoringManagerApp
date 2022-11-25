import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Button from "../../../component/Button.js";
import Image_ from "../../../component/Image.js";
import style from "../../style.js";
import ChannelCreation from "./ChannelCreation.js";
import { getCurrentUser } from "../../../config/MyBase.js";
import moment from "moment";
import { db, auth } from "../../../config/MyBase.js";
import { collection, query, orderBy, onSnapshot, doc, getDoc, getDocs, where, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { pushNotificationsToPerson } from "../../../config/MyExpo.js";
import { useIsFocused } from "@react-navigation/native";

const getDateOrTime = (ts) => {
    const now = moment().startOf("day");
    const target = moment(ts).startOf("day");
    return moment(ts).format(now.diff(target, "days") > 0 ? "MM/DD" : "HH:mm");
};

const Item = React.memo(({ item, onPress }) => {
    const [displayName, setDisplayName] = useState("");
    const [displayPhotoUrl, setDisplayPhotoUrl] = useState("");
    const [otherUid, setOtherUid] = useState("");
    const [lastTime, setLastTime] = useState("");
    const [lastMessageText, setLastMessageText] = useState("");
    //console.log('Item 안:       ', item);
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "channels", item), (doc) => {
            //console.log('Item 안의 onSnapshot');
            //console.log(doc.data());
            const myUid_ = getCurrentUser().uid;
            if (myUid_ === doc.data().hostUid) {
                //guest정보를 띄워야 함
                setDisplayName(doc.data().guestName);
                setDisplayPhotoUrl(doc.data().guestPhotoUrl);
                setOtherUid(doc.data().guestUid);
                setLastTime(doc.data().lastMessageTime);
                setLastMessageText(doc.data().lastMessageText);
            } else if (myUid_ === doc.data().guestUid) {
                //host 정보를 띄워야 함
                setDisplayName(doc.data().hostName);
                setDisplayPhotoUrl(doc.data().hostPhotoUrl);
                setOtherUid(doc.data().hostUid);
                setLastTime(doc.data().lastMessageTime);
                setLastMessageText(doc.data().lastMessageText);
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <TouchableOpacity
            style={style.itemContainer}
            onPress={() => {
                onPress({ otherUid, displayName, displayPhotoUrl, channelId: item });
            }}
        >
            <View style={{ flex: 1, flexDirection: "row" }}>
                <Image_ url={displayPhotoUrl} showButton={false} rounded={true} width_={60} height_={60}></Image_>
                <View
                    style={{
                        flex: 5,
                        //backgroundColor: 'yellow',
                        marginTop: 5,
                        marginBottom: 3,
                        marginLeft: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "600",
                            marginBottom: 4,
                        }}
                    >
                        {displayName}
                    </Text>
                    <Text style={{ fontSize: 16, color: style.colorList.black }}>
                        {lastMessageText ? lastMessageText : "메세지 내용 없음"}
                    </Text>
                </View>
            </View>
            <Text style={{ fontSize: 16, color: style.colorList.black }}>{lastTime ? getDateOrTime(lastTime) : "메세지가 없음"}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={style.colorList.black}></MaterialIcons>
        </TouchableOpacity>
    );
});

const ChannelList = ({ navigation, route }) => {
    //console.log('화면 렌더');
    const _handleCreateButtonPress = (params) => {
        //console.log(params);
        navigation.navigate("ChannelCreation", params);
    };
    const [channels, setChannels] = useState([]);
    const { uid: myUid, name: myName, photoUrl: myPhotoUrl } = getCurrentUser();
    const isFocused = useIsFocused();
    const [newChat, setNewChat] = useState(true);

    const _handleItemPress = (params) => {
        navigation.navigate("Channel", params);
    };
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "users", myUid), (doc) => {
            //console.log(doc.data().myChannels);
            setChannels(doc.data().myChannels);
        });
        return () => unsubscribe();
    }, []);

    const makeChannel = async (guestUid, guestName, guestPhotoUrl) => {
        await getDocs(query(collection(db, "channels"), where("guestUid", "==", guestUid), where("hostUid", "==", myUid)))
            .then(async (docs) => {
                let isEmpty = false;
                let channelId = "";
                if (docs.empty) {
                    await getDocs(query(collection(db, "channels"), where("guestUid", "==", myUid), where("hostUid", "==", guestUid))).then(
                        async (docs) => {
                            if (docs.empty) {
                                isEmpty = true;
                            } else {
                                channelId = docs.docs[0].data().id;
                            }
                        }
                    );
                } else {
                    channelId = docs.docs[0].data().id;
                }
                return { isEmpty: isEmpty, id: channelId };
            })
            .then(async ({ isEmpty, id }) => {
                if (isEmpty) {
                    await addDoc(collection(db, "channels"), {
                        createdAt: Date.now(),
                        hostUid: myUid,
                        hostName: myName,
                        hostPhotoUrl: myPhotoUrl,
                        guestUid: guestUid,
                        guestName: guestName,
                        guestPhotoUrl: guestPhotoUrl,
                    })
                        .then(async (document) => {
                            await updateDoc(doc(db, "users", myUid), {
                                myChannels: arrayUnion(document.id),
                            });
                            await updateDoc(doc(db, "users", guestUid), {
                                myChannels: arrayUnion(document.id),
                            });
                            await updateDoc(doc(db, "channels", document.id), {
                                id: document.id,
                            });
                            return document.id;
                        })
                        .then((newChannelId) => {
                            navigation.navigate("Channel", {
                                otherUid: guestUid,
                                //guestId,
                                displayName: guestName,
                                //hostUid,
                                //hostName,
                                displayPhotoUrl: guestPhotoUrl,
                                //hostPhotoUrl,
                                channelId: newChannelId,
                            });
                        });
                } else {
                    navigation.navigate("Channel", {
                        otherUid: guestUid,
                        //guestId,
                        displayName: guestName,
                        //hostUid,
                        //hostName,
                        displayPhotoUrl: guestPhotoUrl,
                        //hostPhotoUrl,
                        channelId: id,
                    });
                }
            });
    };

    useEffect(() => {
        if (isFocused) {
            if (route.params) {
                const { teacherUid, teacherName, teacherPhotoUrl } = route.params;
                if (!route.params.finish) makeChannel(teacherUid, teacherName, teacherPhotoUrl);
                navigation.setParams({ finish: true });
            }
        }
    }, [isFocused]);
    return (
        <View style={style.container}>
            <FlatList
                keyExtractor={(item) => {
                    //console.log('키 익스트래터    ', item);
                    return item;
                }}
                data={channels}
                renderItem={({ item }) => {
                    //console.log('렌더 아이템      ', item);
                    return <Item item={item} onPress={_handleItemPress}></Item>;
                }}
                windowSize={3}
            ></FlatList>
            <TouchableOpacity
                style={{
                    backgroundColor: style.colorList.navy,
                    alignItems: "center",
                    borderRadius: 10,
                    width: style.size.width_ - 20,
                    padding: 10,
                    marginHorizontal: 10,
                    marginBottom: 20,
                }}
                onPress={_handleCreateButtonPress}
            >
                <Text style={style.btnTitle}>새 채팅방 만들기</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChannelList;
