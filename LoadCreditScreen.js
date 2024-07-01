import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const LoadCreditsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>LOAD CREDITS</Text>
      <Text style={styles.subtitle}>
        Choose a service to load your credits to.
      </Text>

      <TouchableOpacity style={styles.card}>
        <Image
          source={require("./assets/Rea_Vaya_logo.svg.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={require("./assets/Gautrain.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: "100%",
  },
});

export default LoadCreditsScreen;
