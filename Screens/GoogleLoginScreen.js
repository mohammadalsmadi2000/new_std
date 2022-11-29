import * as Google from 'expo-auth-session/providers/google';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as WebBrowser from 'expo-web-browser';

import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React,{useState} from 'react';

import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase'

//import firebase from 'firebase/app'

WebBrowser.maybeCompleteAuthSession();
var provider = new firebase.auth.GoogleAuthProvider();
export default function GoogleLoginScreen() {

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();


  const [request, response,promptAsync] = Google.useAuthRequest({
    androidClientId: "295628418055-eihsku8tjjq2b1vsqgu1lpq4nmp3q5ul.apps.googleusercontent.com",
    iosClientId: "295628418055-9t5fsoak2rnu6egslblbt9qug05b9pj3.apps.googleusercontent.com",
    expoClientId: "295628418055-i6899eac3em01mt5o39gcldb5g7uj5d4.apps.googleusercontent.com",
   
  });

  React.useEffect(() => {
    initAsync();
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      console.log("rrrrr"+response.authentication.accessToken.length)
      onSignIn(response.authentication.accessToken)
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });


    //console.log(firebase.auth().getRedirectResult())
    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function show(){
    promptAsync({useProxy: true, showInRecents: true})
  }

  function showUserInfo() {
    console.log(request)
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button 
        title={accessToken ? "Get User Data" : "Login"}
        onPress={accessToken ? getUserData : () => { promptAsync({useProxy: true, showInRecents: true}) }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});