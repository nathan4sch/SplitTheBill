import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from "react-native-btr";

const Item = () => {
  const [currentPerson, setCurrentPerson] = useState(null);

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
        <Text>Some text in the middle</Text>
      </View>

      {/* Right section with text */}
      <View style={styles.textSection}>
        <Text>Some other text on the right</Text>
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
    alignItems: 'flex-start',
  },
  textSection: {
    flex: 1,
    alignItems: 'center',
  }
});

export default Item;