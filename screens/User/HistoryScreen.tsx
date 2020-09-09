import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View, Icon, Box } from '../../components/Themed'
import Park from '../../components/Park'

interface parksData {
  parks: {
    id: string,
    date: Date,
    location: Object,
    duration: number,
    carId: string,
    userId: string
  }[]
}

export default function HistoryScreen () {
  const [parks, setParks] = React.useState<parksData | null>(null)
  if (!parks) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhum estacionamento registrado</Text>
        <Icon name='local-parking' size={180} color='black' style={styles.parkIcon} />
        <TouchableOpacity activeOpacity={0.8} style={styles.button} >
          <Text style={styles.buttonText}>Estacionar</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {parks?.parks.map(park => <Park park={park} key={park.id} />)}
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
    width: 250,
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
  },
  car: {
    alignItems: 'center'
  }
})
