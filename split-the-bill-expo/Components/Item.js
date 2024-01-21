import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from "react-native-btr";
{/*
const Item = {
  createItem: (name,price) => {
    return { 
      name: name || 'New Item', 
      price: price || '0.0', 
      count: '0'
    };
  }

};
*/}

function Item(props) {
  const [count, setCount] = useState(0);
  const item = props.user;
  
  //console.log(item);

  function toggle(event) {
    //check state of check button and update count
    setCount((prevCount) => (prevCount === 0 ? 1 : 0));
    console.log(count);
  }

  return (
    <View style={styles.container}>
      {/* Left section with checkbox */}
      
      <View style={styles.checkboxSection}>
        <CheckBox
          value={count === 1}
          onValueChange={toggle}
        />
      </View>

      {/* Middle section with text */}
      <View style={styles.textSection}>
        <Text>{item.name}</Text>
      </View>
      {/* Right section with text*/ }
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
    flex: 1,
    alignItems: 'center',
  },
  textSection: {
    flex: 2,
    alignItems: 'center',
  }
});

export default Item;