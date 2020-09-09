import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { authenticate } from '../services/user'
import api from '../services/api'
import * as SplashScreen from 'expo-splash-screen'

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthContextData {
  signed: boolean;
  user: object | null;
  seller: object | null;
  signIn(data:any): Promise<void>;
  signOut(): Promise<void>;
  setUser: Function;
  setSeller: Function;
}
interface authData {
  email: string,
  password: string
}

export default function AuthProvider ({ children }) {
  const [user, setUser] = useState<object | null>(null)
  const [seller, setSeller] = useState<object | null>(null)

  useEffect(() => {
    async function loadStoragedData () {
      try {
        const User = await AsyncStorage.getItem('@zonaAzul:User')
        const Seller = await AsyncStorage.getItem('@zonaAzul:Seller')
        const token = await AsyncStorage.getItem('@zonaAzul:token')
        if (User) setUser(JSON.parse(User))
        if (Seller) setSeller(JSON.parse(Seller))
        if (token) api.defaults.headers.Authorization = `Bearer ${token}`
      } finally {
        SplashScreen.hideAsync()
      }
    }
    loadStoragedData()
  }, [])

  async function signIn (data:authData) {
    try {
      const response = await authenticate(data)

      setUser(response.data.user)
      await AsyncStorage.setItem('@zonaAzul:User', JSON.stringify(response.data.user))
      await AsyncStorage.setItem('@zonaAzul:token', response.data.token)

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`
    } catch (err) {
      console.warn(err.message)
    }
  }

  async function signOut () {
    setUser(null)
    setSeller(null)
    await AsyncStorage.removeItem('@zonaAzul:User')
    await AsyncStorage.removeItem('@zonaAzul:Seller')
    await AsyncStorage.removeItem('@zonaAzul:token')
  }

  return (
    <AuthContext.Provider value={{ signed: !!user || !!seller, user, seller, signIn, signOut, setUser, setSeller }}>
      {children}
    </AuthContext.Provider>
  )
}
