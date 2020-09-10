import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { Text, Icon, View } from './Themed'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { AuthContext } from '../hooks/AuthContext'

export function CustomDrawerContent (props) {
  const { signOut } = useContext(AuthContext)
  return (
    <View style={styles.drawer}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => props.navigation.closeDrawer()}>
          <Icon name='arrow-back' size={30} color='black' style={styles.arrow} />
        </TouchableOpacity>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.button} onPress={() => { signOut() }}>
        <Icon name='exit-to-app' size={30} color='black' />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  drawer: {
    justifyContent: 'space-between',
    flex: 1
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#444'
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 20
  },
  arrow: {
    margin: 10
  },
  arrowButton: {
    marginBottom: 20,
    marginTop: 10
  }
})
