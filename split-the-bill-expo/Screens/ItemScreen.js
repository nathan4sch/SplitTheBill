import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Item from '../Components/Item';
import Dropdown from '../Components/Dropdown';

function ItemScreen() {
  return (
    <View style={styles.container}>
      <Dropdown />
      <Text>Open up App.js to start working on your app!</Text>
      <Item />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemScreen;