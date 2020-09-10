import React from 'react'
import { Box, View, Text } from '../Themed'
import { StyleSheet } from 'react-native'

const Park = ({ park }) => {
  const date = new Date(park.date)
  const now = new Date()
  return (
    <Box style={styles.box}>
      <View style={styles.date}>
        <Text>{date.getHours()}:{date.getMinutes()}</Text>
        <Text>{date.getDay()}/{date.getMonth()}/{date.getMinutes()}</Text>
      </View>
      <View style={styles.car}>
        <Text>{park.car.model}</Text>
        <Text>{park.car.plate}</Text>
      </View>
      <View style={styles.counter}>
        <Text>{(park.duration * 60) - Math.round((((now - date) % 86400000) % 3600000) / 60000)} {((park.duration * 60) - Math.round((((now - date) % 86400000) % 3600000) / 60000)) === 1 ? 'Minuto' : 'Minutos'}</Text>
        <Text>Restantes</Text>
      </View>
    </Box>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 300,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20
  },
  date: {
    alignItems: 'center'
  },
  car: {

  },
  counter: {

  }
})

export default Park
