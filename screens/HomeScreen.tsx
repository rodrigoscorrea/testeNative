import React from "react";
import { View, Text, Button, StyleSheet, } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for the navigation stack
type RootStackParamList = {
  Home: undefined;
  UserPage: undefined;
  LoginPage: undefined;
};

// Define the type for the navigation prop
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Test App</Text>
      <Button title="Go to User Page" onPress={() => navigation.navigate("UserPage")} />
      <Button title="Go to Login Page" onPress={() => navigation.navigate("LoginPage")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
