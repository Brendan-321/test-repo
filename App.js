import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import SafetyScreen from "./SafetyScreen";
import LoadCreditsScreen from "./LoadCreditScreen";
import RegisterScreen from "./RegisterPage";
import CalculatorApp from "./CalculatorScreen"; // Import the CalculatorApp
import ProfileScreen from "./ProfileScreen";
import FriendsScreen from "./FriendsScreen";
import MenuScreen from "./MenuScreen";
import UserSettingsScreen from "./UserSettings";
import FAQScreen from "./FAQScreen";
import Feedback from "./Feedback";
import FeedbackForm from "./FeedbackForm";
import ContactUsScreen from "./ContactUs";
import EmergencyScreen from "./EmergencyScreen";
import ShareTripStatusScreen from "./ShareTripStatus";
import ReportSafetyIssueScreen from "./ReportSafetyIssueScreen";
import TaxiEducation from "./TaxiEducation";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headershown: false }}
        />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Safety" component={SafetyScreen} />
        <Stack.Screen name="Load Credits" component={LoadCreditsScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Calculator" component={CalculatorApp} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Settings" component={UserSettingsScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="FeedbackForm" component={FeedbackForm} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="Emergency" component={EmergencyScreen} />
        <Stack.Screen name="ShareTrip" component={ShareTripStatusScreen} />
        <Stack.Screen name="Report" component={ReportSafetyIssueScreen} />
        <Stack.Screen name="TaxiEducation" component={TaxiEducation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
