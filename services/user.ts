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
  location: object | null,
  duration: number
}

export async function authenticate (data: authData) {
  try {
    const response = await api.post('/user/authenticate', {
      email: data.email,
      password: data.password
    })
    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}
export async function register (data: registerData) {
  try {
    const response = await api.post('/user/register', {
      name: data.name,
      cpf: data.cpf,
      password: data.password,
      email: data.email
    })
    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export async function getCars () {
  try {
    const response = await api.get('/user/car/get')

    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export async function removeCar (id) {
  try {
    const response = await api.delete(`/user/car/remove/${id}`)

    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export async function getCar (id: string) {
  try {
    const response = await api.get(`/user/car/get/:${id}`)

    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export async function registerCar (data: carData) {
  try {
    const response = await api.post('/user/car/register', {
      plate: data.plate,
      model: data.model
    })
    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export async function getParks () {
  const response = await api.get('/user/park/get')

  return response
}

export async function registerPark (data: parkData) {
  try {
    const response = await api.post('/user/park/register', {
      carId: data.carId,
      location: data.location || null,
      duration: data.duration
    })
    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export async function getInfo () {
  try {
    const response = await api.get('/user/info')
    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}
