import * as React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Text, View, Icon, Box } from '../../components/Themed'
import Active from '../../components/Active'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../../hooks/AuthContext'
import { UserDrawerProps } from '../../types'

export default function ActiveScreen ({ navigation }: UserDrawerProps) {
  const { active } = React.useContext(AuthContext)
  if (active === null) return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />
  if (active?.length === 0 || active === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhum Estacionamento ativo</Text>
        <Icon name='local-parking' size={180} color='black' style={styles.parkIcon} />
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.navigate('Home')} >
          <Text style={styles.buttonText}>Estacionar</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estacionamentos ativos</Text>
      <View style={styles.list}>
        {active.reverse().map(active => <Active key={active.id} active={active} />)}
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
    height: '100%'
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
