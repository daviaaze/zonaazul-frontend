import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { SellerStackParamList } from '../types'
import NotFoundScreen from '../screens/NotFoundScreen'
import DashboardScreen from '../screens/Seller/DashboardScreen'
import SalesScreen from '../screens/Seller/SalesScreen'

const Drawer = createDrawerNavigator<SellerStackParamList>()

export default function SellerStackNavigator () {
  const colorScheme = useColorScheme()

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard">
      <Drawer.Screen component={DashboardScreen}
        name="Dashboard" />
      <Drawer.Screen component={SalesScreen}
        name="Sales" />
    </Drawer.Navigator>
  )
}
