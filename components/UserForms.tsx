import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from "../services/api";

export default function UserForm() {
  const [name, setName] = useState("");

  const submitUser = async () => {
    if (!name) {
      Alert.alert("Error", "Name cannot be empty!");
      return;
    }
    try {
      await api.post("/user/", { name });
      Alert.alert("Success", "User registered!");
      setName("");
    } catch (error) {
      Alert.alert("Error", "Failed to register user.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Submit" onPress={submitUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
