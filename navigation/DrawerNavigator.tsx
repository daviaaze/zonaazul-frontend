import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { DrawerParamList } from '../types'
import NotFoundScreen from '../screens/NotFoundScreen'

const Drawer = createDrawerNavigator<DrawerParamList>()

export default function DrawerNavigator () {
  const colorScheme = useColorScheme()

  return (
    <Drawer.Navigator
      initialRouteName="Home">
      <Drawer.Screen component={NotFoundScreen}
        name="Home"/>
      <Drawer.Screen component={NotFoundScreen}
        name="Active" />
      <Drawer.Screen component={NotFoundScreen}
        name="History" />
      <Drawer.Screen component={NotFoundScreen}
        name="Cars" />
    </Drawer.Navigator>
  )
}
