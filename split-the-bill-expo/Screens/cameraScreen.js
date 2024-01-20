import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { View, Image, SafeAreaView, Button } from 'react-native';
import { uploadPhotoToServer } from './fileUpload';
import TransparentCircleButton from './TransparentCircleButton';

const CameraScreen = () => {
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

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    await uploadPhotoToServer(photo);
  };

  if (photo) {
    let done = () => {
      // Allow functionality to send the picture to the server
      // await response
      // then go to another screen
    };

    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image style={{ alignSelf: 'stretch', flex: 1 }} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
        <Button title="Done" onPress={done} />
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

export default CameraScreen;