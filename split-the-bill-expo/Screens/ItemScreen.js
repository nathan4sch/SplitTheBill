// ItemScreen.js
//The personList itself is not modified. If I attempt to add two people only the most recent is stored.
//need to rerender and update the personList after each modification is made

import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native';
import Item from '../Components/Item';
import Dropdown from '../Components/Dropdown';
import Person from '../Components/Person';
import { CheckBox } from "react-native-btr";



const ItemScreen = ({route, navigation}) => {
  let { itemList, personList } = route.params;
  //console.log("In Item:");
  //console.log(itemList);

  const [inputText, setInputText] = useState('');

  //Dropdown
  const [selectedPerson, setSelected] = useState(null);
  const updateSelected = newData => {
    console.log(personList);
    for (person of personList) {
      if (person.name === newData) {
        newData = person;
      }
    }
    console.log(newData);
    setSelected(newData);
    console.log("Selected Person from ItemScreen:");
    console.log(selectedPerson)
  };

  //console.log(itemList);
  const resultsScreen = () => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'ResultsScreen',
          params: { itemList, personList }
        },
      ],
    });
  }

  const addNewPerson = () => {
    const newPerson = Person.createPerson(inputText);
    console.log(newPerson);
    personList = [...personList, newPerson];
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'ItemScreen',
          params: { itemList, personList }
        },
      ],
    });

    // Call updateData to send the updated personList back to the App component
    //updateData(updatedPersonList);
    setInputText('');
  };

  return (
    
    <View style = {styles.topContainer}>
      <View style={styles.spacer} />  
      <View style={styles.container}>
        <Dropdown personList={personList} selectedPerson={selectedPerson} updateSelected={updateSelected} navigation={navigation} itemList={{itemList}}/>
        <TextInput
          style={styles.textInput}
          placeholder="Enter New Person"
          placeholderTextColor={color = '#888888'}
          textAlign='center'
          
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity onPress={addNewPerson} style={styles.enterButton}>
          <Text>Add</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    
     {selectedPerson && itemList.map((item, index) => (
        <Item key={index} user={item} person={selectedPerson}/>
      ))}



      <View style = {styles.bottomContainer}>

      </View>
      <TouchableOpacity onPress={resultsScreen} style={styles.submitButton}>
        <Text>Submit →</Text>
      </TouchableOpacity>
    </View>
    
  );
}

//<Item name = "Orange" price="3.40"/>

const styles = StyleSheet.create({
  spacer: {
    flex: 0.06, // This will allow the spacer to take up 10% of the topContainer's height
    backgroundColor: 'transparent', // Set to 'transparent' or any color you wish
  },

  topContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'top',
    backgroundColor: 'white',
    borderColor: 'black',
    borderBottomWidth: 2,
  },
  textInput: {
    flex: 70,
    height: 40,
    backgroundColor: '#EEEEEE',
    placeholder: 'white',
    color: 'black',
    borderColor: '#22272e',
    borderWidth: 0,
    borderRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    //borderRadius: 10,
  },
  enterButton: {
    flex: 20,
    backgroundColor: '#EEEEEE',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
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
  submitButton: {
    flex: 20, // same as enterButton
    backgroundColor: '#EEEEEE',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
    height: 40,
    position: 'absolute', // Positioning it absolutely
    right: 0, // Align to the right
    bottom: 50, // Align to the bottom
  },

  bottomContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'right',
    justifyContent: 'bottom',
    backgroundColor: '#ffffff',
  },
});

export default ItemScreen;
