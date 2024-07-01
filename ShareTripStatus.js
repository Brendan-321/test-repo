import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const ShareTripStatusScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Share Trip Status</Text>
      <Text style={styles.subtitle}>
        On a trip? You can add trusted family and friends to see your live
        location.
      </Text>
      <Image
        source={require("./assets/sharetrip.png")} // Replace with your image path
        style={styles.mainImage}
        resizeMode="contain"
      />
      <Text style={styles.description}>Add from your contacts</Text>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require("./assets/addcontact.png")} // Replace with your image path
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>ADD CONTACT</Text>
      </TouchableOpacity>
      <Text style={styles.description}>Add using an email address</Text>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require("./assets/addemail.png")} // Replace with your image path
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>ADD EMAIL</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
    paddingHorizontal: 20,
  },
  mainImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 20,
    width: "100%",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
});

export default ShareTripStatusScreen;
