import React from 'react';
import { View, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { Text, Chip, Button } from 'react-native-paper';
import { API_URL } from '../util/constants';

const StoryDetails = ({ route }) => {
  const { storie } = route.params;
  const urlImage = `${API_URL.replace(/\/$/, '')}${storie.Image[0].url}`;
  const chapters = storie.Chapters || [];
  console.log(chapters)
  let genres = storie.Genres;
  if (typeof genres === "string") {
    try {
      genres = JSON.parse(genres);
    } catch (e) {
      console.error("Error al parsear Genres:", e);
      genres = [];
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: urlImage }} style={styles.cover} />
      <View style={styles.content}>
        <Text style={styles.title}>{storie.Title}</Text>
        <View style={styles.metadata}>
          <Text style={styles.rating}>⭐ {storie.Rating}/5</Text>
          <Text style={styles.status}>Estado: {storie.Status}</Text>
        </View>
        <View style={styles.metadata}>
          <Text style={styles.user}>Autor: {storie.User.username}</Text>
        </View>
        <View style={styles.genres}>
          {genres.map((genre, index) => (
            <Chip key={index} style={styles.genreChip}>
              {genre}
            </Chip>
          ))}
        </View>
        <Text style={styles.description}>{storie.Description}</Text>
      </View>

      <View style={styles.chapters}>
        <Text style={styles.sectionTitle}>Capítulos</Text>
        {chapters.length === 0 ? (
          <Text>No hay capítulos disponibles.</Text>
        ) : (
          chapters.map((chapter, index) => (
            <Button
              key={index}
              title={`Capítulo ${index + 1}`}
              style={styles.chaptersButton}
              onPress={() => {
                const chapterUrl = `${API_URL.replace(/\/$/, '')}${chapter.url}`;
                Linking.openURL(chapterUrl); 
              }}
            >
              Capitulo {index + 1}
            </Button>
          ))
        )}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  cover: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
  user: {
    fontSize: 16,
    color: '#666',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  genreChip: {
    marginRight: 5,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
  },
  chapters: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chapter: {
    fontSize: 16,
    color: '#6200ee',
    marginBottom: 5,
  },
  chaptersButton: {
    backgroundColor: '#F0E6FF', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    marginVertical: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
  },

  chaptersButtonText: {
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
});

export default StoryDetails;
