import * as React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Text, View, Icon, Box, TextInput } from '../../components/Themed'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import Park from '../../components/Seller/Park'
import { getParks } from '../../services/seller'
import useInterval from '../../hooks/useInterval'

interface parksData {
    id: string,
    CarId: string,
    date: Date,
    location: Object,
    duration: number,
    userId: string,
    car: {
      userId: string,
      id: string,
      model: string,
      plate: string
    }
}

export default function DashboardScreen () {
  const [search, setSearch] = React.useState('')
  const [parks, setParks] = React.useState<parksData[]>()

  async function fetchData () {
    const response = await getParks()
    setParks(response.data)
  }

  useInterval(() => {
    fetchData()
  }, 5000)
  if (!parks) return <ActivityIndicator size={50} style={{ flex: 1, justifyContent: 'center' }} />
  if (parks.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem Vindo!</Text>
        <Text style={styles.title}>Não há nenhum estacionamento ativo no momento</Text>
        <Icon name='local-parking' size={180} color='black' style={styles.parkIcon} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Box style={styles.input} >
        <TextInput name='search' placeholder='Pesquisar Placa' style={styles.textInput}
          autoCapitalize="characters" onChangeText={(text) => setSearch(text)} value={search} />
      </Box>
      <View style={styles.list}>
        <ScrollView>
          {parks.map((park) => <Park key={park.id} park={park} />)}
        </ScrollView>
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
    height: 600
  },
  input: {
    marginBottom: 20,
    width: 200,
    borderColor: '#EEE',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10
  },
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

  },
  parkIcon: {
    opacity: 0.3,
    height: '70%'

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
  textInput: {
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  }
})
