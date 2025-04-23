import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../util/constants';

const StoryCard = ({storie}) => {
  const url = `${API_URL.replace(/\/$/, '')}${storie.Image[0].url}` 
  const navigation = useNavigation()
  const onReadMore = () => {
    navigation.navigate('StoryDetails', { storie })
  };
  const onFavorite = () => {return null}
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: url }} style={styles.cover} />
      <Card.Content>
        <Text style={styles.title}>{storie.Title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {storie.Description}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text" onPress={onReadMore}>
          Leer más
        </Button>
        <IconButton
          icon="heart-outline"
          color="#6200ee"
          onPress={onFavorite}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    overflow: 'hidden', 
  },
  cover: {
    height: 300, 
    resizeMode: 'cover', 
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default StoryCard;
