import {
    AsyncStorage
} from 'react-native';
import axios from 'axios';

export const colors = {
    primary: '#427AA1'
}

export const fonts = {
    primary: '',
    color: {
        primary: '#003764',
        secondary:'#B5B5B5'
    }
}
export const apiServer  = {
    url: 'https://etda.amn-corporation.com'
}

export const refreshToken = async () => {
    token = await AsyncStorage.getItem('token')
    //console.log(token)
    newToken = await getUserInfo(token) !== true ? getRefreshToken(token) : token
    AsyncStorage.setItem('token', newToken)
}

const getUserInfo = (token) => {
    axios.get(apiServer.url + '/api/backend/user/information', {'Token': token})
    .then( res => {
        return true
    }).catch(error => {
        return error.response.status
    })
}

const getRefreshToken = token => {
    axios({
        method: 'GET',
        url: apiServer.url + '/api/backend/user/refresh-token',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    .then(res => {
        return res.data.token
    })
    .catch( err => {
        console.log(err.config)
    })
}