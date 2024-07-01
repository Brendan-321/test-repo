import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const SafetyScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook

  const safetyTools = [
    {
      icon: "exclamation-circle",
      text: "EMERGENCY SERVICES",
      backgroundColor: "#ff6b6b",
      onPress: () => navigation.navigate("Emergency"), // Add onPress for navigation
    },
    {
      icon: "route",
      text: "SHARE TRIP STATUS",
      backgroundColor: "#4bcffa",
      onPress: () => navigation.navigate("ShareTrip"), // Add onPress for navigation
    },
    {
      icon: "book",
      text: "TAXI EDUCATION",
      backgroundColor: "#4bcffa",
      onPress: () => navigation.navigate("TaxiEducation"),
    },
    {
      icon: "exclamation-triangle",
      text: "REPORT SAFETY ISSUE",
      backgroundColor: "#ff6b6b",
      onPress: () => navigation.navigate("Report"), // Add onPress for navigation
    },
  ];

  const safetyTips = [
    {
      icon: "eye",
      title: "STAY ALERT",
      description:
        "Always keep track of your personal belongings and avoid leaving them unattended. Stay alert and aware of your surroundings.",
    },
    {
      icon: "shield-alt",
      title: "SECURE YOUR VALUABLES",
      description:
        "Keep your valuables secure and be cautious of your surroundings when handling cash or expensive items.",
    },
    {
      icon: "user-shield",
      title: "USE SAFE TRANSPORTATION",
      description:
        "Choose reputable transportation options and avoid getting into unmarked or suspicious vehicles.",
    },
    {
      icon: "shield-virus",
      title: "STAY HEALTHY",
      description:
        "Follow health guidelines and precautions to protect yourself and others from illnesses and infections.",
    },
    {
      icon: "map-marked-alt",
      title: "KNOW YOUR LOCATION",
      description:
        "Be familiar with your surroundings and know where you are at all times to navigate safely.",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Safety Tools</Text>
      <View style={styles.toolsContainer}>
        {safetyTools.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.toolCard, { backgroundColor: item.backgroundColor }]}
            onPress={item.onPress} // Use the onPress handler
          >
            <Icon name={item.icon} size={36} color="#fff" />
            <Text style={styles.toolText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.heading}>Safety Tips</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tipsContainer}
      >
        {safetyTips.map((tip, index) => (
          <View
            key={index}
            style={[
              styles.tipCard,
              index !== safetyTips.length - 1 && { marginRight: 10 },
            ]}
          >
            <Icon name={tip.icon} size={36} color="#ff6b6b" />
            <View style={styles.tipTextContainer}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  toolsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  toolCard: {
    width: Dimensions.get("window").width / 2 - 30,
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  },
  toolText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  tipsContainer: {
    paddingVertical: 10,
  },
  tipCard: {
    width: Dimensions.get("window").width - 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 15,
    height: 130,
  },
  tipTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default SafetyScreen;
