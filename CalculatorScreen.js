import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const buttonWidth = (width - 40) / 4 - 10; // Calculate button width dynamically

const CalculatorApp = () => {
  const [result, setResult] = useState("");

  const handlePress = (buttonValue) => {
    if (buttonValue === "=") {
      // Prevent eval with empty result to avoid syntax errors
      if (result) {
        setResult(eval(result).toString());
      }
    } else if (buttonValue === "AC") {
      setResult("");
    } else {
      setResult(result + buttonValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {[
          "sin",
          "cos",
          "tan",
          "deg",
          "AC",
          "/",
          "*",
          "-",
          "7",
          "8",
          "9",
          "+",
          "4",
          "5",
          "6",
          "1",
          "2",
          "3",
          "0",
          ".",
          "=",
        ].map((buttonValue) => (
          <TouchableOpacity
            key={buttonValue}
            style={[
              styles.button,
              buttonValue === "=" ? styles.equalsButton : null,
              buttonValue === "AC" ? styles.acButton : null,
            ]}
            onPress={() => handlePress(buttonValue)}
          >
            <Text
              style={[
                styles.buttonText,
                buttonValue === "=" ? styles.equalsButtonText : null,
                buttonValue === "AC" ? styles.acButtonText : null,
              ]}
            >
              {buttonValue}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#E0F7FA",
    padding: 20,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#B2EBF2",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 48,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: buttonWidth,
    height: buttonWidth,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#80DEEA",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 28,
    color: "#000",
  },
  equalsButton: {
    backgroundColor: "#0C7489",
  },
  equalsButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  acButton: {
    backgroundColor: "#B0232A",
  },
  acButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default CalculatorApp;
