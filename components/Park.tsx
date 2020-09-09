import React from 'react'
import { Box, Text, View } from '../components/Themed'
import { StyleSheet } from 'react-native'
interface park {
    id: string,
    date: Date,
    location: Object,
    duration: number,
    carId: string,
    userId: string
}

const components: React.FC<park> = ({ park }) => {
  const Data = new Date(park.date)
  return (
    <Box style={styles.box}>
      <View style={styles.date}>
        <Text>{Data.getHours}:{Data.getMinutes}</Text>
        <Text>{Data.getDay}/{Data.getMonth}/{Data.getMinutes}</Text>
      </View>
      <View style={styles.car}>
        <Text>{park.car.model}</Text>
        <Text>{park.car.plate}</Text>
      </View>
    </Box>
  )
}

const styles = StyleSheet.create({
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
  car: {
    alignItems: 'center'
  }
})

export default components
