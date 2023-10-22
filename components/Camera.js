
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


import {
  collection,
  addDoc,
  orderBy,
  serverTimestamp,
  where,
  query,
  onSnapshot
} from 'firebase/firestore';

import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';

import CameraImage from "../assets/camera.png";
import Gallery from "../assets/gallery.png";
import Clear from "../assets/clear.png";


import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


export const {height, width} = Dimensions.get('window');

export const configureUrl = url => {
  let authUrl = url;
  if (url && url[url.length - 1] === '/') {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};

export const fonts = {
  Bold: {fontFamily: 'Impact'},
};

const options = {
  mediaType: 'photo',
  quality: 1,
  width: 256,
  height: 256,
  includeBase64: true,
};

const BACKEND_URL = 'http://192.168.8.196:3000/predict'


export default function CameraPage() {

    const [result, setResult] = useState('');
    const [label, setLabel] = useState('');
    const isDarkMode = useColorScheme() === 'dark';
    const [image, setImage] = useState('');

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState(null);

    const [user, setUser] = useState('');


    useEffect(() => {
      const user = auth.currentUser;
      console.log(user.email);
      if (user) {
          console.log("user exist");
          setUser(user.uid);
        }
    }, []);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#0c1a30' : '#0c1a30',
    };

    const openCamera = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === 'granted') {
          let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
          });
  
          console.log(result);
  
          if (!result.cancelled) {
            const path = result.assets[0].uri;
            getResult(path, result);
          }
      } else {
          console.log('Camera permission not granted');
      }
  };

  const clearOutput = () => {
    setResult('');
    setImage('');
  };

  const addDetection = async (diseaseClass) => {
    try {
      await addDoc(collection(database, 'Detections'), {
        diseaseClass: diseaseClass,
        timestamp: serverTimestamp(),
        userId: user,
      });
      console.log('Detection added!');
    } catch (error) {
      console.error("Error adding detection: ", error);
    }
  };
    
    const getResult = async (path, response) => {
      setImage(path);
      setLabel('Predicting...');
      setResult('');

        // Read the file as a base64 string
      const imageBase64 = await FileSystem.readAsStringAsync(path, { encoding: FileSystem.EncodingType.Base64 });
        
        // Make a POST request to your backend
      fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: imageBase64,
        }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setLabel(data.class);
            setResult(data.confidence);
            setTimeout(() => {
              Alert.alert(
                'Add To The Database',
                'Do you Want to add this record to the Database?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => addDetection(data.class) },
                ],
                { cancelable: false }
              );
            }, 3000);
            
        })
        .catch(error => {
            console.log('Error:', error);
            setLabel('Failed to predicting.');
        });
  
    };


    const openLibrary = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        const path = result.assets[0].uri;
        getResult(path, result);
        
      }
    };


    return (
        <View style={[backgroundStyle,styles.outer]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ImageBackground
          blurRadius={10}
          source={{uri: 'background'}}
          style={{height: height, width: width}}
        />
        <Text style={styles.title}>{'Tomato Disease \nPrediction App'}</Text>
        <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
          <Image source={Clear} style={styles.clearImage} />
        </TouchableOpacity>
        {(image?.length && (
          <Image source={{uri: image}} style={styles.imageStyle} />
        )) ||
          null}
        {(result && label && (
          <View style={styles.mainOuter}>
            <Text style={[styles.space, styles.labelText]}>
              {'Label: \n'}
              <Text style={styles.resultText}>{label}</Text>
            </Text>
            <Text style={[styles.space, styles.labelText]}>
              {'Confidence: \n'}
              <Text style={styles.resultText}>
                {parseFloat(result).toFixed(2) + '%'}
              </Text>
            </Text>
          </View>
        )) ||
          (image && <Text style={styles.emptyText}>{label}</Text>) || (
            <Text style={styles.emptyText}>
              Use below buttons to select a picture of a Tomato plant leaf
            </Text>
          )}
        <View style={styles.btn}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={openCamera}
            style={styles.btnStyle}>
            <Image source={CameraImage} style={styles.imageIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={openLibrary}clearOutput
            style={styles.btnStyle}>
            <Image source={Gallery} style={styles.imageIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );

}
const styles = StyleSheet.create({
    title: {
      alignSelf: 'center',
      position: 'absolute',
      top:  10,
      fontSize: 30,
      color: '#FFF',
    },
    clearImage: {height: 50, width: 50},
    mainOuter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: height / 1.6,
      alignSelf: 'center',
    },
    outer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      position: 'absolute',
      bottom: 40,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    btnStyle: {
      backgroundColor: '#FFF',
      opacity: 0.8,
      marginHorizontal: 30,
      padding: 20,
      borderRadius: 20,
    },
    imageStyle: {
      marginBottom: 50,
      width: width / 1.5,
      height: width / 1.5,
      borderRadius: 20,
      position: 'absolute',
      borderWidth: 0.3,
      borderColor: '#FFF',
      top: height / 4.5,
    },
    clearStyle: {
      position: 'absolute',
      top: 100,
      right: 30,
      tintColor: '#FFF',
      zIndex: 10,
    },
    space: {marginVertical: 0, marginHorizontal: 10},
    labelText: {color: '#FFF', fontSize: 20, },
    resultText: {fontSize: 15, },
    imageIcon: {height: 60, width: 60},
    emptyText: {
      position: 'absolute',
      top: height / 1.6,
      alignSelf: 'center',
      color: '#FFF',
      fontSize: 20,
      maxWidth: '70%',
    },
  });
