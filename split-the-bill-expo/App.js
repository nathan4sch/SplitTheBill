import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import TransparentCircleButton from './TransparentCircleButton'; // Import your custom button component

//import { ImagePicker } from 'expo-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';


export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

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
      //allowsEditing: true,
      //aspect: [1, 1],
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    /*let croppedImage;

    ImageCropPicker.openCropper({
      path: newPhoto.uri,
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then((croppedImage) => {
      setPhoto(croppedImage);
    });
    */
/*
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }).then((result) => {
      if (!result.cancelled) {
        // Crop the image
        ImageCropPicker.openCropper({
          path: result.uri,
          width: 300,
          height: 300,
          cropping: true,
          includeBase64: true,
        }).then((croppedImage) => {
          setPhoto(croppedImage);
        });
      }
    });
    end new */
    setPhoto(newPhoto);
    //setPhoto(croppedImage);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
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
