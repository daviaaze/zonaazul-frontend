import * as React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Text, View, Icon, Box } from '../../../components/Themed'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../../../hooks/AuthContext'
import Car from '../../../components/Car'
import { CarStackProps } from '../../../types'
import { removeCar } from '../../../services/user'
import AlertAsync from 'react-native-alert-async'

export default function HomeScreen ({ navigation }: CarStackProps) {
  const { cars, fetchData } = React.useContext(AuthContext)
  async function handleRemoveCar (car) {
    try {
      const choice = await AlertAsync('Opa!',
      `tem certeza que deseja remover o carro ${car.model} placa ${car.plate}?`,
      [{ text: 'Sim', onPress: () => 'Sim' },
        { text: 'Não', onPress: () => Promise.resolve('Não') }],
      {
        cancelable: true,
        onDismiss: () => 'Não'
      }
      )
      if (choice === 'Sim') {
        await removeCar(car.id)
        Alert.alert('Pronto', `Carro ${car.model} removido com sucesso`)
        fetchData()
      }
    } catch (err) {
      Alert.alert('Ops', err.message)
    }
  }

  if (cars === null || cars.cars.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carros</Text>
        <Icon name='directions-car' color='black' size={200} style={styles.carIcon} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('New')}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carros</Text>
      <View style = {styles.list} >
        {cars.cars.map(car => {
          return (
            <View key={car.id} style={styles.carList}>
              <Car car={car} />
              <TouchableOpacity onPress={() => handleRemoveCar(car)}>
                <Icon name='remove-circle-outline' size={50} />
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('New')}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View >
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
  box: {
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    width: 160,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  list: {
    height: '60%',
    marginTop: 20
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
  number: {
    fontSize: 24,
    fontWeight: '100'
  },
  button: {
    backgroundColor: 'green',
    alignSelf: 'center',
    width: 300,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  model: {
    fontSize: 23
  },
  plate: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#EEE'
  },
  carIcon: {
    opacity: 0.3
  },
  carList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    width: 225
  }
})
