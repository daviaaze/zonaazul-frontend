import React from 'react'
import { Box, Text } from './Themed'
import { StyleSheet } from 'react-native'

const Car = ({ car }) => {
  return (
    <Box style={styles.box}>
      <Text style={styles.model}>{car.model}</Text>
      <Text style={styles.plate}>{car.plate}</Text>
    </Box>
  )
}

const styles = StyleSheet.create({
  model: {
    fontSize: 23
  },
  plate: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  box: {
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    width: 160,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10
  }
})

export default Car
