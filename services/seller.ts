import api from './api'

interface authData {
  email: string,
  password: string
}

interface buyData {
  cpf: string,
  ammount: number
}

export function authenticate (data: authData) {
  try {
    const response = api.post('/seller/authenticate', {
      email: data.email,
      password: data.password
    })
    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export function registerBuy (data: buyData) {
  try {
    const response = api.post('/seller/buy/register', {
      cpf: data.cpf,
      value: data.ammount
    })

    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export async function getParks () {
  try {
    const response = await api.get('/seller/home')

    return response
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}
