
import React, {useState,useEffect} from 'react';
import { Alert } from 'react-native';
import {
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
  ImageBackground, 
} from 'react-native';


import { auth, database } from '../config/firebase';

export default function Settings() {


    const [user, setUser] = useState('');


    useEffect(() => {
      const user = auth.currentUser;
      console.log(user.email);
      if (user) {
          console.log("user exist in setting page");
          setUser(user.uid);
        }
    }, []);

    return (
        <View>
            <Text>Settings Page</Text>
        
      </View>
    );

}
