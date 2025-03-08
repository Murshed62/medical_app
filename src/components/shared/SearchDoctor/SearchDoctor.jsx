import React from 'react';
import {View, TextInput, StyleSheet, Platform, Image} from 'react-native';
import searchIcon from '../../../assets/search.png';

const SearchDoctor = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={searchIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search doctor by name"
          placeholderTextColor="#666"
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 5,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    marginHorizontal: 70,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderColor: '#000', // Border color black
    borderWidth: 1, // Border width
    borderRadius: 25, // Rounded corners
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SearchDoctor;
