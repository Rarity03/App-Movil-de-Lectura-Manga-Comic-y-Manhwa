import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MenuButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Ionicons name="menu" size={24} color="white" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default MenuButton;
