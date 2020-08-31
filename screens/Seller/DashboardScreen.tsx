import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Icon, Box, TextInput } from '../../components/Themed'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

export default function DashboardScreen () {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const [search, setSearch] = React.useState('')
  if (false) {
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
      <Text style={styles.title}>Bem Vindo!</Text>
      <Box style={styles.input} >
        <TextInput name='search' placeholder='Pesquisar Placa' style={styles.textInput}
          autoCapitalize="characters" onChangeText={(text) => setSearch(text)} value={search} />
      </Box>
      <View style={styles.list}>
        <ScrollView>
          {list.map((key) => <Box key={key} style={styles.box}>
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
          </Box>)}
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
  textInput: {
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  }
})
