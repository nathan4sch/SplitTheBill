
// import React from 'react';
// import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

// const LoadingScreen = ({ navigation }) => {
//   // Disable back navigation when the component is focused

//   /*
// return (
//     <ImageBackground
//       source={require('../assets/background.jpg')} // Make sure to provide the correct path to your image
//       style={styles.backgroundImage}
//     >
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Loading</Text>
//         <ActivityIndicator size="large" color="#ff4500" />
//       </View>
//     </ImageBackground>
//   );
//   */
//   return (
//     <View style={styles.container}>
//       <Text style={styles.loadingText}>Loading</Text>
//       <ActivityIndicator size="large" color="#ffffff" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   /*
// backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover', // or 'stretch' depending on your preference
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   */
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#4c5057',
//   },
//   loadingText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#ffffff',
//   },
// });

// export default LoadingScreen;

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import FormData from 'form-data';

import NewItem from '../Components/NewItem';
import ItemScreen from './ItemScreen';


const LoadingScreen = ({ route, navigation }) => {
  //console.log("TESTINGINGINGSINGISNG");
  let { photo, itemList, updateItems } = route.params;
  //console.log(itemList);
  const [isLoading, setIsLoading] = useState(true);
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
      console.log(data);
      data.items.forEach(itemData => {
        let newItem = NewItem.createItem(itemData.item, itemData.price);
        itemList = [...itemList, newItem];
      });
  
      // Call updateData to send the updated personList back to the App component
      updateItems(itemList);

      navigation.navigate(ItemScreen);
    } catch (error) {
      console.error('Error:', error);
    }

    // Update loading state after completing the upload
    setIsLoading(false);
  };
  //Immediately invoke the internal asynchronous function
  useEffect(() => {
    uploadPhoto();
  }, []); // Empty dependency array to mimic componentDidMount behavior

  return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading</Text>
        <ActivityIndicator size="large" color="#ff4500" />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c5057',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
});

export default LoadingScreen;
