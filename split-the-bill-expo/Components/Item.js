import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from "react-native-btr";
{/*
const Item = {
  createItem: (name,price) => {
    return { 
      name: name || 'New Item', 
      price: price || '0.0', 
    };
  }

};
*/}
const Item = (name, price, count) => {
  
  const [currentPerson, setCurrentPerson] = useState(null);
  const [currentCount, setCurrentCount] = useState(null);

  const toggle = () => {
    
  }
  return (
    <View style={styles.container}>
      {/* Left section with checkbox */}
      
      <View style={styles.checkboxSection}>
        <CheckBox
          onPress={() => toggle()}
        />
      </View>

      {/* Middle section with text */}
      <View style={styles.textSection}>
        <Text>Item Name</Text>
      </View>

      {/* Right section with text */}
      <View style={styles.textSection}>
        <Text>Price</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  checkboxSection: {
    flex: 1,
    alignItems: 'center',
  },
  textSection: {
    flex: 2,
    alignItems: 'center',
  }
});

export default Item;