import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Icon, Box } from '../../components/Themed'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ActiveScreen () {
  if (true) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhum Estacionamento ativo</Text>
        <Icon name='local-parking' size={180} style={styles.parkIcon} />
        <TouchableOpacity activeOpacity={0.8} style={styles.button} >
          <Text style={styles.buttonText}>Estacionar</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estacionamentos ativos</Text>
      <View style={styles.list}>
        <Box style={styles.box}>
          <View style={styles.date}>
            <Text>20:50</Text>
            <Text>20/11/1999</Text>
          </View>
          <View style={styles.car}>
            <Text>Astra</Text>
            <Text>DDS-9153</Text>
          </View>
          <View style={styles.counter}>
            <Text>9 minutes</Text>
            <Text>Left</Text>
          </View>
        </Box>
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
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  list: {

  },
  box: {
    width: 300,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  date: {
    alignItems: 'center'
  },
  car: {

  },
  counter: {

  },
  parkIcon: {
    opacity: 0.3
  },
  button: {
    backgroundColor: 'green',
    alignSelf: 'center',
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#EEE'
  }
})
