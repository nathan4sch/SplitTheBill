import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import TransparentCircleButton from './TransparentCircleButton'; // Import your custom button component
import { uploadPhoto } from './fileUpload';

//Navigation
//import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";


//import ImagePicker from 'react-native-image-crop-picker';

/*
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="camera"
          component={cameraScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/


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
        const response = await fetch('http://127.0.0.1:3000/upload', {
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
    flex: 1
  }
});

export default App