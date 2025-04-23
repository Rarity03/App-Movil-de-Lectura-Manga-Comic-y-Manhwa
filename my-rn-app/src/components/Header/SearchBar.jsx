import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const SearchBar = ({ onSearch }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Buscar historias..."
      onChangeText={onSearch}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
});

export default SearchBar;
