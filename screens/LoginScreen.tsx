import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:"335591001896-citt1llo4974v224n4nkovmea5a2btb2.apps.googleusercontent.com",
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: true,
});


export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState<any>(null);

  /* const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "335591001896-citt1llo4974v224n4nkovmea5a2btb2.apps.googleusercontent.com", // Replace with your Google Web Client ID
    androidClientId: "335591001896-h6g84fnppje3g36mucbuf5ehqq4d26fg.apps.googleusercontent.com",
    scopes: ['profile', 'email']
}); */


  const signIn = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
    } catch (err) {
      console.log(err)
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}></GoogleSigninButton>
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
