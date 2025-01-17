import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>;
export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/welcome.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Welcome to Lungo !!</Text>
      <Text style={styles.subTitle}>Login to Continue</Text>

      <TextInput
        placeholder="Emall Address"
        placeholderTextColor="#52555A"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#52555A"
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />
        <Image
          source={require('../assets/images/eye.png')}
          style={styles.eyeIcon}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
        <Image
          source={require('../assets/images/gg.png')}
          style={styles.googleIcon}
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? Click </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Forget Password? Click </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPass')}>
          <Text style={styles.registerLink}>Reset</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  textInput: {
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0C0F14',
    color: '#52555A',
    fontWeight: 'bold',
    borderRadius: 6,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#52555A',
    marginStart: 5,
    marginEnd: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 17,
    color: '#52555A',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    color: '52555A',
    borderColor: '#52555A',
    borderRadius: 6,
    marginStart: 5,
    marginEnd: 5,
    backgroundColor: '#0C0F14',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: '#52555A',
    fontSize: 16,
  },
  eyeIcon: {
    width: 30,
    height: 20,
    marginHorizontal: 10,
    tintColor: '#52555A',
  },
  button: {
    marginVertical: 3,
    marginStart: 5,
    marginEnd: 5,
    marginTop: 30,
    backgroundColor: '#D17842',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0C0F14',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginStart: 5,
    marginEnd: 5,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 15,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginLeft: 15,
    marginRight: 10,
    marginEnd: 90,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#52555A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLink: {
    color: '#D17842',
    fontSize: 16,
    fontWeight: 'bold',
  },

});