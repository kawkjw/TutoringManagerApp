import React from "react";
import style from "../screen/style.js";
import { TouchableOpacity, Text } from "react-native";

const TRANSPARENT = "transparent";

const Button = ({ containerStyle, title, onPress, isFilled, disabled }) => {
    return isFilled ? (
        <TouchableOpacity
            // { ...style.btnText, color: working ? 'white' : theme.grey }
            style={{
                ...style.btnContainer,
                // containerStyle,
                opacity: disabled ? 0.5 : 1,
            }}
            onPress={onPress}
            isFilled={isFilled}
            disabled={disabled}
        >
            <Text style={style.btnTitle} isFilled={isFilled}>
                {title}
            </Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            style={{
                ...style.btnContainer,
                backgroundColor: style.container.backgroundColor,
            }}
            onPress={onPress}
            isFilled={isFilled}
        >
            <Text
                style={{
                    ...style.btnTitle,
                    color: style.btnContainer.backgroundColor,
                }}
                isFilled={isFilled}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
