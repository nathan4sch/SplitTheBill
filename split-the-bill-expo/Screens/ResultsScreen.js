import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Button } from 'react-native';
import Person from '../Components/Person';

const ResultsScreen = () => {
    const [data, setData] = useState([
        { name: 'Nathan', Total: 67.30 },
        { name: 'Evan', Total: 45.60 },
        { name: 'Nico', Total: 78.90 },
        { name: 'Pj', Total: 12.30 },
        { name: 'Kevin', Total: 45.60 },
        { name: 'Tyler', Total: 78.90 },
        { name: 'Andrew', Total: 45.60 },
        { name: 'Logan', Total: 78.90 },
        // Add more items as needed
      ]);

      const addNewPerson = () => {
        const newPerson = Person.createPerson(); // Call a method from the Person component to create a new person
        setData((prevData) => [...prevData, newPerson]);
      };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.nameColumn}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
      <View style={styles.totalColumn}>
        <Text style={styles.itemText}>${item.Total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Button title="Add Person" onPress={addNewPerson} />
      <View style={styles.columnTitles}>
        <View style={styles.nameColumn}>
          <Text style={styles.columnTitle}>Name</Text>
        </View>
        <View style={styles.totalColumn}>
          <Text style={styles.columnTitle}>Total</Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  columnTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  columnTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
  },
  nameColumn: {
    flex: 1,
  },
  totalColumn: {
    marginLeft: 16,
    width: screenWidth / 2.5,
    alignItems: 'flex-end',
  },
  itemText: {
    fontSize: 24,
    color: '#333',
  },
});

export default ResultsScreen;
