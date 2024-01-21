
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

const LoadingScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        // Make a GET request to your server endpoint
        const response = await fetch('http://3.16.203.58:3000/api/upload');
        const data = await response.json();

        // Assuming your data contains a condition to proceed to the next page
        if (data !== null) {
          // Navigate to the next page
          navigation.navigate('ItemScreen');
        } else {
          // Set loading to false if the condition is not met
          navigation.navigate('CameraScreen');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors here, set loading to false or show an error message
        setIsLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [navigation]); // Make sure to include navigation as a dependency if it's used inside the effect

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Text>Data loaded, redirecting...</Text>
        /* Optionally, you can display an error message if loading fails */
      )}
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
