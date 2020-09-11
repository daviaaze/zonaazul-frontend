import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { authenticate, getInfo, getParks, getCars } from '../services/user'
import api from '../services/api'
import * as SplashScreen from 'expo-splash-screen'
import { Alert } from 'react-native'
import useInterval from './useInterval'

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthContextData {
  signed: boolean;
  user: user | null;
  seller: object | null;
  signIn(data:any): Promise<void>;
  signOut(): Promise<void>;
  setUser(user:user): Function;
  setSeller(seller:seller): Function;
  fetchData(): Function;
  parks: parks | null;
  active: active[] | null;
  cars: carList | null;
}
interface authData {
  email: string,
  password: string
}
interface user {
  id: string,
  name: string,
  email: string,
  cpf: string,
  wallet: number
}
interface seller {
  id: string,
  name: string,
  email: string
}
interface carList {
  cars: {
    plate: string,
    model: string,
    carId: string,
    id: string
  }[]
}

interface parks {
  parks: {
    id: string,
    date: Date,
    location: Object,
    duration: number,
    carId: string,
    userId: string
  } []
}
interface active {
  id: string,
  date: Date,
  location: Object,
  duration: number,
  carId: string,
  userId: string
}

export default function AuthProvider ({ children }) {
  const [user, setUser] = useState<user | null>(null)
  const [seller, setSeller] = useState<object | null>(null)
  const [cars, setCars] = useState<carList | null>(null)
  const [parks, setParks] = useState<parks | null>(null)
  const [active, setActive] = useState<active[] | null>(null)
  const [fetcher, setFetcher] = useState<boolean>(false)

  async function fetchData () {
    const userData = await getInfo()
    setUser(userData.data.user)
    const carsData = await getCars()
    setCars(carsData.data)
    getParks().then(res => {
      setParks(res.data)
      const activeData = getActive(res.data)
      setActive(activeData)
    })
    const oldUser = await AsyncStorage.getItem('@zonaAzul:User')
    if (oldUser) {
      if (user !== JSON.parse(oldUser)) {
        try {
          await AsyncStorage.setItem('@zonaAzul:User', JSON.stringify(userData.data.user))
        } catch (err) {
        }
      }
    }
  }

  function getActive (parks) {
    const active = parks?.parks.filter(park => {
      const now = new Date()
      const begin = new Date(park.date)
      if ((begin.getTime() + (park.duration * 60 * 60 * 1000)) >= now.getTime()) return true
      else return false
    })
    return active
  }

  const loadStoragedData = async () => {
    try {
      const token = await AsyncStorage.getItem('@zonaAzul:token')
      if (token) api.defaults.headers.Authorization = `Bearer ${token}`
      const userData = await AsyncStorage.getItem('@zonaAzul:User')
      if (userData) setUser(JSON.parse(userData))
      const sellerData = await AsyncStorage.getItem('@zonaAzul:Seller')
      if (sellerData) setSeller(JSON.parse(sellerData))
    } catch (e) {
      alert('Falha ao carregar os dados salvos')
    }
  }

  useInterval(() => {
    if (user) {
      fetchData()
    }
  }, fetcher ? 50000 : null)

  useEffect(() => {
    loadStoragedData()
    SplashScreen.hideAsync()
  }, [])
  useEffect(() => {
    if (user && fetcher === false) {
      fetchData()
      setFetcher(true)
    }
  }, [user])

  async function signIn (data:authData) {
    try {
      const response = await authenticate(data)
      setUser(response.data.user)
      await AsyncStorage.setItem('@zonaAzul:User', JSON.stringify(response.data.user))
      await AsyncStorage.setItem('@zonaAzul:token', response.data.token)

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`
      fetchData()
      setFetcher(true)
    } catch (err) {
      Alert.alert('Ops', err.message)
    }
  }

  async function signOut () {
    setUser(null)
    setSeller(null)
    await AsyncStorage.removeItem('@zonaAzul:User')
    await AsyncStorage.removeItem('@zonaAzul:Seller')
    await AsyncStorage.removeItem('@zonaAzul:token')
    setFetcher(false)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user || !!seller, user, seller, fetchData, signIn, signOut, setUser, setSeller, parks, cars, active }}>
      {children}
    </AuthContext.Provider>
  )
}
