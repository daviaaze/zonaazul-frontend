import React from 'react'
import { View, Text, Box, Input, Icon } from '../../../components/Themed'
import { CarStackProps } from '../../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Alert } from 'react-native'
import { Form } from '@unform/mobile'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FormHandles } from '@unform/core'
import { registerCar } from '../../../services/user'
import { AuthContext } from '../../../hooks/AuthContext'

const NewCarScreen = ({ navigation }: CarStackProps) => {
  const formRef = React.useRef <FormHandles>(null)
  const { fetchData } = React.useContext(AuthContext)

  async function handleSubmit (data) {
    try {
      await registerCar(data)
      Alert.alert('Eba', 'Carro adicionado com sucesso')
      fetchData()
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert('Ops', err.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='arrow-back' size={30} color='black' />
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar Carro</Text>
        <View style={{ width: '10%' }} />
      </View>
      <Form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
        <Box style={styles.inputBox}>
          <Input name='model' placeholder='Modelo' style={styles.input} />
        </Box>
        <Box style={styles.inputBox}>
          <Input name='plate' autoCapitalize='characters' placeholder='Placa' style={styles.input} />
        </Box>
      </Form>
      <TouchableOpacity style={styles.button} onPress={() => formRef.current?.submitForm()}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  form: {
    width: 200,
    height: 200
  },
  button: {
    backgroundColor: 'green',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  inputBox: {
    borderRadius: 10,
    marginBottom: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  }
})

export default NewCarScreen
