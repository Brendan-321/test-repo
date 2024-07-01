import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";

const tips = [
  {
    title: "Talk to driver",
    description:
      "Communicate with taxi driver as to where you are headed before getting into the taxi.",
    image: require("./assets/driver.png"), // Add the correct path to your image
  },
  {
    title: "Notes",
    description:
      "Don’t pay with a big note during the early hours of the day as most taxi drivers will not have any change.",
    image: require("./assets/notes.png"), // Add the correct path to your image
  },
  {
    title: "Money",
    description:
      "Ensure that you give the taxi driver their money before giving passengers their change as you will have to cover the balance if the money is short.",
    image: require("./assets/money.png"), // Add the correct path to your image
  },
  {
    title: "Food",
    description:
      "Eat your KFC at home as the smell of KFC can be linked to success and could get you kicked out of the taxi for being successful.",
    image: require("./assets/fast-food.png"), // Add the correct path to your image
  },
  {
    title: "Front seat passenger",
    description:
      "If you happen to sit next to the driver, do not be on your phone (unless you using our app to calculate change) or use earphones as it can be distracting for the driver.",
    image: require("./assets/passenger.png"), // Add the correct path to your image
  },
];

const TaxiEducation = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subHeader}>
        Here are a few helpful tips that you may not know if you’re an avid taxi
        user.
      </Text>
      {tips.map((tip, index) => (
        <View key={index} style={styles.card}>
          <Image source={tip.image} style={styles.image} />
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.description}>{tip.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
});

export default TaxiEducation;
