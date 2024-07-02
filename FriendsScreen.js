import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FriendsScreen = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: "Adam Erickson" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "John Smith" },
    { id: 4, name: "Ivan Coetzee" },
  ]);

  const removeFriend = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  return (
    <View style={styles.container}>
      {friends.map((friend) => (
        <View key={friend.id} style={styles.friendCard}>
          <Text style={styles.friendName}>{friend.name}</Text>
          <TouchableOpacity onPress={() => removeFriend(friend.id)}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
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
  friendCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  friendName: {
    fontSize: 18,
    color: "#333",
  },
});

export default FriendsScreen;
