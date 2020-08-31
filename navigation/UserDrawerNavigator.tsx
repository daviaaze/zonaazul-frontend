import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { UserDrawerParamList } from '../types'
import NotFoundScreen from '../screens/NotFoundScreen'
import HomeScreen from '../screens/User/HomeScreen'
import ActiveScreen from '../screens/User/ActiveScreen'
import HistoryScreen from '../screens/User/HistoryScreen'
import CarsScreen from '../screens/User/CarsScreen'

const Drawer = createDrawerNavigator<UserDrawerParamList>()

export default function AuthStackNavigator () {
  const colorScheme = useColorScheme()

  return (
    <Drawer.Navigator
      initialRouteName="Home">
      <Drawer.Screen component={HomeScreen}
        name="Home"/>
      <Drawer.Screen component={ActiveScreen}
        name="Active" />
      <Drawer.Screen component={HistoryScreen}
        name="History" />
      <Drawer.Screen component={CarsScreen}
        name="Cars" />
    </Drawer.Navigator>
  )
}
