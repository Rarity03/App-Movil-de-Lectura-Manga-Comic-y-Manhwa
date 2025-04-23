import { API_URL } from '../util/constants';
import axios from 'axios';
import { getToken } from './token';

export async function fetchStories() {
  const url = `${API_URL}stories`; 
  try {
    const token = await getToken();
    if (!token) {
      console.error('No token found, authentication failed.');
      return [];  
    }
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener historias:', error.response?.data || error.message);
    return [];
  }
}

export async function myStories(id) {
  const url = `${API_URL}stories`; 
  try {
    const token = await getToken();
    if (!token) {
      console.error('No token found, authentication failed.');
      return [];  
    }
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data.filter(story => story.User.id === id); 
  } catch (error) {
    console.error('Error al obtener historias:', error.response?.data || error.message);
    return [];
  }
}

export async function uploadStory(story) {
  const url = `${API_URL}stories`;
  const token = await getToken();
  console.log(story);
  try {
    const formData = new FormData();

    formData.append('data', JSON.stringify({
      Title: story.title,
      Description: story.description,
      Rating: 0,
      Category: story.category,
      Status: story.status,
      Genres: JSON.stringify(story.genres),
      User: story.userId,
    }));

   
    if (story.cover) {
      const coverFile = {
        uri: story.cover,
        name: story.cover.split('/').pop(), 
        type: 'image/jpeg', 
      };
      formData.append('files.Image', coverFile); 
    }

  
    if (story.chapters && story.chapters.length > 0) {
      story.chapters.forEach((chapter, index) => {
        const chapterFile = {
          uri: chapter.uri,
          name: chapter.name || `chapter_${index + 1}.pdf`, 
          type: 'application/pdf', 
        };
        formData.append('files.Chapters', chapterFile); 
      });
    }
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error del servidor:', error.response.data);
    } else {
      console.error('Error:', error);
    }
  }
}

export async function updateStory(story, storyId) {
  const url = `${API_URL}stories/${storyId}`;
  const token = await getToken();
  
  try {
    const formData = new FormData();

    formData.append('data', JSON.stringify({
      Title: story.title,
      Description: story.description,
      Rating: story.rating || 0,  
      Category: story.category,
      Status: story.status,
      Genres: JSON.stringify(story.genres),
      User: story.userId,
    }));

    if (story.cover && !story.cover.startsWith('/uploads')) {
      const coverFile = {
        uri: story.cover,
        name: story.cover.split('/').pop(),
        type: 'image/jpeg',
      };
      formData.append('files.Image', coverFile);
    } else {
      return;
    }

    if (story.chapters && story.chapters.length > 0) {
      story.chapters.forEach((chapter, index) => {
        if (chapter.uri.startsWith('/uploads')) {
          return; 
        }
        const chapterFile = {
          uri: chapter.uri,
          name: chapter.name || `chapter_${index + 1}.pdf`,
          type: 'application/pdf',
        };
        formData.append('files.Chapters', chapterFile);
      });
    }

    const response = await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error del servidor:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error en la solicitud:', error.message);
    }
  }
}

export async function deleteStory(storyId) {
  const url = `${API_URL}stories/${storyId}`;
  const token = await getToken();
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    if (error.response) {
      console.error('Error al eliminar la historia:', error.response.data); 
    } else {
      console.error('Error de red:', error.message); 
    }
    throw error; 
  }
}
