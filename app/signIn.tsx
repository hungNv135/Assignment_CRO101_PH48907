import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<ParamListBase>;
}
const SignIn: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const saveData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

  const handleSignIn = () => {
    let hasError = false;

    if (email.trim() === '') {
      setEmailError('Email is required');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    if (email.trim() === 'hung' && password.trim() === '12345') {
      saveData('token', 'sample-token');
      saveData('username', email.trim());
      navigation.navigate('TrangChuLayout');
    } else {
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Image style={styles.logo} source={require('../assets/images/logo.png')} />
      <Text style={styles.welcome}>Welcome to Lungo</Text>
      <Text style={styles.title}>Login To Continue</Text>

      <TextInput
        style={[styles.input, emailError ? styles.errorBorder : null]}
        placeholder="Email Address"
        placeholderTextColor="#828282"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
        }}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={[styles.inputContainer, passwordError ? styles.errorBorder : null]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#828282"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
          secureTextEntry
        />
        <Image source={require('../assets/images/eye.png')} />
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleSignIn} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Sign In'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonGoogle} onPress={handleSignIn} disabled={isLoading}>
        <Image source={require('../assets/images/google.png')} style={{ marginLeft: 25, marginRight: 90 }} />
        <Text style={[styles.buttonText, { color: '#121212' }]}>Sign in with Google</Text>
      </TouchableOpacity>

      <View style={[styles.signupContainer, { marginTop: 50 }]}>
        <Text style={styles.text}>Don’t have an account? Click</Text>
        <TouchableOpacity>
          <Text style={styles.signupLink} onPress={() => navigation.navigate('RegisterScreen')}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.signupContainer]}>
        <Text style={styles.text}>Forget Password? Click</Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0C0F14',
  },
  buttonGoogle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    height: 57,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
  }, passwordInput: {
    flex: 1,
    height: '100%',
    color: '#828282',
  },
  title: {
    fontSize: 16,
    marginBottom: 24,
    color: '#828282',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 24,
    color: '#FFFFFF',
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#828282',
    marginBottom: 8,
    backgroundColor: '#0C0F14',
    color: '#828282',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#828282',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#0C0F14',
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    width: '100%',
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    marginTop: 30,
    width: '100%',
    height: 57,
    backgroundColor: '#D17842',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupLink: {
    color: '#D17842',
    marginLeft: 5,
  },
  text: {
    color: '#828282',
  }
});

export default SignIn;
