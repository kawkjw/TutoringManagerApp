import React, { useState, forwardRef } from "react";
import style from "../screen/style.js";
import { View, Text, TextInput } from "react-native";

const myBlur = () => {
    //console.log('지금 블러');
};

const Input = forwardRef(
    (
        {
            label,
            value,
            onChangeText,
            onSubmitEditing,
            // onBlur,
            placeholder,
            isPassword,
            returnKeyType,
            maxLength,
            disabled,
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        return (
            <View style={{ ...style.inputView, paddingHorizontal: 20 }}>
                <Text style={style.label}>{label}</Text>
                <TextInput
                    ref={ref}
                    style={
                        disabled
                            ? {
                                  ...style.textInput,
                                  backgroundColor: style.colorList.grey_0,
                              }
                            : style.textInput
                    }
                    isFocused={isFocused}
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);

                        myBlur();
                    }}
                    placeholder={placeholder}
                    secureTextEntry={isPassword}
                    returnKeyType={returnKeyType}
                    maxLength={maxLength}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    editable={!disabled}
                ></TextInput>
            </View>
        );
    }
);

export default Input;
