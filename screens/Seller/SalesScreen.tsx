/* eslint-disable react/prop-types */
import * as React from 'react'
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'
import InputMask from '../../components/InputMask'

import { Text, View, Input, Box } from '../../components/Themed'

interface FormData {
  cpf: string;
  ammount: number;
}

export default function LoginScreen ({ navigation }) {
  const formRef = React.useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(data)
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        cpf: Yup.string().matches(/^\d{3}\d{3}\d{3}\d{2}$/).required('CPF é um campo obrigatório'),
        ammount: Yup.number().lessThan(100).required('O valor é obrigatório')
      })
      await schema.validate(data, {
        abortEarly: false
      })
      // Validation passed
      try {
        Alert.alert(
          'Tem Certeza?',
          ` 
          Adicionar ${data.ammount} creditos
          na conta com
          CPF ${data.cpf.slice(0, 3)}.${data.cpf.slice(3, 6)}.${data.cpf.slice(6, 9)}-${data.cpf.slice(9, 11)} `
          , [
            {
              text: 'Cancelar',
              onPress: () => { throw new Error('Cancelado') },
              style: 'cancel'
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        )
      } catch (err) {
        if (err) return
      }
      console.log(data)
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
      <Text style={styles.title}>Eba!</Text>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Box style={styles.input}>
          <InputMask type='cpf' returnKeyType={'next'}
            name='cpf'
            placeholder='CPF'
            keyboardType='numeric'
            blurOnSubmit={false}
            onSubmitEditing={() => { (formRef.current?.getFieldRef('ammount')).focus() }} />
        </Box>
        <Box style={styles.input}>
          <Input name='ammount' placeholder='Valor' keyboardType='numeric' onSubmitEditing={() => { formRef.current?.submitForm() }} />
        </Box>
      </Form>
      <TouchableOpacity activeOpacity={0.4} onPress={() => { formRef.current?.submitForm() }}>
        <View style={styles.button}>
          <Text>Confirmar</Text>
        </View>
      </TouchableOpacity>
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