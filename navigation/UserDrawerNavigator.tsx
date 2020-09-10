import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { UserDrawerParamList, CarStackParamList } from '../types'
import HomeScreen from '../screens/User/HomeScreen'
import ActiveScreen from '../screens/User/ActiveScreen'
import HistoryScreen from '../screens/User/HistoryScreen'
import CarHomeScreen from '../screens/User/Car/HomeScreen'
import NewCarScreen from '../screens/User/Car/NewCarScreen'
import { CustomDrawerContent } from '../components/CustomDrawer'
import { createStackNavigator } from '@react-navigation/stack'

const Drawer = createDrawerNavigator<UserDrawerParamList>()

export default function AuthStackNavigator () {
  const colorScheme = useColorScheme()

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen component={HomeScreen}
        name="Home"/>
      <Drawer.Screen component={ActiveScreen}
        name="Active" />
      <Drawer.Screen component={HistoryScreen}
        name="History" />
      <Drawer.Screen component={CarStackNavigator}
        name="Cars" />
    </Drawer.Navigator>
  )
}

const CarStack = createStackNavigator <CarStackParamList>()

function CarStackNavigator () {
  return (
    <CarStack.Navigator
      headerMode="none"
      initialRouteName='Home'
    >
      <CarStack.Screen component={CarHomeScreen}
        name='Home' />
      <CarStack.Screen component={NewCarScreen}
        name='New' />
    </CarStack.Navigator>
  )
}
