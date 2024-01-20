
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  // Disable back navigation when the component is focused

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
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoadingScreen;
