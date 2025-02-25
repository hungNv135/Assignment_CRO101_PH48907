"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

const ProfileScreen = () => {
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/images/back.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Setting</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
        <Image source={require('../assets/images/user.png')}  style={styles.avatar}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Nguyen Van A" placeholderTextColor="#666" />
          <TextInput style={styles.input} placeholder="vana@gmail.com" placeholderTextColor="#666" />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={require("../assets/images/eye.png")} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Re-type password"
              placeholderTextColor="#666"
              secureTextEntry={!showRePassword}
            />
            <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)}>
              <Image source={require("../assets/images/eye.png")} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0F14",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  placeholder: {
    width: 24,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: "#1F2937",
    marginBottom: 30,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    width: "100%",
    gap: 16,
  },
  input: {
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 15,
    color: "#fff",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    borderRadius: 8,
    paddingRight: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    color: "#fff",
    fontSize: 16,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: "#666",
  },
  saveButton: {
    backgroundColor: "#D17842",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default ProfileScreen

