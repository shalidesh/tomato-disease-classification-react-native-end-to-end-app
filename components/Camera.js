
import React, {useState} from 'react';
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

import CameraImage from "../assets/camera.png";
import Gallery from "../assets/gallery.png";
import Clear from "../assets/clear.png";

import axios from 'axios';
import Config from 'react-native-config';
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


export default function Camera() {

    const [result, setResult] = useState('');
    const [label, setLabel] = useState('');
    const isDarkMode = useColorScheme() === 'dark';
    const [image, setImage] = useState('');
    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#0c1a30' : '#0c1a30',
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
        <TouchableOpacity onPress={console.log("called")} style={styles.clearStyle}>
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
            onPress={() =>manageCamera('Photo')}
            style={styles.btnStyle}>
            <Image source={CameraImage} style={styles.imageIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => manageCamera('Photo')}clearOutput
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
    space: {marginVertical: 10, marginHorizontal: 10},
    labelText: {color: '#FFF', fontSize: 20, },
    resultText: {fontSize: 32, },
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
