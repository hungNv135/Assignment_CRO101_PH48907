import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './splash';
import SignIn from './signIn';
import Register from './register';
import TrangChuLayout from './_layoutTrangChu';
import details from './detail';
import setting from './setting';
import profile from './profile';
import cart from './cart';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator 
        initialRouteName="SplashScreen"
        screenOptions={{ 
          headerShown: false, 
          animation: 'slide_from_right',
        }}
        >
        <Stack.Screen name="SplashScreen" component={Splash}/>
        <Stack.Screen name="SignInScreen" component={SignIn}/>
        <Stack.Screen name="RegisterScreen" component={Register}/>
        <Stack.Screen name="TrangChuLayout" component={TrangChuLayout}/>
        <Stack.Screen name="Detail" component={details}/>
        <Stack.Screen name="Setting" component={setting}/>
        <Stack.Screen name="Profile" component={profile}/>
        <Stack.Screen name="Cart" component={cart}/>
      </Stack.Navigator>
  );
}