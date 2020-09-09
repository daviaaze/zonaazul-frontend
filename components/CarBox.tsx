import React from 'react'
import { View, Text, Box } from './Themed'
import { StyleSheet } from 'react-native'

const components: React.FC = ({ car }) => {
  if (car != null) {
    return (
      <Box style={styles.box}>
        <Text style={styles.model}>{car.model}</Text>
        <Text style={styles.plate}>{car.plate}</Text>
      </Box>
    )
  }
  return null
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    width: 160,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  model: {
    fontSize: 23
  },
  plate: {
    fontSize: 26,
    fontWeight: 'bold'
  }
})

export default components
