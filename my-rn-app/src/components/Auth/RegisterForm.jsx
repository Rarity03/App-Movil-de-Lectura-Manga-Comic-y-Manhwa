import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { formsStyles, colors } from '../../styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registroAPI } from '../../API/user';

export default function RegisterForm({changeForm}) {

  const SignupSchema = Yup.object().shape({
    username: Yup.string()  
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
    repeatpassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    email: Yup.string().email('Invalid email').required('Required'),
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      repeatpassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async values => {
      try {
        await registroAPI(values);  
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });


  return (
    <View>
      <TextInput 
       label="Correo"
       style = {formsStyles.input}
       onChangeText={(value) => formik.setFieldValue('email',value)}
       error = {formik.errors.email}
      />
      <Text style={formsStyles.input}>{formik.errors.email}</Text>
      <TextInput 
       label="Nombre de Usuario"
       style = {formsStyles.input}
       onChangeText={(value) => formik.setFieldValue('username',value)}
       error = {formik.errors.username}
      />
      <Text style={formsStyles.input}>{formik.errors.username}</Text>
      <TextInput
       label="Contraseña"
       style = {formsStyles.input}
       secureTextEntry
       onChangeText={(value) => formik.setFieldValue('password',value)}
       error = {formik.errors.password}
      />
      <Text style={formsStyles.input}>{formik.errors.password}</Text>
      <TextInput
       label="Repetir la Contraseña"
       style = {formsStyles.input}
       secureTextEntry
       onChangeText={(value) => formik.setFieldValue('repeatpassword',value)}
       error = {formik.errors.repeatpassword}
      />
      <Text style={formsStyles.input}>{formik.errors.repeatpassword}</Text>
      <Button
        mode = 'contained'
        style = {formsStyles.btnSuccess}
        onPress={formik.handleSubmit}
      >
        Registrarse
      </Button>
      <Button
        mode = 'text'
        style = {formsStyles.btnText}
        labelStyle = {formsStyles.btnTextLabel}
        onPress={changeForm}
      >
        Iniciar Sesión
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
});