import { StyleSheet, Text, View ,Image,Alert} from "react-native";
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";

import CameraPage from "./Camera";
import User from "../assets/user3.jpg"
import Dashboard from "./Dashboard";

import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function Home() {

  const [user, setUser] = useState("");


  useEffect(() => {

    const user = auth.currentUser;
    setUser(user);
    console.log(user.uid);      // prints the user's unique ID
    console.log(user.email);    // prints the user's email address


}, []);

  // Function to be called when the user clicks 'Logout'
  function handleLogout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => {
            signOut(auth).catch(error => console.log('Error logging out: ', error));
          }
        }
      ]
    );
  }

  // Dummy screen component
  function LogoutScreen() {
    return <View />;
  }


  return (
    <Drawer.Navigator
        drawerContent={
          (props) => {
            return (
              <>
                <View
                  style={{
                    height: 200,
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomColor: "#f4f4f4",
                    borderBottomWidth: 1
                  }}
                >
                  <Image
                    source={User}
                    style={{
                      height: 130,
                      width: 130,
                      borderRadius: 65
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 22,
                      marginVertical: 6,
                      fontWeight: "bold",
                      color: "#111"
                    }}
                  >{user.email}</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#111"
                    }}
                  >{user.uid}</Text>
                </View>
                <DrawerItemList {...props} />
              </>
            )
          }
        }
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250
          },
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          drawerLabelStyle: {
            color: "#111"
          }
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            )
          }}
          component={Dashboard}
        />
        <Drawer.Screen
          name="Camera"
          options={{
            drawerLabel: "Camera",
            title: "Camera",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            )
          }}
          component={CameraPage}
        />

      <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            drawerLabel: "Logout",
            title: "Logout",
            drawerIcon: () => (
              <SimpleLineIcons name="logout" size={20} color="#808080" />
            )
          }}
          listeners={{
            focus: handleLogout,
          }}
        />
       
        
      </Drawer.Navigator>
  );

}

