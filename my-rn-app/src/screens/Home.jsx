import React, { useCallback, useEffect, useState } from 'react';
import {FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Header from '../components/Header/Header';
import StoryCard from '../components/StoryCard/StoryCard';
import { fetchStories } from '../API/stories';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ logout}) => {
  
  const [mangas, setMangas] = useState([]);
  const [manwhas, setManwhas] = useState([]);
  const [comics, setComics] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchStoriesData = async () => {
        try {
          const response = await fetchStories();
          setMangas(response.filter(item => item.Category === 'manga'));
          setManwhas(response.filter(item => item.Category === 'manwha'));
          setComics(response.filter(item => item.Category === 'comic'));
        } catch (error) {
          console.error('Error fetching stories:', error);
        }
      };

      fetchStoriesData();
    }, []) 
  );

  const renderCarousel = (title, data) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.item}>
            <StoryCard storie={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('CategoryDetails', { title })}
              style={styles.loadMoreButton}
              labelStyle={styles.buttonLabel}
            >
              +
            </Button>
          </View>
        }
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Header logout={logout} />
      {renderCarousel('Mangas', mangas)}
      {renderCarousel('Manwhas', manwhas)}
      {renderCarousel('Comics', comics)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  item: {
    marginHorizontal: 10, 
    alignItems: 'center',
    width: 250,
    height: 500,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 175,
    marginBottom:  175,
    width: 150,
  },
  loadMoreButton: {
    width: 60,  
    height: 60, 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonLabel: {
    paddingTop: 15,
    fontSize: 30, 
  },
});

export default Home;

