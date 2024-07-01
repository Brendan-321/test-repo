import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const ReportSafetyIssueScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Safety Issues</Text>
      <Text style={styles.subtitle}>
        Please give a short description of the safety issue that concerns you.
        We'll try to resolve it as soon as possible.
      </Text>
      <Image
        source={require("./assets/safetyreport.png")} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>DESCRIPTION</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Enter description here"
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: "#666",
    paddingHorizontal: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  textInput: {
    height: 120,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: "#00c389",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ReportSafetyIssueScreen;
