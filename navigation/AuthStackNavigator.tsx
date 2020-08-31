import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import useColorScheme from '../hooks/useColorScheme'
import { AuthStackParamList } from '../types'
import NotFoundScreen from '../screens/NotFoundScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen'

const Stack = createStackNavigator<AuthStackParamList>()

export default function UserDrawerNavigator () {
  const colorScheme = useColorScheme()

  return (
    <Stack.Navigator
      initialRouteName="Login">
      <Stack.Screen options={{ headerShown: false }} component={LoginScreen}
        name="Login" />
      <Stack.Screen options={{ headerShown: false }} component={RegisterScreen}
        name="Register" />
    </Stack.Navigator>
  )
}
