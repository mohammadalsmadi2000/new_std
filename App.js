import LessonsAttContextProvider, { lessonsContext } from './Store/lessonsContext'
import { useContext, useEffect, useState } from 'react';

import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodeScreen from './Screens/CodeScreen';
import { Colors } from './constant/Colors';
import DetailScreen from './Screens/DetailScreen';
import IconButton from './components/Ui/IconButton';
import LessonsScreen from './Screens/LessonsScreen';
import LoginScreen from './Screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native'
import QRCodeScreen from './Screens/QRCodeScreen';
import SignupScreen from './Screens/SignupScreen'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'

const Stack =createNativeStackNavigator();

//firebase.initializeApp(firebaseConfig);

function AuthenticatedStack() {
  
  return (
    <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            //drawerActiveBackgroundColor: "#FAE4CD",
            headerTintColor: "white",
            headerStyle: { backgroundColor: Colors.primary800 },
            contentStyle: { backgroundColor: "#fff" },
          }}
          initialRouteName="LogIn"
        >
          <Stack.Screen
            //options={{ headerShown: false }}
            name="Detail"
            component={DetailScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Lessons"
            component={LessonsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={SignupScreen}
          />
          <Stack.Screen
            //options={{ headerShown: false }}
            name="Qr"
            component={QRCodeScreen}
          />
          <Stack.Screen
            //options={{ headerShown: false }}
            name="Code"
            component={CodeScreen}
          />
        
          <Stack.Screen
            options={{ headerShown: false }}
            name="LogIn"
            component={LoginScreen}
          />
        </Stack.Navigator>
  );
}

function StackSign(){
  const nav=useNavigation();
  const authCtx=useContext(lessonsContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        //drawerActiveBackgroundColor: "#FAE4CD",
        headerTintColor: "white",
        headerStyle: { backgroundColor: Colors.primary800 },
        contentStyle: { backgroundColor: "#fff" },
      }}
      initialRouteName="Lessons"
    >
      <Stack.Screen
        //options={{ headerShown: false }}
        name="Detail"
        component={DetailScreen}
      />
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton
              icon={"exit"}
              color="#fff"
              size={24}
              onPress={() => {
                authCtx.logOut();
                nav.navigate('LogIn')
              }}
            />
          ),
        }}
        name="Lessons"
        component={LessonsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={SignupScreen}
      />
      <Stack.Screen
        //options={{ headerShown: false }}
        name="Qr"
        component={QRCodeScreen}
      />
      <Stack.Screen
        //options={{ headerShown: false }}
        name="Code"
        component={CodeScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="LogIn"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );}
function Navigation() {
  const authCtx=useContext(lessonsContext)
  return (
    
      <NavigationContainer>
       { !authCtx.isAuthenticated&& <AuthenticatedStack />}
       { authCtx.isAuthenticated&& <StackSign />}
      </NavigationContainer>
    
  );
}

function Root(){
  const [trying, setTrying] = useState(true);
  const authCtx = useContext(lessonsContext);

  useEffect(() => {
    async function get() {
      const valueToken = await AsyncStorage.getItem("token");
      const valueName = await AsyncStorage.getItem("name");
      const valueID = await AsyncStorage.getItem("id");

      if (valueToken) {
        authCtx.authenticate(valueToken);
        valueName ? authCtx.addStudentName(valueName) : null;
        valueID ? authCtx.addID(valueID) : null;
      }

      setTrying(false);
    }

    get();
  }, []);

  if (trying) {
    <AppLoading />;
  }
  return <Navigation />;
}

export default function App() {
  
  
  return (
    <>
      <StatusBar style="dark" />
        <LessonsAttContextProvider>
        <Root/>
        </LessonsAttContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
