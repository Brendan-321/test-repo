import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Ionicons name="person-circle-outline" size={100} color="#28a745" />

        <Text style={styles.profileDetails}>AdminMasimba99@admin.com</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="create-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.boldText}>Name:</Text>
          <Text style={styles.infoText}>Admin</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.boldText}>Surname:</Text>
          <Text style={styles.infoText}>Masimba99</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.boldText}>Cell Number:</Text>
          <Text style={styles.infoText}>+27 64 000 9382</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.boldText}>Password:</Text>
          <Text style={styles.infoText}>************</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.boldText}>Physical Address:</Text>
          <Text style={styles.infoText}>N/A</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  profile: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  profileDetails: {
    fontSize: 16,
    color: "#777",
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 15,
  },
  actionButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 30,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  infoContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#28a745",
  },
});

export default ProfileScreen;
