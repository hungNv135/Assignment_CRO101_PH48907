import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'expo-router/entry';
import LoginScreen from './login';
import SignUpScreen from './signup';
import DetailScreen from './detail';
import WelcomeScreen from './welcome';
import ResetpassScreen from './resetpass';
import HomeScreen from './home';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ResetPass" component={ResetpassScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
