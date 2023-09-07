import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Camera from "./components/Camera";



const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          ...TransitionPresets.FadeFromBottomAndroid,
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({});
