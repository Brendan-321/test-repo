import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CONTACT US</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#28a745"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#28a745"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Message"
        placeholderTextColor="#28a745"
        multiline
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity>
      <Text style={styles.contactText}>Contact</Text>
      <Text style={styles.emailText}>uyaphi???@gmail.com</Text>
      <View style={styles.socialContainer}>
        <Icon
          name="facebook"
          size={30}
          color="#000"
          onPress={() => Linking.openURL("https://facebook.com")}
        />
        <Icon
          name="instagram"
          size={30}
          color="#000"
          onPress={() => Linking.openURL("https://instagram.com")}
        />
        <Icon
          name="whatsapp"
          size={30}
          color="#000"
          onPress={() => Linking.openURL("https://whatsapp.com")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#000080",
    marginVertical: 10,
    fontSize: 16,
    padding: 10,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  contactText: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
  },
  emailText: {
    fontSize: 14,
    color: "#000080",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default ContactUsScreen;
