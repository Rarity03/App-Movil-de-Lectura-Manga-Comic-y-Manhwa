import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Header = ({ onMenuPress, logout }) => {

  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = React.useState(false);

  const  upload = () => {
    navigation.navigate('UploadStory')
  }

  const  myStories = () => {
    navigation.navigate('MyStories')
  }

  return (
    <Appbar.Header style={styles.header}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Appbar.Action
            icon="menu"
            onPress={() => setMenuVisible(true)}
            style={styles.icon}
            color="white"
          />
        }
      >
        <Menu.Item onPress={() => onMenuPress('account')} title="Cuenta" />
        <Menu.Item onPress={upload} title="Subir historia" />
        <Menu.Item onPress={myStories} title="Mis historias"/>
        <Menu.Item onPress={() => onMenuPress('favorites')} title="Favoritos" />
        <Menu.Item onPress={() => onMenuPress('settings')} title="Configuración" />
        <Menu.Item onPress={logout} title="Logout" />
      </Menu>
      <Appbar.Content title="Historias" titleStyle={styles.title} />
      <Appbar.Action icon="magnify" onPress={() => console.log('Buscar presionado')} style={styles.icon} color="white"/>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200ee', 
    flexDirection: 'row',
    alignItems: 'center', 
  },
  icon: {
    marginHorizontal: 10, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center', 
  },
});

export default Header;

