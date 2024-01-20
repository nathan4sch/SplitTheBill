import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const options = [
    { label: 'John', value: 'John' },
    { label: 'Jane', value: 'Jane' },
    { label: 'Doe', value: 'Doe' },
    { label: 'Smith', value: 'Smith' },
  ]; // Replace with your option list

  return (
    <View style={styles.container}>
      <RNPickerSelect
        items={options}
        onValueChange={(value) => setSelectedValue(value)}
        style={{
          inputAndroid: styles.selectButton,
          inputIOS: styles.selectButton,
          placeholder: {
            color: 'black',
          },
        }}
        value={selectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  selectedValue: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Dropdown;
