import * as React from 'react'
import * as Yup from 'yup'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'

import { Text, View, Input, Box, Icon } from '../../components/Themed'
import InputMask from '../../components/InputMask'

import { register } from '../../services/user'
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from '../../hooks/AuthContext'
import api from '../../services/api'

interface registerData {
  name: string,
  email: string,
  password: string,
  cpf: string
}

export default function RegisterScreen ({ navigation }) {
  const [hidden, setHidden] = React.useState(true)
  const [hiddenConfirm, setHiddenConfirm] = React.useState(true)
  const formRef = React.useRef<FormHandles>(null)
  const { setUser } = React.useContext(AuthContext)

  const handleSubmit: SubmitHandler<registerData> = async (data) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é um campo obrigatório'),
        email: Yup.string().email().required('E-mail é um campo obrigatório'),
        cpf: Yup.string().matches(/^\d{3}\d{3}\d{3}\d{2}$/).required('CPF é um campo obrigatório'),
        password: Yup.string().min(8).required('Senha é um campo obrigatório'),
        passwordConfirm: Yup.string().test('password', 'As senhas não coincidem', function (value) {
          return (value === this.parent.password)
        }).required('É obrigatório confirmar a senha')
      })
      await schema.validate(data, {
        abortEarly: false
      })
      // Validation passed
      try {
        const response = await register(data)

        setUser(response.data.user)
        await AsyncStorage.setItem('@zonaAzul:User', JSON.stringify(response.data.user))
        await AsyncStorage.setItem('@zonaAzul:token', response.data.token)

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`
      } catch (err) {

      }
    } catch (err) {
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message
        })
        formRef.current?.setErrors(validationErrors)
      }
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vamos Começar!</Text>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Box style={styles.input}>
          <Input returnKeyType={'next'}
            name='name'
            placeholder='Nome'
            autoCapitalize='words'
            blurOnSubmit={false}
            onSubmitEditing={() => { (formRef.current?.getFieldRef('email')).focus() }} />
        </Box>
        <Box style={styles.input}>
          <Input returnKeyType={'next'}
            name='email'
            placeholder='E-mail'
            autoCapitalize='none'
            blurOnSubmit={false}
            onSubmitEditing={() => { (formRef.current?.getFieldRef('cpf')).focus() }} />
        </Box>
        <Box style={styles.input}>
          <InputMask type='cpf' returnKeyType={'next'}
            name='cpf'
            placeholder='CPF'
            keyboardType='numeric'
            blurOnSubmit={false}
            onSubmitEditing={() => { (formRef.current?.getFieldRef('password')).focus() }} />
        </Box>
        <View style={styles.password}>
          <Box style={styles.passInput}>
            <Input returnKeyType={'next'}
              name='password'
              placeholder='Senha'
              blurOnSubmit={false}
              secureTextEntry={hidden}
              autoCapitalize='none'
              onSubmitEditing={() => { (formRef.current?.getFieldRef('passwordConfirm')).focus() }} />
          </Box>
          <TouchableOpacity activeOpacity={0.4} onPress={() => setHidden(!hidden)}>
            <Icon name={hidden ? 'visibility' : 'visibility-off'} size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.password}>
          <Box style={styles.passInput}>
            <Input name='passwordConfirm'
              placeholder='Confirmar Senha'
              autoCapitalize='none'
              secureTextEntry={hiddenConfirm}
              blurOnSubmit={false}
              onSubmitEditing={() => { formRef.current?.submitForm() }}
            />
          </Box>
          <TouchableOpacity activeOpacity={0.4} onPress={() => setHiddenConfirm(!hiddenConfirm)}>
            <Icon name={hiddenConfirm ? 'visibility' : 'visibility-off'} size={40} />
          </TouchableOpacity>
        </View>
      </Form>
      <View style={styles.buttons}>
        <View style={styles.buttonField}>
          <TouchableOpacity activeOpacity={0.4} onPress={() => { formRef.current?.submitForm() }}>
            <View style={styles.button}>
              <Text>Registrar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.4}>
            <View style={styles.emptyButton}>
              <Text>Entrar</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    borderColor: '#AAA',
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
    marginBottom: 20
  },
  passInput: {
    width: 150,
    borderColor: '#AAA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginRight: 10
  }
})
