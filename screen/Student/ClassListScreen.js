import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassList from "./Class/ClassList";

const ClassStack = createNativeStackNavigator();

const ClassListScreen = ({ navigation, route }) => {
    return (
        <ClassStack.Navigator>
            <ClassStack.Screen options={{ title: "수업 목록" }} name="ClassLists" component={ClassList} />
        </ClassStack.Navigator>
    );
};

export default ClassListScreen;
