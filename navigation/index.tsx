import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList } from '../types'
import UserDrawerNavigator from './UserDrawerNavigator'
import { LinkingConfiguration } from './LinkingConfiguration'
import AuthStackNavigator from './AuthStackNavigator'
import SellerStackNavigator from './SellerDrawerNavigator'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation ({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator () {
  return (
    <Stack.Navigator initialRouteName={true ? (true ? 'User' : 'Seller') : 'Auth'} screenOptions={{ headerShown: false }}>
      {true ? (true
        ? <Stack.Screen name="User" component={UserDrawerNavigator} />
        : <Stack.Screen name="Seller" component={SellerStackNavigator} />)
        : <Stack.Screen name="Auth" component={AuthStackNavigator} /> }
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  )
}
