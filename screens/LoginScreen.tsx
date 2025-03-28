import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "335591001896-h6g84fnppje3g36mucbuf5ehqq4d26fg.apps.googleusercontent.com",
    webClientId: "335591001896-citt1llo4974v224n4nkovmea5a2btb2.apps.googleusercontent.com",
    /* redirectUri: makeRedirectUri({
      scheme: 'testapp'
    }), */
    scopes: ['profile', 'email']
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication?.accessToken);
    }
  }, [response]);

  async function fetchUserInfo(token:any) {
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <Button title="Sign in with Google" disabled={!request} onPress={() => promptAsync()} />
      {userInfo && <Text>Welcome, {userInfo.name}</Text>}
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
