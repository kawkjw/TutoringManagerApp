import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import style from "../../style";
import { ClassListView } from "../../../component/ClassListView.js";
import { ModalView } from "../../../component/ModalView.js";

export const Date = (params) => {
    // console.log('$$$$    Date로 들어온 파라미터    $$$$$$');
    // console.log(params);

    const dateInstance = params?.dateInfo;

    const [modalVisible, setModalVisible] = useState(false);
    const myBlur = (msg) => {
        if (msg === true) {
            console.log("here");
        } else {
            console.log("여기는 영역 안");
        }
    };
    const day = params?.dayName;
    return (
        <View style={style.dateContainer}>
            <Modal
                animationType="none"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    //Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <ModalView dateInstance={dateInstance} setModalVisible={setModalVisible} modalVisible={modalVisible} day={day} />
            </Modal>
            <TouchableOpacity
                onPress={() => {
                    return setModalVisible(true);
                }}
                style={{
                    opacity: dateInstance.isCurrentMonth ? 1 : 0.5,
                    backgroundColor: dateInstance.isToday
                        ? "#b3daff"
                        : dateInstance.isCurrentMonth
                        ? style.colorList.skyBlue
                        : style.colorList.white,
                    flex: 1,
                    alignItems: "stretch",
                    paddingHorizontal: 3,
                    borderRadius: dateInstance.isToday ? 10 : 0,
                }}
            >
                <Text style={{ color: dateInstance.isHoliday ? "red" : "black" }}>{dateInstance.date}</Text>
                <ClassListView dateInfo={dateInstance} dayName={day}></ClassListView>
            </TouchableOpacity>
        </View>
    );
};
