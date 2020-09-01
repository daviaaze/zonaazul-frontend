import * as Linking from 'expo-linking'
import { LinkingOptions } from '@react-navigation/native'

export const LinkingConfiguration:LinkingOptions = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      User: {
        screens: {
          HomeScreen: 'Home',
          ActiveScreen: 'Active',
          HistoryScreen: 'History',
          CarScreen: 'Car'
        }
      },
      Auth: {
        screens: {
          LoginScreen: 'Login',
          RegisterScreen: 'Register'
        }
      },
      NotFound: '*'
    }
  }
}
