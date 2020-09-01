/* eslint-disable react/prop-types */
import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import { Text, View, Input, Box } from '../../components/Themed'
import { AuthStackProps } from '../../types'

interface FormData {
  name: string;
  email: string;
}

export default function LoginScreen ({ navigation }: AuthStackProps) {
  const formRef = React.useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data)
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
      console.log(data)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        console.log(err)
      }
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Form ref={formRef} onSubmit={() => {}}>
        <Box style={styles.input}>
          <Input returnKeyType={'next'} name='email' placeholder='E-mail' />
        </Box>
        <Box style={styles.input}>
          <Input name='password' placeholder='Senha' />
        </Box>
      </Form>
      <View style={styles.buttons}>
        <View style={styles.buttonField}>
          <TouchableOpacity activeOpacity={0.4}>
            <View style={styles.button}>
              <Text>Entrar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.4}>
            <View style={styles.emptyButton}>
              <Text>Registrar</Text>
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
