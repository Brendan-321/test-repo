import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const reviews = [
  {
    id: "1",
    name: "Thabo",
    rating: 5,
    time: "2 mins ago",
    text: "Very good very nice.",
  },
  {
    id: "2",
    name: "Phillip",
    rating: 4,
    time: "7 hours ago",
    text: "Good.",
  },
  {
    id: "3",
    name: "Rajesh",
    rating: 3,
    time: "1 day ago",
    text: "I had an average experience using the app.",
  },
];

const RatingBar = ({ rating, count }) => (
  <View style={styles.ratingBar}>
    <Text style={styles.ratingText}>
      {rating} <FontAwesome name="star" size={15} color="#FFA500" />
    </Text>
    <View style={styles.bar}>
      <View style={[styles.fill, { width: `${count}%` }]} />
    </View>
  </View>
);

const ReviewItem = ({ review }) => (
  <View style={styles.reviewItem}>
    <View style={styles.reviewHeader}>
      <Ionicons name="person-circle" size={40} color="black" />
      <View style={styles.reviewInfo}>
        <Text style={styles.reviewName}>{review.name}</Text>
        <View style={styles.reviewRating}>
          {[...Array(review.rating)].map((_, i) => (
            <FontAwesome key={i} name="star" size={15} color="#FFA500" />
          ))}
          {[...Array(5 - review.rating)].map((_, i) => (
            <FontAwesome key={i} name="star-o" size={15} color="gray" />
          ))}
          <Text style={styles.reviewTime}>{review.time}</Text>
        </View>
      </View>
      <Ionicons name="ellipsis-vertical" size={24} color="black" />
    </View>
    <Text>{review.text}</Text>
  </View>
);

const Feedback = () => {
  const navigation = useNavigation();

  const handleWriteReview = () => {
    navigation.navigate("FeedbackForm"); // Navigate to FeedbackForm screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RATINGS AND REVIEWS</Text>
      <View style={styles.ratingSummary}>
        <View>
          <RatingBar rating={5} count={80} />
          <RatingBar rating={4} count={60} />
          <RatingBar rating={3} count={40} />
          <RatingBar rating={2} count={20} />
          <RatingBar rating={1} count={10} />
        </View>
        <View style={styles.ratingOverall}>
          <Text style={styles.ratingScore}>4.0</Text>
          <View style={styles.ratingStars}>
            {[...Array(4)].map((_, i) => (
              <FontAwesome key={i} name="star" size={25} color="#FFA500" />
            ))}
            <FontAwesome name="star-half-full" size={25} color="#FFA500" />
          </View>
          <Text style={styles.totalReviews}>52 Reviews</Text>
        </View>
      </View>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity
        style={styles.writeReviewButton}
        onPress={handleWriteReview}
      >
        <Text style={styles.writeReviewText}>Write Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
  },
  ratingSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  ratingText: {
    width: 30,
    textAlign: "right",
    color: "#333",
    fontWeight: "bold",
  },
  bar: {
    height: 6,
    width: 100,
    backgroundColor: "#ddd",
    borderRadius: 3,
    marginLeft: 8,
  },
  fill: {
    height: 6,
    backgroundColor: "#4CAF50",
    borderRadius: 3,
  },
  ratingOverall: {
    alignItems: "center",
  },
  ratingScore: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  ratingStars: {
    flexDirection: "row",
    marginVertical: 8,
  },
  totalReviews: {
    fontSize: 16,
    color: "#555",
  },
  reviewItem: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewInfo: {
    flex: 1,
    marginHorizontal: 8,
  },
  reviewName: {
    fontWeight: "bold",
    color: "#333",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewTime: {
    marginLeft: 8,
    color: "gray",
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  writeReviewButton: {
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  writeReviewText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Feedback;
