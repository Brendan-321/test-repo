import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";

const UserSettingsScreen = () => {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const toggleNotificationsSwitch = () =>
    setNotificationsEnabled((previousState) => !previousState);
  const toggleDarkModeSwitch = () =>
    setDarkModeEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.item}>
          <Icon name="notifications-outline" size={24} color="black" />
          <Text style={styles.itemText}>Notifications</Text>
          <Switch
            onValueChange={toggleNotificationsSwitch}
            value={isNotificationsEnabled}
          />
        </View>
        <View style={styles.item}>
          <Icon name="moon-outline" size={24} color="black" />
          <Text style={styles.itemText}>Dark Mode</Text>
          <Switch
            onValueChange={toggleDarkModeSwitch}
            value={isDarkModeEnabled}
          />
        </View>
        <View style={styles.item}>
          <Icon name="globe-outline" size={24} color="black" />
          <Text style={styles.itemText}>Language</Text>
        </View>
        <Picker
          selectedValue={selectedLanguage}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Select Language" value="" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  backButton: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 5,
  },
});

export default UserSettingsScreen;
