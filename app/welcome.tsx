import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Định nghĩa kiểu RootParamList cho Stack Navigator
type RootParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  ResetPass: undefined;
  Welcome: undefined;
  Detail: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image
          source={require('../assets/images/welcome.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});