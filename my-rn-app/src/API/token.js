import AsyncStorage from '@react-native-async-storage/async-storage';
import { Token } from '../util/constants';


export async function setToken(token){
    try {
        AsyncStorage.setItem(Token, token);
        return true
    } catch (error) {
        console.log(error)
        return null

    }
}

export async function getToken(){
    try {
        const tok = await AsyncStorage.getItem(Token);
        return tok
    } catch (error) {
        console.log(error)
        return null

    }
}

export async function removeToken(){
    try {
        AsyncStorage.removeItem(Token);
        return true
    } catch (error) {
        console.log(error)
        return null

    }
}