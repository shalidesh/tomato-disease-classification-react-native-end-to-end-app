import React, { useRef, useEffect } from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation } from '@react-navigation/native';




export default function SplashScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
          navigation.navigate('Home', { animation: 'fade' });
        }, 10000);
    
        return () => clearTimeout(timeout);
      }, []);

  return (
    <View style={styles.container}>
        
        <LottieView
            source={require('../assets/animation_lm944bes.json')}
            autoPlay
            loop
            style={styles.lottie}
            
        />
        
        <Text style={styles.text}>TOMATO</Text>
        <Text style={styles.text1}>DOCTOR</Text>
    </View>
   

    
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#07a1fa'
    },
    lottie: {
      width: 250,
      height: 250,
    },
    text: {
      marginTop: -50,
      fontSize: 50,
      fontWeight: 'bold', // Add your preferred font weight here
      color: '#ffffff',
    },
    text1: {
        marginTop: -15,
        fontSize: 35,
        fontWeight: 'bold', // Add your preferred font weight here
        color: '#ffffff',
      },
  });
