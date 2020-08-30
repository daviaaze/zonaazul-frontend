import * as Linking from 'expo-linking'

export default {
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
      NotFound: '*'
    }
  }
}
