import { useContext } from 'react'
import axios from 'axios'
import { Alert } from 'react-native'
import { AuthContext } from '../hooks/AuthContext'
// import AsyncStorage from '@react-native-community/async-storage'
// const { setUser, setSeller } = useContext(AuthContext)

const api = axios.create({
  baseURL: 'https://zonaazul-backend.herokuapp.com/'
})

api.interceptors.response.use(
  response => {
    // Do something with response data

    return response
  },
  error => {
    // Do something with response error

    // You can even test for a response code
    // and try a new request before rejecting the promise

    if (
      error.request._hasError === true &&
      error.request._response.includes('connect')
    ) {
      Alert.alert(
        'Aviso',
        'Não foi possível conectar aos nossos servidores, sem conexão a internet',
        [{ text: 'OK' }],
        { cancelable: false }
      )
    }

    if (error.response.status === 401) {
      const requestConfig = error.config

      // O token JWT expirou
      // setUser(null)
      // setSeller(null)
      // AsyncStorage.multiRemove(['@zonaAzul:User', '@zonaAzul:Seller'])
      Alert.alert('Aviso',
        'Token expirado ou inválido',
        [{ text: 'OK' }],
        { cancelable: false })

      return axios(requestConfig)
    }

    return Promise.reject(error)
  }
)

export default api
