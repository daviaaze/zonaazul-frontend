import React from 'react'
import { Box, Text, View } from '../components/Themed'
import { StyleSheet } from 'react-native'
import { AuthContext } from '../hooks/AuthContext'
interface park {
    id: string,
    date: Date,
    location: Object,
    duration: number,
    carId: string,
    userId: string
}

const Park: React.FC<park> = ({ park }) => {
  const { cars } = React.useContext(AuthContext)
  const car = cars?.cars.find(car => (car.Id === park.carId))
  const Data = new Date(park.date)
  return (
    <Box style={styles.box}>
      <View style={styles.date}>
        <Text>{Data.getHours()}:{Data.getMinutes()}</Text>
        <Text>{Data.getDay()}/{Data.getMonth()}/{Data.getMinutes()}</Text>
      </View>
      <View style={styles.car}>
        <Text>{car.model}</Text>
        <Text>{car.plate}</Text>
      </View>
      <View style={styles.duration}>
        <Text>{park.duration}{ (park.duration < 10) ? ' Hora' : ' Horas'}</Text>
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
  },
  duration: {
    justifyContent: 'center'
  }
})

export default Park
