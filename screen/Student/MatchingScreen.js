import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchingHome from "./Matching/MatchingHome";

const MatchingStack = createNativeStackNavigator();

const MatchingStackScreen = ({ navigation, route }) => {
    return (
        <MatchingStack.Navigator>
            <MatchingStack.Screen options={{ title: "과외 매칭" }} name="MatchingHome" component={MatchingHome} />
        </MatchingStack.Navigator>
    );
};

export default MatchingStackScreen;
