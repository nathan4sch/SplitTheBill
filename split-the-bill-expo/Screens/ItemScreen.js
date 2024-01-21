// ItemScreen.js

import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native';
import Item from '../Components/Item';
import Dropdown from '../Components/Dropdown';
import Person from '../Components/Person';

function ItemScreen({ route }) {
  const [inputText, setInputText] = useState('');
  //const [data, setData] = useState([]);
  //set the state for selected dropdown item here
  const { personList, updateData } = route.params; 

  let counter = 0;
  const [update, setUpdate] = useState([]);
  useEffect(() => {
    setUpdate(counter);
  }, [counter]);
  


  const addNewPerson = () => {
    const newPerson = Person.createPerson(inputText); // Assuming createPerson returns a new person object
    const updatedPersonList = [...personList, newPerson];
    counter = counter + 1;

    // Call updateData to send the updated personList back to the App component
    updateData(updatedPersonList);

    setInputText('');
  };

  return (
    <View style = {styles.topContainer}>
    <View style={styles.container}>
    <Dropdown personList={personList} />
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
