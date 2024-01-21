// ItemScreen.js
//The personList itself is not modified. If I attempt to add two people only the most recent is stored.
//need to rerender and update the personList after each modification is made

import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native';
import Item from '../Components/Item';
import Dropdown from '../Components/Dropdown';
import Person from '../Components/Person';
import { CheckBox } from "react-native-btr";

function ItemScreen({ route }) {

  const [inputText, setInputText] = useState('');

  //Dropdown
  const [selectedPerson, setSelected] = useState();
  const updateSelected = newData => {
    console.log(newData);
    setSelected(newData);
  };
  //Dropdown end

  const { personList, updateData, itemList, updateItems } = route.params; 
  console.log(itemList);

  const addNewPerson = () => {
    const newPerson = Person.createPerson(inputText);
    const updatedPersonList = [...personList, newPerson];

    // Call updateData to send the updated personList back to the App component
    updateData(updatedPersonList);
    setInputText('');
  };

  return (
    <View style = {styles.topContainer}>
    <View style={styles.container}>
      <Dropdown personList={personList} selectedPerson={selectedPerson} updateSelected={updateSelected} />
      <TextInput
        style={styles.textInput}
        placeholder="Enter Name"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <TouchableOpacity onPress={addNewPerson} style={styles.enterButton}>
        <Text>Enter</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    
    {itemList.map((item, index) => (
      <Item key={index} user={item} />
    ))}

    </View>
  );
}

//<Item name = "Orange" price="3.40"/>

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#ffffff',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#ffffff',
  },
  textInput: {
    flex: 70,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  enterButton: {
    flex: 20,
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default ItemScreen;
