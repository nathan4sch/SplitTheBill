import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = ({personList}) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const options = personList.map((person) => ({
    label: person.name,
    value: person.name,
  }));

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
