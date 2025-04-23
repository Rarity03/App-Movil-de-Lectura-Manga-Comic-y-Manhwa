import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Linking, Alert } from 'react-native';
import { Text, Chip, Button, Card } from 'react-native-paper';
import { useAuth2 } from '../hooks/useAuth'
import { deleteStory, myStories } from '../API/stories';
import { FlatList } from 'react-native-gesture-handler';
import { API_URL } from '../util/constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const MyStories = () => {
    const { auth } = useAuth2();
    const userId = auth.idUser;  
    const [stories, setStories] = useState([]);  
    const navigation = useNavigation();

    const fetchStories = async () => {
      try {
        const response = await myStories(userId);
        setStories(response);
      } catch (e) {
        console.error('Error al obtener las historias:', e);
      }
    };
  
    useFocusEffect(
      useCallback(() => {
        fetchStories();
      }, [userId])
    );
    
    const handleEdit = (story) => {
        navigation.navigate('EditStory',{story})
        console.log(`Editar historia con ID: ${stories.id}`);
      };
    
      const handleDelete = (id) => {
        Alert.alert("Historia eliminada") 
        Alert.alert(
          'Confirmar eliminación',
          '¿Estás seguro de que deseas eliminar esta historia?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                onPress: async () => {
                  try {
                    await deleteStory(id); 
                    Alert.alert("Historia eliminada");
                    fetchStories(); 
                  } catch (error) {
                    console.error('Error al eliminar la historia:', error);
                    Alert.alert('Error', 'No se pudo eliminar la historia.');
                  }
              },
            },
          ]
        );
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Mis Historias</Text>
    
          {stories.length === 0 ? (
            <Text>No hay historias para mostrar</Text>
          ) : (
            <FlatList
              data={stories}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <Card.Cover
                    source={{ uri: `${API_URL.replace(/\/$/, '')}${item.Image[0]?.url}` }}
                    style={styles.cover}
                  />
                  <Card.Content>
                    <Text style={styles.cardTitle}>{item.Title}</Text>
                    <Text style={styles.cardDescription} numberOfLines={3}>
                      {item.Description}
                    </Text>
                  </Card.Content>
                  <Card.Actions style={styles.actions}>
                    <Button mode="contained" onPress={() => handleEdit(item)} style={styles.button}>
                      Editar
                    </Button>
                    <Button mode="outlined" onPress={() => handleDelete(item._id)} style={styles.button}>
                      Eliminar
                    </Button>
                  </Card.Actions>
                </Card>
              )}
            />
          )}
        </View>
      );
    };
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 5,
    },
    cover: {
        height: 400,
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDescription: {
        marginTop: 8,
        fontSize: 14,
        color: '#555',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    },
    button: {
        flex: 1,
        marginHorizontal: 4,
    },
});

export default MyStories