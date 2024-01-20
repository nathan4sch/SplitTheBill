// ItemScreen.js

import React, { useState } from 'react';
import { StatusBar, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native';
import Item from '../Components/Item';
import Dropdown from '../Components/Dropdown';
import Person from '../Components/Person';

function ItemScreen({ updatePeopleList }) {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);

  const addNewPerson = () => {
    const newPerson = Person.createPerson(inputText); // Pass inputText as the name parameter
    setData((prevData) => [...prevData, newPerson]);
    setInputText('');

    // Call the updatePeopleList function to update the list in ResultsScreen
    updatePeopleList((prevPeopleList) => [...prevPeopleList, newPerson]);
  };

  return (
    <View style = {styles.topContainer}>
    <View style={styles.container}>
      <Dropdown />
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
    <Item/>
    </View>
  );
}

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
});

export default ItemScreen;
