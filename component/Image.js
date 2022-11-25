import React, { useEffect } from "react";
import style from "../screen/style.js";
import { Platform, Alert, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const PhotoButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={style.cameraBtn} onPress={onPress}>
            <MaterialIcons name="photo-camera" size={20} color="white" />
        </TouchableOpacity>
    );
};

const onChangeImage = () => {};

const Image_ = ({ url, imageStyle, rounded, showButton, onChangeImage, width_, height_ }) => {
    // console.log(url);

    useEffect(() => {
        (async () => {
            try {
                if (Platform.OS === "ios") {
                    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                    if (status !== "granted") {
                        Alert.alert("Photo Permission", "Please turn on the camera roll permissions.");
                    }
                }
            } catch (e) {
                Alert.alert("Photo Permission Error", e.message);
            }
        })();
    }, []);

    // const _handleEditButton = () => {
    //   console.log('카메라 버튼 눌렀음');
    // };

    const _handleEditButton = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                onChangeImage(result.uri);
            }
        } catch (e) {
            Alert.alert("Photo Error", e.message);
        }
    };

    return rounded ? (
        <View>
            <Image
                source={{ uri: url }}
                style={{
                    backgroundColor: "green",
                    width: width_ ? width_ : 100,
                    height: height_ ? height_ : 100,
                    borderRadius: 50,
                    // borderRadius: 8,
                    // backgroundColor: style.img.backgroundColor,
                }}
            ></Image>
            {showButton && <PhotoButton onPress={_handleEditButton} />}
        </View>
    ) : (
        <View style={{ alignSelf: "center", marginBottom: 30 }}>
            <Image
                source={{ uri: url }}
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "green",
                    borderRadius: 8,
                    //backgroundColor: style.img.backgroundColor,
                }}
            ></Image>
            {showButton && <PhotoButton onPress={_handleEditButton} />}
        </View>
    );
};

export default Image_;
