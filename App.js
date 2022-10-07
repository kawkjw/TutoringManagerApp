import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import style from './src/style.js';
import user from './src/userList.js';
import {
  HomeScreen,
  MatchingScreen,
  CalendarScreen,
  ClassListScreen,
  ChatListScreen,
  MatchingProfileScreen,
  StudentListScreen,
  LoginScreen,
  SignupScreen,
} from './src/screen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  let homeTitle = `반갑습니다 ${user.name}${user.type}!`;
  return (
    <NavigationContainer style={style.navigationContainer}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: homeTitle,
            headerTintColor: 'blue',
            headerStyle: { backgroundColor: 'teal' },
          }}
        />
        <Stack.Screen name='Matching' component={MatchingScreen} />
        <Stack.Screen name='Calendar' component={CalendarScreen} />
        <Stack.Screen name='ClassList' component={ClassListScreen} />
        <Stack.Screen name='ChatList' component={ChatListScreen} />
        <Stack.Screen
          name='MatchingProfile'
          component={MatchingProfileScreen}
        />
        <Stack.Screen name='StudentList' component={StudentListScreen} />

        {/* <Stack.Screen name='2nd' component={SecondScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
