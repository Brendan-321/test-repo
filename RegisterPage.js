import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require("./assets/minibus.png")} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.instructionsText}>
          Please fill in your information before proceeding
        </Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="gray" />
          <TextInput placeholder="Name" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="phone-alt" size={20} color="gray" />
          <TextInput placeholder="Phone Number" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="gray" />
          <TextInput placeholder="Email Address" style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="gray" />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          By registering you acknowledge that you have accepted and agreed to
          the terms and conditions of Uyaphi.
        </Text>
        <Text style={styles.copyrightText}>© 2024 All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  signUpButton: {
    height: 50,
    backgroundColor: "#28a745",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
  loginLink: {
    color: "#26a69a",
    textDecorationLine: "underline",
  },
  footerText: {
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  copyrightText: {
    textAlign: "center",
    color: "gray",
  },
});

export default RegisterScreen;
