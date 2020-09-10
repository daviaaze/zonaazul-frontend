import React from 'react'
import { Box, View, Text } from './Themed'
import { StyleSheet } from 'react-native'
import { AuthContext } from '../hooks/AuthContext'

const Active: React.FC = ({ active }) => {
  const { cars } = React.useContext(AuthContext)
  const car = cars?.cars.find(car => (car.Id === active.carId))
  const date = new Date(active.date)
  const now = new Date()
  return (
    <Box style={styles.box}>
      <View style={styles.date}>
        <Text>{date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:{date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}</Text>
        <Text>{date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}/{date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/{date.getFullYear()}</Text>
      </View>
      <View style={styles.car}>
        <Text>{car?.model}</Text>
        <Text>{car?.plate}</Text>
      </View>
      <View style={styles.counter}>
        <Text>{(active.duration * 60) - Math.round((((now - date) % 86400000) % 3600000) / 60000)} {((active.duration * 60) - Math.round((((now - date) % 86400000) % 3600000) / 60000)) === 1 ? 'Minuto' : 'Minutos'}</Text>
        <Text>Restantes</Text>
      </View>
    </Box>)
}

const styles = StyleSheet.create({
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
    alignItems: 'center'
  },
  counter: {
    alignItems: 'center'
  }
})

export default Active
