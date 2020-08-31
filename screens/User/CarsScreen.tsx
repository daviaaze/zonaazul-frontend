import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Icon, Box } from '../../components/Themed'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CarsScreen () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carros</Text>
      {false ? <View style={styles.list}>
        <Box style={styles.box}>
          <Text style={styles.model}>Astra</Text>
          <Text style={styles.plate}>DDS-9153</Text>
        </Box>
      </View> : <Icon name='directions-car' size={200} style={styles.carIcon} />}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Adicionar</Text>
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
    borderColor: '#000',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    width: 160,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  list: {

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
  }
})
