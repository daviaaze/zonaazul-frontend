import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { } from '@expo/vector-icons'

import { Text, View, Box } from '../../components/Themed'

export default function HomeScreen () {
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Seu Saldo é: 0</Text>
      <View style={styles.parkForm}>
        <View style={styles.selectionSection}>
          <Text style={styles.title}>Selecionar o Carro:</Text>
          <View style={styles.separator} />
          <Box style={styles.box}>
            <Text style={styles.model}>Astra</Text>
            <Text style={styles.plate}>DDS-9153</Text>
          </Box>
        </View>
        <View style={styles.selectionSection}>
          <Text style={styles.title}>Selecionar o Periodo:</Text>
          <View style={styles.separator} />
          <View style={styles.boxButtons}>
            <TouchableOpacity activeOpacity={0.1} >
              <Box style={styles.numberButton}>
                <Text style={styles.number}>1 Hora</Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.1}>
              <Box style={styles.numberButton}>
                <Text style={styles.number}>2 Horas</Text>
              </Box>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
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
  box: {
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    width: 160,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10
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
    width: '80%',
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
  parkForm: {

  }
})
