// MenuScreen.js

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const MenuScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const menuItems1 = [
    { icon: "code", text: "AI Calculator (beta)" },
    { icon: "calculator", text: "Calculator", screen: "Calculator" }, // Add screen property
    { icon: "user-friends", text: "Manage friends", screen: "Friends" },
    { icon: "cog", text: "Settings", screen: "Settings" },
  ];

  const menuItems2 = [
    { icon: "question-circle", text: "Help And Support", screen: "FAQ" },
    { icon: "info-circle", text: "About Us" },
    { icon: "comment-dots", text: "Feedback", screen: "Feedback" },
    { icon: "envelope", text: "Contact Us", screen: "ContactUs" },
    { icon: "file-alt", text: "Privacy Policy" },
    { icon: "file-signature", text: "Terms Of Service" },
  ];

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToProfile}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={require("./assets/software-engineer.png")} // Replace with real image URL
          />

          <View>
            <Text style={styles.profileName}>Admin Masimba</Text>
            <Text style={styles.profileInfo}>+27 64 000 9382</Text>
            <Text style={styles.profileInfo}>AdminMasimba99@admin.com</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.menuContainer}>
        {menuItems1.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => item.screen && navigation.navigate(item.screen)} // Navigate to the specified screen
          >
            <Icon name={item.icon} size={20} color="#000" />
            <Text style={styles.menuItemText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.menuContainer}>
        {menuItems2.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => item.screen && navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={20} color="#000" />
            <Text style={styles.menuItemText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        <Icon name="sign-out-alt" size={20} color="#000" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f8f9fa",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileInfo: {
    color: "#777",
  },
  menuContainer: {
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#007bff",
  },
});

export default MenuScreen;
