import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import TransparentCircleButton from './TransparentCircleButton'; // Import your custom button component
import { uploadPhotoToServer } from './fileUpload';

//Navigation
import { NavigationContainer } from '@react-navigation/native';

//Screen
import CameraScreen from "./Screens/cameraScreen.js";

//import ImagePicker from 'react-native-image-crop-picker';


const App = () => {
  return (
    <NavigationContainer>
      <CameraScreen />
    </NavigationContainer>
  );
};

/*
function App() {
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

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    
    setPhoto(newPhoto);
    await uploadPhotoToServer(photo);
    
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
    flex: 1
  }
});
*/

export default App