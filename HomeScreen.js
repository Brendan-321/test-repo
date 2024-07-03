import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  SafeAreaView,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [showPickupPoints, setShowPickupPoints] = useState(false);
  const [locationAddress, setLocationAddress] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      getCurrentLocation();
    };

    const getCurrentLocation = async () => {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 10,
      });
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });

      // Reverse geocoding
      let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      const formattedAddress = address[0]
        ? `${address[0].street}, ${address[0].city}, ${address[0].region}, ${address[0].country}`
        : 'Location not available';
      setLocationAddress(formattedAddress);

      // Optionally start watching location changes
      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 10,
      }, async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });

        // Reverse geocoding
        let address = await Location.reverseGeocodeAsync({ latitude, longitude });
        const formattedAddress = address[0]
          ? `${address[0].street}, ${address[0].city}, ${address[0].region}, ${address[0].country}`
          : 'Location not available';
        setLocationAddress(formattedAddress);
      });
    };

    requestLocationPermission();
  }, []);

  const navigateToSettings = () => {
    navigation.navigate("Menu");
  };

  const navigateToSafety = () => {
    navigation.navigate("Safety");
  };

  const navigateToLoadCredits = () => {
    navigation.navigate("Load Credits");
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleShowPickupPoints = () => {
    setShowPickupPoints(true);
    closeModal();
    console.log("Current Location:", currentLocation);
    console.log("Destination:", destination);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: -26.191,
          longitude: 28.03,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          currentLocation
            ? {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }
            : undefined
        }
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        <Image
          source={require("./assets/magnifying-glass.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search location or route"
          onFocus={openModal}
        />
      </View>
      <TouchableOpacity style={styles.locationButton}>
        <Image source={require("./assets/location.png")} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={require("./assets/home.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={openModal}>
          <Image
            source={require("./assets/directions.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={navigateToLoadCredits}
        >
          <Image
            source={require("./assets/train.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToSafety}>
          <Image
            source={require("./assets/lightbulb.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToSettings}>
          <Image
            source={require("./assets/hamburger-menu.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Directions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Find a trip</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Current Location</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Your Current Location"
                  value={locationAddress || 'Fetching address...'}
                  onChangeText={setCurrentLocation}
                  clearButtonMode="while-editing"
                  editable={false}
                />
                <Image
                  source={require("./assets/location.png")}
                  style={styles.inputIcon}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Destination</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Your Destination"
                  value={destination}
                  onChangeText={setDestination}
                  clearButtonMode="while-editing"
                />
                <Image
                  source={require("./assets/location.png")}
                  style={styles.inputIcon}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleShowPickupPoints}
            >
              <Text style={styles.buttonText}>Show Pickup Points</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 80,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: "absolute",
    top: 50,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: "#888",
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  locationButton: {
    position: "absolute",
    bottom: 130,
    right: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 30,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#555",
  },
  bottomMenu: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
  },
  menuItem: {
    alignItems: "center",
  },
  menuIcon: {
    width: 28,
    height: 28,
    marginBottom: 4,
    tintColor: "#555",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  inputIcon: {
    width: 24,
    height: 24,
    tintColor: "#999",
  },
  button: {
    width: "100%",
    backgroundColor: "#00A860",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    width: "100%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#00A860",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
