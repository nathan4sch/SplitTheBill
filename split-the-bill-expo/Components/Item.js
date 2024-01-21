import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Item(props) {
  const item = props.user;

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const buttonColor = isPressed ? 'green' : 'white';
  const borderColor = 'black';

  return (
    <View style={styles.container}>
      {/* Left section with checkbox */}
      <View style={styles.checkboxSection}>
        <TouchableOpacity
          style={[styles.circularButton, { backgroundColor: buttonColor, borderColor: borderColor }]}
          onPress={handlePress}
        />
      </View>

      {/* Middle section with text */}
      <View style={styles.textSection}>
        <Text>{item.name}</Text>
      </View>

      {/* Right section with text*/}
      <View style={styles.textSection}>
        <Text>{item.price}</Text>
      </View>
      <View style={styles.textSection}>
        <Text>{item.count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  checkboxSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularButton: {
    width: 30,  // Adjusted width to make it smaller
    height: 30, // Adjusted height to make it smaller
    borderRadius: 15,
    borderWidth: 2,
  },
  textSection: {
    flex: 2,
    alignItems: 'center',
  }
});

export default Item;
