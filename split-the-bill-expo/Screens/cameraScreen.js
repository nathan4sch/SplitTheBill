import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, View, SafeAreaView, Button, Image } from 'react-native';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import TransparentCircleButton from 'split-the-bill-expo/TransparentCircleButton.js';
import { uploadPhoto } from './fileUpload';

function CameraScreen() {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
  
    const [loading, setLoading] = useState()
  
    
    useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      })();
    }, []);
  
    if (hasCameraPermission === undefined) {
      return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
      return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }
  
    let takePic = async () => {
      let options = {
        quality: 1,
        base64: true,
        exif: false,
      };
    
      try {
        // Take a picture and get the result asynchronously
        const newPhoto = await cameraRef.current.takePictureAsync(options);
        const photoUri = newPhoto.uri;
        try {
          // Convert the local file URI to a blob
          const photoBlob = await fetch(photoUri).then((response) => response.blob());
      
          // Create FormData object to append the blob data
          const formData = new FormData();
          formData.append('photo', photoBlob, 'photo.jpg');
      
          // Make a POST request to your backend
          const response = await fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.error('Error uploading photo:', error);
          // Handle other errors here
        }
        setPhoto(newPhoto);
      } catch (error) {
        console.error('Error taking or uploading photo:', error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    };
  
    if (photo) {
      console.log('here1')
      
      let done = () => {
        //Allow functionality to send the picture to the server
        //await response
        //then go to another screen
      };
  
      //<Button title="Share" onPress={sharePic} />
      //    {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
  
      return (
        <SafeAreaView style={styles.container}>
          <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
          <Button title="Discard" onPress={() => setPhoto(undefined)} />
          <Button title="Done" onPress={done} />
        </SafeAreaView>
      );
    }
  
    return (
      <Camera style={styles.container} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TransparentCircleButton title="Take Pic" onPress={takePic} />
        </View>
        <StatusBar style="auto" />
      </Camera>
    );
}

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
    flex: 1,
  },
});

export default CameraScreen;