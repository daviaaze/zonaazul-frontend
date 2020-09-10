import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { SellerDrawerParamList } from '../types'
import { CustomDrawerContent } from '../components/CustomDrawer'
import DashboardScreen from '../screens/Seller/DashboardScreen'
import SalesScreen from '../screens/Seller/SalesScreen'

const Drawer = createDrawerNavigator<SellerDrawerParamList>()

export default function SellerStackNavigator () {
  const colorScheme = useColorScheme()

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen component={DashboardScreen}
        name="Dashboard" />
      <Drawer.Screen component={SalesScreen}
        name="Sales" />
    </Drawer.Navigator>
  )
}
