import * as React from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import CarBox from '../../components/CarBox'

import { Text, View, Box, Input, Icon } from '../../components/Themed'
import { AuthContext } from '../../hooks/AuthContext'
import { getCars, registerCar, registerPark } from '../../services/user'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

export default function HomeScreen () {
  const [carId, setCarId] = React.useState(0)
  const [buttonOne, setButtonOne] = React.useState(false)
  const [buttonTwo, setButtonTwo] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { user, cars, fetchData } = React.useContext(AuthContext)
  const formRef = React.useRef<FormHandles>(null)

  async function handleSubmit (data) {
    try {
      await registerCar(data)
      await fetchData()
    } catch (err) {
      Alert.alert('Ops', err.response.message)
    }
  }

  async function handlePark () {
    const duration = buttonOne ? 1 : (buttonTwo ? 2 : null)
    if (!duration) {
      Alert.alert('Ops!', 'A duração precisa ser selecionada')
    } else {
      const data = {
        carId: cars.cars[carId].id,
        duration,
        location: null
      }
      try {
        await registerPark(data)
        Alert.alert('Sucesso!', 'Estacionamento registrado com sucessos')
        await fetchData()
      } catch (err) {
        Alert.alert('Ops!', err.message)
      }
    }
  }

  if (loading) return <ActivityIndicator size='large' style={{ justifyContent: 'center', flex: 1 }} />

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Seu Saldo é: {user?.wallet}</Text>
      <View style={styles.parkForm}>
        <View style={styles.selectionSection}>
          <Text style={styles.title}>Selecionar o Carro:</Text>
          <View style={styles.separator} />
          <View style={styles.carSection}>
            {(cars !== null && cars.cars?.length > 0)
              ? <CarBox car={cars.cars[carId]} />
              : <Box style={styles.carBox}>
                <Form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
                  <Box style={styles.carInput}>
                    <Input name='model' returnKeyType={'next'} placeholder='modelo'/>
                  </Box>
                  <Box style={styles.carInput}>
                    <Input name='plate' returnKeyType={'done'} autoCapitalize='characters' placeholder='placa'/>
                  </Box>
                </Form>
                <TouchableOpacity style={styles.carButton} onPress={() => formRef.current?.submitForm()}>
                  <Text>Adicionar</Text>
                </TouchableOpacity>
              </Box>}
            {(cars !== null && cars.cars?.length > 1) ? (<TouchableOpacity onPress={() => { setCarId((carId < (cars.cars.length - 1)) ? carId + 1 : 0) }}>
              <Icon name='swap-horiz' size={60} color='black' />
            </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.selectionSection}>
          <Text style={styles.title}>Selecionar o Periodo:</Text>
          <View style={styles.separator} />
          <View style={styles.boxButtons}>
            <TouchableOpacity activeOpacity={0.1} onPress={() => {
              setButtonOne(true)
              setButtonTwo(false)
            }} >
              <Box style={buttonOne ? styles.activeNumberButton : styles.numberButton}>
                <Text style={buttonOne ? styles.activeNumber : styles.number}>1 Hora</Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.1} onPress={() => {
              setButtonOne(false)
              setButtonTwo(true)
            }}>
              <Box style={buttonTwo ? styles.activeNumberButton : styles.numberButton}>
                <Text style={buttonTwo ? styles.activeNumber : styles.number}>2 Horas</Text>
              </Box>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => handlePark()}>
        <Text style={styles.buttonText}>Estacionar</Text>
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
  counter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666'
  },
  separator: {
    marginVertical: 10,
    backgroundColor: '#555',
    borderRadius: 10,
    height: 3,
    width: 200,
    alignSelf: 'center',
    marginBottom: 20
  },
  boxButtons: {
    height: 60,
    justifyContent: 'center',
    width: 160,
    marginBottom: 20,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  selectionSection: {
    alignItems: 'center'
  },
  numberButton: {
    height: 60,
    borderWidth: 2,
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeNumberButton: {
    height: 60,
    borderWidth: 0,
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  number: {
    fontSize: 24,
    fontWeight: '100'
  },
  activeNumber: {
    fontSize: 24,
    fontWeight: '100',
    color: '#EEE'
  },
  button: {
    backgroundColor: 'green',
    alignSelf: 'center',
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#EEE'
  },
  carInput: {
    width: 100,
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10
  },
  carButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    height: 30,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center'
  },
  carBox: {
    width: 250,
    borderRadius: 20,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center'
  },
  form: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  carSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 240,
    justifyContent: 'space-between'
  }
})
