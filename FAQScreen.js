import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

const FAQScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.mainText}>ASK US ANYTHING</Text>
        <Text style={styles.subtitle}>
          Have any questions? We're here to assist you.
        </Text>
        <View style={styles.searchContainer}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
            }}
            style={styles.searchIcon}
          />
          <TextInput style={styles.textInput} placeholder="Search here" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 50, // Move the content higher
    backgroundColor: "#fff",
  },
  faqText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
    marginVertical: 10,
  },
  mainText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 30,
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#B0B0B0",
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default FAQScreen;
