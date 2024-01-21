import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = ({ personList, selectedPerson, updateSelected, navigation, itemList }) => {
  const [selectedValue, setSelectedValue] = useState(selectedPerson);

  // useEffect(() => {
  //   // Update the selected value when the prop changes
  //   setSelectedValue(selectedPerson);
  // }, [selectedPerson]);
  

  const options = personList.map((person) => ({
    label: person.name,
    value: person.name,
  }));

  const handleValueChange = (value) => {
    setSelectedValue(value);
    updateSelected(value); // Notify parent component about the change
    console.log("Selected Person from Dropdown:");
    console.log(selectedValue)
    
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        items={options}
        onValueChange={handleValueChange}
        style={{
          inputAndroid: styles.selectButton,
          inputIOS: styles.selectButton,
          placeholder: {
            color: 'black',
          },
        }}
        value={selectedValue}
        placeholder={{ label: 'Select Person', value: null }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: "#EEEEEE",
    color: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  selectedValue: {
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
  },
});

export default Dropdown;
