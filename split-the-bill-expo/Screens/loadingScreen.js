
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import FormData from 'form-data';

import NewItem from '../Components/NewItem';
import ItemScreen from './ItemScreen';


const LoadingScreen = ({ route, navigation }) => {
  //console.log("TESTINGINGINGSINGISNG");
  let { photo, itemList, updateItems, personList } = route.params;
  //console.log(itemList);
  const uploadUrl = 'http://3.16.203.58:3000/api/upload';

  const uploadPhoto = async () => {
    const formData = new FormData();

    formData.append('photo', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.json();
      data.items.forEach(itemData => {
        console.log(itemData.name)
        let newItem = NewItem.createItem(itemData.item, itemData.price);
        itemList = [...itemList, newItem];
      });
  
      // Call updateData to send the updated personList back to the App component
      updateItems(itemList);
      
      //console.log("In loading:");
      //console.log(itemList);

      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'ItemScreen',
            params: { itemList, personList }
          },
        ],
      });
    } catch (error) {
      console.error('Error:', error);
    }

    // Update loading state after completing the upload
  };
  //Immediately invoke the internal asynchronous function
  useEffect(() => {
    uploadPhoto();
  }, []); // Empty dependency array to mimic componentDidMount behavior

  return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading</Text>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22272e',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
});

export default LoadingScreen;
