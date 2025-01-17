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

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'SignUp'>;

export default function RegisterScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    if (password === rePassword) {
      setErrorMessage('');
      navigation.replace('Home');
    } else {
      setErrorMessage('Mật khẩu không khớp!');
    }
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/welcome.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Welcome to Lungo !!</Text>
      <Text style={styles.subTitle}>Register to Continue</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#52555A"
        value={name}
        onChangeText={setName}
        style={styles.textInput}
      />

      <TextInput
        placeholder="Email"
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

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Re-type Password"
          placeholderTextColor="#52555A"
          secureTextEntry={true}
          value={rePassword}
          onChangeText={setRePassword}
          style={styles.passwordInput}
        />
        <Image
          source={require('../assets/images/eye.png')}
          style={styles.eyeIcon}
        />
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>You have an account? Click </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.registerLink}> Sign In</Text>
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
    color: '#52555A',
    borderColor: '#52555A',
    borderRadius: 6,
    marginStart: 5,
    marginEnd: 5,
    backgroundColor: '#0C0F14',
    marginBottom: 10,
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
    marginVertical: 20,
    marginStart: 5,
    marginEnd: 5,
    backgroundColor: '#D17842',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0C0F14',
    fontSize: 18,
    fontWeight: 'bold',
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
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
});
