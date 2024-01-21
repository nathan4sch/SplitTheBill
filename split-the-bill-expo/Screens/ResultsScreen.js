import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

const ResultsScreen = ({ route }) => {
  const { itemList, personList } = route.params;
   
  
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
       <View style={styles.spacer} />  
      <Text style={styles.title}>Results</Text>
      <View style={styles.columnTitles}>
        <View style={styles.nameColumn}>
          <Text style={styles.columnTitle}>Name</Text>
        </View>
        <View style={styles.totalColumn}>
          <Text style={styles.columnTitle}>Total</Text>
        </View>
      </View>
      <FlatList
        data={personList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  
  spacer: {
    flex: 0.07, // This will allow the spacer to take up 10% of the topContainer's height
    backgroundColor: 'transparent', // Set to 'transparent' or any color you wish
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: 'black',
    
  },
  columnTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  columnTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 16,
    color: 'black',
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
    color: 'black',
  },
});

export default ResultsScreen;
