import React, { useState } from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert,FlatList,} from 'react-native';
import {TextInput, Button, Text, Chip, Checkbox, List,} from 'react-native-paper';
import { genresList } from '../util/genresList';
import { categories } from '../util/categories'
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth2 } from '../hooks/useAuth'
import { API_URL } from '../util/constants';
import { updateStory } from '../API/stories';

const EditStory = ({route}) => {
  const { story } = route.params;
  const { auth } = useAuth2();
  const userId = auth.idUser;

  const coverUrl = story?.Image?.[0]?.url
    ? `${API_URL.replace(/\/$/, '')}${story.Image[0].url}`
    : null;

  const [cover, setCover] = useState(coverUrl);
  
  const [chapters, setChapters] = useState(
    story?.Chapters?.map((chapter, index) => ({
      id: index + 1,
      uri: chapter.url,
      name: chapter.name,
    })) || []
  );

  

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    genres: Yup.array()
      .of(Yup.string())
      .min(1, 'Selecciona al menos un género')
      .required('Los géneros son obligatorios'),
    status: Yup.string().required('Selecciona un estado'),
    category: Yup.string().required('Selecciona una categoría'),
  });

  const handleUploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permisos requeridos',
        'Se necesitan permisos para acceder a la galería.'
      );
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: false, 
      quality: 1, 
    });
    
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileType = uri.split('.').pop().toLowerCase();
  
      if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
        setCover(uri);
      } else {
        Alert.alert(
          'Formato no soportado',
          'Por favor selecciona un archivo JPG o PNG.'
        );
      }
    }
  };
  

  const handleAddChapter = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0]; 
        setChapters([
          ...chapters,
          { id: chapters.length + 1, uri: file.uri, name: file.name },
        ]);
      } else {
        Alert.alert('Operación cancelada', 'No se seleccionó ningún archivo.');
      }
    } catch (error) {
      console.error('Error al seleccionar el archivo:', error);
      Alert.alert('Error', 'Hubo un problema al seleccionar el archivo.');
    }
  };
  
  

  const handleSubmit = async values => {
    const storyData = { ...values, cover, chapters, userId };
    const response = await updateStory(storyData, story._id)
    if (response != undefined) { 
        Alert.alert('Historia modificada');
    } else {
      console.error('Error al subir la historia');
    }
  };

  let genres = (() => {
    try {
      return typeof story?.Genres === "string" ? JSON.parse(story.Genres) : story.Genres || [];
    } catch (e) {
      console.error("Error al parsear Genres:", e);
      return []; 
    }
  })();

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
            title: story?.Title || '',
            description: story?.Description || '',
            genres,
            status: story?.Status || 'publicandose',
            category: story?.Category || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <View>
            <Text style={styles.header}>Editar Historia</Text>
            <TextInput
              label="Título"
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              style={styles.input}
              error={touched.title && errors.title}
            />
            {touched.title && errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}
            <TextInput
              label="Descripción"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              multiline
              numberOfLines={4}
              style={styles.input}
              error={touched.description && errors.description}
            />
            {touched.description && errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
            <TouchableOpacity
              onPress={handleUploadImage}
              style={styles.coverContainer}
            >
              {cover ? (
                <Image source={{ uri: cover }} style={styles.coverImage} />
              ) : (
                <Text style={styles.uploadText}>Subir Portada</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Géneros</Text>
            <View style={styles.genresContainer}>
              {genresList.map((genre) => (
                <Chip
                  key={genre}
                  selected={values.genres.includes(genre)}
                  onPress={() => {
                    const selected = values.genres.includes(genre);
                    const updatedGenres = selected
                      ? values.genres.filter((g) => g !== genre)
                      : [...values.genres, genre];
                    setFieldValue('genres', updatedGenres);
                  }}
                  style={[
                    styles.chip,
                    values.genres.includes(genre) && styles.chipSelected,
                  ]}
                >
                  {genre}
                </Chip>
              ))}
            </View>
            {touched.genres && errors.genres && (
              <Text style={styles.errorText}>{errors.genres}</Text>
            )}

            <Text style={styles.sectionTitle}>Estado</Text>
            <View style={styles.statusContainer}>
              <Checkbox.Item
                label="Finalizado"
                status={
                  values.status === 'finalizado' ? 'checked' : 'unchecked'
                }
                onPress={() => setFieldValue('status', 'finalizado')}
              />
              <Checkbox.Item
                label="Publicación"
                status={
                  values.status === 'publicandose' ? 'checked' : 'unchecked'
                }
                onPress={() => setFieldValue('status', 'publicandose')}
              />
              <Checkbox.Item
                label="En pausa"
                status={values.status === 'pausa' ? 'checked' : 'unchecked'}
                onPress={() => setFieldValue('status', 'pausa')}
              />
            </View>
            <Text style={styles.sectionTitle}>Categoría</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  selected={values.category === cat}
                  onPress={() => setFieldValue('category', cat)}
                  style={[
                    styles.chip,
                    values.category === cat && styles.chipSelected,
                  ]}
                >
                  {cat}
                </Chip>
              ))}
            </View>
            {touched.category && errors.category && (
              <Text style={styles.errorText}>{errors.category}</Text>
            )}

            <Text style={styles.sectionTitle}>Capítulos</Text>
            <Button
              mode="outlined"
              onPress={handleAddChapter}
              style={styles.addChapterButton}
            >
              Agregar Capítulo
            </Button>
            <View style={styles.flatListContainer}>
              <FlatList
                data={chapters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <List.Item
                    title={`Capítulo ${item.id}: ${item.name}`}
                    description={item.uri}
                    left={(props) => <MaterialCommunityIcons
                      name="file-pdf-box"
                      size={24}
                      color="red"
                      {...props}
                    />}
                  />
                )}
              />
            </View>

            <View style={styles.sumbitContainer}><Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}>
              Subir Edición
            </Button>
            </View>
          </View> 
        )}
      </Formik>
    </ScrollView>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      marginBottom: 16,
    },
    coverContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 200,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      marginBottom: 16,
    },
    coverImage: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    uploadText: {
      fontSize: 16,
      color: '#888',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
    },
    genresContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 4,
    },
    chipSelected: {
      backgroundColor: '#6200ee',
    },
    statusContainer: {
      marginBottom: 16,
    },
    errorText: {
      fontSize: 12,
      color: 'red',
      marginBottom: 8,
    },
    submitButton: {
      marginTop: 16,
      
    },
    flatListContainer: {
      maxHeight: 200, 
      marginVertical: 10,
    },
    sumbitContainer:{
      height: 125,
    }
  });
  
  export default EditStory;