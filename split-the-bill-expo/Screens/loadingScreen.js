
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  // Disable back navigation when the component is focused

  /*
return (
    <ImageBackground
      source={require('../assets/background.jpg')} // Make sure to provide the correct path to your image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading</Text>
        <ActivityIndicator size="large" color="#ff4500" />
      </View>
    </ImageBackground>
  );
  */
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading</Text>
      <ActivityIndicator size="large" color="#ff4500" />
    </View>
  );
};

const styles = StyleSheet.create({
  /*
backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' depending on your preference
    justifyContent: 'center',
    alignItems: 'center',
  },
  */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoadingScreen;

