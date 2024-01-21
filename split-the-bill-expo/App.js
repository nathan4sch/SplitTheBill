//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { useState } from 'react';

//Screen
import CameraScreen from "./Screens/CameraScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import ResultsScreen from "./Screens/ResultsScreen";
import ItemScreen from "./Screens/ItemScreen";

// Disable yellow warning messages
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

function App() {
  const [personList, setData] = useState([]);
  const updateData = newData => {
    setData(newData);
  };

  const [itemList, setItems] = useState([]);
  const updateItems = newData => {
    setItems(newData);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
      // This removes the navigation page header
      screenOptions={{
        //headerShown: false
      }}
      >
        <Stack.Screen 
          name="Scan Receipt"
          component={CameraScreen}
          options={{ headerLeft: null }} // Hide back button on CameraScreen
          initialParams={{ personList: personList, itemList: itemList, updateItems: updateItems }}
        />
        <Stack.Screen 
          name="LoadingScreen"
          component={LoadingScreen}
          //initialParams={{ itemList: itemList, updateItems: updateItems }}
        />
        <Stack.Screen 
          name="ResultsScreen"
          component={ResultsScreen}
          initialParams={{ personList: personList, updateData: updateData }}
        />
        <Stack.Screen 
          name="ItemScreen"
          component={ItemScreen}
          options={{ animation: 'none' }}
          //initialParams={{ personList: personList, updateData: updateData, itemList: itemList, updateItems: updateItems }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


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
*/


export default App