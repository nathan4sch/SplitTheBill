import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import TransparentCircleButton from '../Components/TransparentCircleButton';
import ResultsScreen from './ResultsScreen';
import ItemScreen from "./ItemScreen";
import LoadingScreen from './LoadingScreen';

import jsonData from '../example.json';

import NewItem from '../Components/NewItem';


const CameraScreen = ({route, navigation}) => {
  let { personList, itemList, updateItems } = route.params;
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
      setPhoto(newPhoto);
    //await uploadPhotoToServer(photo);
  };

  if (photo) {
    let JSONtest = () => {
      jsonData.items.forEach(itemData => {
        let newItem = NewItem.createItem(itemData.item, itemData.price);
        itemList = [...itemList, newItem];
      });
  
      // Call updateData to send the updated personList back to the App component
      updateItems(itemList);
      itemScreen();
    }
    let done = () => {
      // Allow functionality to send the picture to the server
      // await response
      // then go to another screen
    

    //let newItem = NewItem.createItem("Name", "price");
    //let updatedItemList = [...itemList, newItem];
    //itemList = updatedItemList;

    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'LoadingScreen',
          params: { photo },
        },
      ],
    });
    //AFTER LOADING

    
      //navigation.reset({
      //  index: 1,
      //  routes: [{ name: 'LoadingScreen' }],
      //});
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
        <Button title="JSON Test" onPress={JSONtest} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={{ flex: 1 }} ref={cameraRef}  zoom={0.0}>
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