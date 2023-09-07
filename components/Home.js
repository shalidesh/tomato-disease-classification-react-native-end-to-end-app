import { StyleSheet, Text, View ,Image} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";

import Camera from "./Camera";
import User from "../assets/user3.jpg"
import Dashboard from "./Dashboard";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function Home() {

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
                  >User Name</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#111"
                    }}
                  >User description</Text>
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
          component={Camera}
        />
        
      </Drawer.Navigator>
  );

  

}

