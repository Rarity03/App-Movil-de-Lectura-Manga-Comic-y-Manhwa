import { StyleSheet, Text, View } from 'react-native';
import { Button, PaperProvider } from 'react-native-paper';
import AuthScreen from './src/screens/Auth';
import React, { useEffect, useMemo, useState } from 'react';
import AuthContext from './src/context/AuthContext';
import Home from './src/screens/Home';
import { removeToken, setToken ,getToken} from './src/API/token';
import { jwtDecode } from 'jwt-decode';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StoryDetails from './src/screens/StoryDetails';
import UploadStory from './src/screens/UploadStory';
import MyStories from './src/screens/MyStories';
import EditStory from './src/screens/EditStory';

const Stack = createStackNavigator();

export default function App() {

  const [auth, setAuth] = useState(undefined);
  
  useEffect(() => {
    (async () => {
      const token = await getToken()
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        })
      } else {
        setAuth(null)
      }
    })()
  }, [])

  const login = (response) => {
    setToken(response.jwt)
    setAuth({
      token: response.jwt,
      idUser: response.user.id,
      username: response.user.username,
    })
  }

  const authData = useMemo(() => ({
    auth: auth,
    login,
    logout,
  }), [auth])
  const logout = () => {
    if (auth) {
      removeToken()
      setAuth(null)
    }
  }

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        <NavigationContainer>
        {
          auth ?(
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                options={{ title: 'Inicio', headerShown: false }}
              >
                {() => <Home logout={logout} />}
              </Stack.Screen>
              <Stack.Screen
                name="StoryDetails"
                component={StoryDetails}
                options={{ title: 'Detalles de la Historia' }}
              />
              <Stack.Screen
                name="UploadStory"
                component={UploadStory}
                options={{ title: 'Subir Historia' }}
              />
              <Stack.Screen
                name="MyStories"
                component={MyStories}
                options={{ title: 'Mis Historias' }}
              />
              <Stack.Screen
                name="EditStory"
                component={EditStory}
                options={{ title: 'Editar Historia' }}
              />
            </Stack.Navigator>
          ):(<AuthScreen styles = {styles.text}/>)
        }
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:18,
    fontWeight: 'bold'
  }
});
