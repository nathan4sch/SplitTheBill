import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import TransparentCircleButton from '../Components/TransparentCircleButton';
import ResultsScreen from './ResultsScreen';
import ItemScreen from "./ItemScreen";
import FormData from 'form-data';
import axios from 'axios';
import { readFile } from 'react-native-fs';
0
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
      const photoUri = newPhoto.uri;
      try {
        let body = new FormData();
        body.append('photo', {uri: imagePath,name: 'photo.png',filename :'imageName.png',type: 'image/png'});
        body.append('Content-Type', 'image/png');

        fetch(Url,{ method: 'POST',headers:{  
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo",
            } , body :body} )
          .then((res) => checkStatus(res))
          .then((res) => res.json())
          .then((res) => { console.log("response" +JSON.stringify(res)); })
          .catch((e) => console.log(e))
          .done()
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