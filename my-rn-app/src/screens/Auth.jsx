import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import logo from '../../assets/akane_feliz.png'
import layoutStyles from '../styles/layouts'
import RegisterForm from '../components/Auth/RegisterForm'
import LoginForm from '../components/Auth/LoginForm'

export default function Auth() {
  const [showLogin, setShowLogin] = useState(false) 
  const changeForm = () => {
    setShowLogin(!showLogin)
  }

  return (
    <View style ={layoutStyles.container}>
      <Image style={styles.logo} source={logo}/>
      {
        showLogin ? <LoginForm changeForm={changeForm}/>: <RegisterForm changeForm={changeForm}/>
      }
      
    </View>
  )
}

const styles = StyleSheet.create({

  logo:{
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom:20
  }
})

