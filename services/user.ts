import api from './api'

interface authData {
  email: string,
  password: string
}
interface registerData {
  email: string,
  name: string,
  cpf: string,
  password: string
}

interface carData {
  plate: string,
  model: string
}
interface parkData {
  carId: string,
  location: object,
  duration: number
}

export function authenticate (data: authData) {
  const response = api.post('/user/authenticate', {
    email: data.email,
    password: data.password
  })
  return response
}
export function register (data: registerData) {
  const response = api.post('/user/register', {
    name: data.name,
    cpf: data.cpf,
    password: data.password,
    email: data.email
  })
  return response
}

export function getCars () {
  const response = api.get('/user/car/get')

  return response
}

export function getCar (id: string) {
  const response = api.get(`/user/car/get/:${id}`)

  return response
}

export function registerCar (data: carData) {
  const response = api.post('/user/car/register', {
    plate: data.plate,
    model: data.model
  })
  return response
}

export function getParks () {
  const response = api.get('/user/park/get')

  return response
}

export function registerPark (data: parkData) {
  const response = api.post('/user/park/register', {
    carId: data.carId,
    location: data.location || null,
    duration: data.duration
  })
  return response
}

export function getInfo () {
  const response = api.get('/user/info')
  return response
}
