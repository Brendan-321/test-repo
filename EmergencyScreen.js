import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const EmergencyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Are you in an emergency?</Text>
      <Text style={styles.subHeaderText}>Press and hold the button</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.middleCircle}>
            <View style={styles.innerCircle}>
              <Svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                <Path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.36 2.33.56 3.57.56.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.18 21 3 13.82 3 5c0-.55.45-1 1-1H7.5c.55 0 1 .45 1 1 0 1.24.2 2.45.56 3.57.12.35.03.74-.24 1.02l-2.2 2.2z" />
              </Svg>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.locationContainer}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="black">
          <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
        </Svg>
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationHeaderText}>YOUR CURRENT LOCATION</Text>
          <Text style={styles.locationSubText}>15 Bunting Road, Cottesloe</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  outerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#ffcccc",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  middleCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#ff9999",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  innerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#ff6666",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  locationTextContainer: {
    marginLeft: 10,
  },
  locationHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  locationSubText: {
    fontSize: 14,
    color: "#666",
  },
});

export default EmergencyScreen;
