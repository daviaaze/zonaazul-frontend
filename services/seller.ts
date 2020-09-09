import api from './api'

interface authData {
  email: string,
  password: string
}

interface buyData {
  cpf: string,
  value: number
}

export function authenticate (data: authData) {
  const response = api.post('/seller/authenticate', {
    email: data.email,
    password: data.password
  })
  return response
}

export function registerBuy (data: buyData) {
  const response = api.post('/seller/buy/register', {
    cpf: data.cpf,
    value: data.value
  })

  return response
}

export function getParks () {
  const response = api.get('/seller/home')

  return response
}
