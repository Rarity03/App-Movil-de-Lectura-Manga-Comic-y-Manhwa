import {API_URL} from '../util/constants'
import axios from 'axios';


export async function loginApi(values){
  const url = `${API_URL}auth/local`

  const params = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(values)
  }
  try{
    const response = await fetch(url, params)
    const result = await response.json()
    return result
  }catch(error){
    console.error('Error:', error);
    return null
  }
  
}

export async function registroAPI(values) {
  const url = `${API_URL}auth/local/register`;

  try {
    const response = await axios.post(url, {
      email: values.email,
      username: values.username,
      password: values.password,
    });
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  } catch (error) {
    if (error.response) {
      console.error('An error occurred:', error.response);
    } else {
      console.error('Error:', error);
    }
  }
}