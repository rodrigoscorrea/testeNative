import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import UserForm from "../components/UserForms";
import api from "../services/api";

export default function UserScreen() {
  const [users, setUsers]: any = useState([]);

  const fetchUsers = async () => {
    try {
      const response: any = await api.get("/user/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const clearView = () => {
    setUsers([])
  }

  return (
    <View style={styles.container}>
      <UserForm />
      <Button title="Show Users" onPress={fetchUsers} />
      <FlatList
        style={styles.listaNomes}
        data={users.data}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <Button title="Clear View" onPress={clearView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  listaNomes: {
    marginTop: 15
  }
});
