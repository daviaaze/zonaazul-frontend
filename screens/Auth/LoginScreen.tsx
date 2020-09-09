/* eslint-disable react/prop-types */
import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import { Text, View, Input, Box } from '../../components/Themed'
import { AuthStackProps } from '../../types'

import { authenticate } from '../../services/user'
import { AuthContext } from '../../hooks/AuthContext'

interface FormData {
  email: string;
  password: string;
}

export default function LoginScreen ({ navigation }: AuthStackProps) {
  const { signIn } = React.useContext(AuthContext)

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
        console.warn(err.message)
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        console.warn(err.message)
      }
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Box style={styles.input}>
          <Input returnKeyType={'next'} name='email' placeholder='E-mail' autoCapitalize='none' />
        </Box>
        <Box style={styles.input}>
          <Input name='password' placeholder='Senha' />
        </Box>
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
        <TouchableOpacity activeOpacity={0.4}>
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
    marginBottom: 20,
    width: 200,
    borderColor: '#EEE',
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
  }
})
