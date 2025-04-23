import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { formsStyles, colors } from '../../styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginApi } from '../../API/user';
import useAuth from '../../hooks/useAuth'

export default function LoginForm({changeForm}) {

  const {login} = useAuth()

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required('Required'),
    identifier: Yup.string().email('Invalid email').required('Required'),
    });


  const formik = useFormik({
    initialValues: {
      identifier:'',
      password:'',
    },
    validationSchema:SignupSchema,
    onSubmit: async values => {
      try{
        const response = await loginApi(values)
        if(response.statusCode) throw  "Error en el usuario o contraseña." 
        login(response)
      }catch(error){
        console.log(error)
      }
      
    },
  })
  return (
    <View>
      <TextInput 
       label="Correo"
       style = {formsStyles.input}
       onChangeText={(value) => formik.setFieldValue('identifier',value)}
       error = {formik.errors.identifier}
      />
      <Text style={formsStyles.input}>{formik.errors.identifier}</Text>
      <TextInput
       label="Contraseña"
       style = {formsStyles.input}
       secureTextEntry
       onChangeText={(value) => formik.setFieldValue('password',value)}
       error = {formik.errors.password}
      />
      <Text style={formsStyles.input}>{formik.errors.password}</Text>
      <Button
        mode = 'contained'
        style = {formsStyles.btnSuccess}
        onPress={formik.handleSubmit}
      >
        Iniciar Sesión
      </Button>
      <Button
        mode = 'text'
        style = {formsStyles.btnText}
        labelStyle = {formsStyles.btnTextLabel}
        onPress={changeForm}
      >
        Registrarse
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({})