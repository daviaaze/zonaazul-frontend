/* eslint-disable react/prop-types */
import * as React from 'react'
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import { Text, View, Input, Box, Icon } from '../../components/Themed'
import { AuthStackProps } from '../../types'

import { AuthContext } from '../../hooks/AuthContext'
import { authenticate } from '../../services/seller'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'

interface FormData {
  email: string;
  password: string;
}

export default function LoginScreen ({ navigation }: AuthStackProps) {
  const { signIn, setSeller } = React.useContext(AuthContext)
  const [hidden, setHidden] = React.useState<boolean>(true)

  const formRef = React.useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    // { email: 'test@example.com', password: '123456' }
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required()
      })
      await schema.validate(data, {
        abortEarly: false
      })
      // Validation passed

      try {
        signIn(data)
      } catch (err) {
        Alert.alert('Ops', err.message)
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
      }
    }
  }

  async function handleSellerLogin () {
    try {
      const data = formRef.current?.getData()
      const response = await authenticate(data)
      setSeller(response.data.seller)
      AsyncStorage.setItem('@zonaAzul:Seller', JSON.stringify(response.data.seller))
      AsyncStorage.setItem('@zonaAzul:token', response.data.token)
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`
    } catch (err) {
      Alert.alert('Ops', err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Box style={styles.input}>
          <Input returnKeyType={'next'} name='email' placeholder='E-mail' autoCapitalize='none' />
        </Box>
        <View style={styles.password}>
          <Box style={styles.passInput}>
            <Input name='password' placeholder='Senha' secureTextEntry={hidden} />
          </Box>
          <TouchableOpacity activeOpacity={0.4} onPress={() => setHidden(!hidden)}>
            <Icon name={hidden ? 'visibility' : 'visibility-off'} size={40} />
          </TouchableOpacity>
        </View>
      </Form>
      <View style={styles.buttons}>
        <View style={styles.buttonField}>
          <TouchableOpacity activeOpacity={0.4} onPress={() => formRef.current?.submitForm()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.4}>
            <View style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Registrar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.4} onPress={() => { handleSellerLogin() }}>
          <Text style={styles.textLink}>Entrar como Vendedor</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 60,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: 'green',
    alignSelf: 'center',
    width: 150,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  emptyButton: {
    width: 150,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4287f5'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#EEE'
  },
  emptyButtonText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  input: {
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10
  },
  buttonField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350
  },
  buttons: {
    alignItems: 'center'
  },
  textLink: {
    color: '#4287f5',
    marginTop: 10
  },
  password: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  passInput: {
    width: 150,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginRight: 10
  }
})
