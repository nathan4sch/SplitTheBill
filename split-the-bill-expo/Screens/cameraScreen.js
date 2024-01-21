import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import TransparentCircleButton from '../Components/TransparentCircleButton';
import ResultsScreen from './ResultsScreen';
import ItemScreen from "./ItemScreen";
import FormData from 'form-data';
import axios from 'axios';

const CameraScreen = ({route, navigation}) => {
    const { personList } = route.params;
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      const uploadUrl = 'http://18.189.180.149:3000/api/upload';
      const formData = new FormData();

    // Append the image data to FormData
    formData.append('photo', {
      uri: newPhoto.uri,
      type: 'image/jpeg', // Adjust the content type based on your requirements
      name: 'photo.jpg',
    });
      try {
        fetch(uploadUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log('Response:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.error('Error uploading photo:', error);
        // Handle other errors here
      }
      setPhoto(newPhoto);
    //await uploadPhotoToServer(photo);
  };

  if (photo) {
    let done = () => {
      // Allow functionality to send the picture to the server
      // await response
      // then go to another screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoadingScreen' }],
      });
    };

    let results = () => {
      navigation.navigate(ResultsScreen)
    }

    let itemScreen = () => {
      navigation.navigate(ItemScreen)
    }

    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image style={{ alignSelf: 'stretch', flex: 1 }} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
        <Button title="Done" onPress={done} />
        <Button title="Results Test" onPress={results} />
        <Button title="Item Test" onPress={itemScreen} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={{ flex: 1 }} ref={cameraRef}>
      <View style={{ backgroundColor: '#fff', alignSelf: 'flex-end', marginVertical: 20 }}>
        <TransparentCircleButton title="Take Pic" onPress={takePic} />
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      backgroundColor: '#fff',
      alignSelf: 'flex-end',
      marginVertical: 20,
    },
    preview: {
      alignSelf: 'stretch',
      flex: 1
    }
  });

export default CameraScreen;