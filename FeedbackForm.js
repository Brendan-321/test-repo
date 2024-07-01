import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {Array(5)
          .fill()
          .map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
              <FontAwesome
                name={i < rating ? "star" : "star-o"}
                size={36}
                color={i < rating ? "#FFA500" : "#ccc"}
              />
            </TouchableOpacity>
          ))}
      </View>
    );
  };

  const handleSubmitFeedback = () => {
    // Implement your logic to submit feedback
    console.log("Submitting feedback:", { rating, feedback });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RATINGS AND REVIEWS</Text>
      <View style={styles.feedbackContainer}>
        <Text style={styles.thankYouText}>Thank you for your feedback!</Text>
        <Text style={styles.subtitle}>Please rate your experience:</Text>
        {renderStars()}
        <Text style={styles.subtitle}>Please provide your feedback:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type your feedback here..."
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitFeedback}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
  },
  feedbackContainer: {
    width: "90%",
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    height: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#00C853",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FeedbackForm;
