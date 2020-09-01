import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DrawerNavigationProp } from '@react-navigation/drawer'

export type RootStackParamList = {
  User: undefined;
  Seller: undefined;
  Auth: undefined;
  NotFound: undefined;
};
type UserScreenRouteProp = RouteProp<RootStackParamList, 'User'>
type SellerScreenRouteProp = RouteProp<RootStackParamList, 'Seller'>
type AuthScreenRouteProp = RouteProp<RootStackParamList, 'Auth'>
type NotFoundScreenRouteProp = RouteProp<RootStackParamList, 'NotFound'>

type UserScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'User'
>;
type SellerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Seller'
>;
type AuthNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Auth'
>;
type NotFoundNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NotFound'
>;
export type RootProps = {
  route: UserScreenRouteProp | SellerScreenRouteProp | AuthScreenRouteProp | NotFoundScreenRouteProp;
  navigation: UserScreenNavigationProp | SellerNavigationProp | AuthNavigationProp | NotFoundNavigationProp;
};

export type UserDrawerParamList = {
  Home: undefined;
  Active: undefined;
  History: undefined;
  Cars: undefined;
};

type HomeScreenRouteProp = RouteProp<UserDrawerParamList, 'Home'>
type ActiveScreenRouteProp = RouteProp<UserDrawerParamList, 'Active'>
type HistoryScreenRouteProp = RouteProp<UserDrawerParamList, 'History'>
type CarsScreenRouteProp = RouteProp<UserDrawerParamList, 'Cars'>

type HomeScreenNavigationProp = DrawerNavigationProp<
  UserDrawerParamList,
  'Home'
>;
type ActiveNavigationProp = DrawerNavigationProp<
  UserDrawerParamList,
  'Active'
>;
type HistoryNavigationProp = DrawerNavigationProp<
  UserDrawerParamList,
  'History'
>;
type CarsNavigationProp = DrawerNavigationProp<
  UserDrawerParamList,
  'Cars'
>;
export type UserDrawerProps = {
  route: HomeScreenRouteProp | ActiveScreenRouteProp | HistoryScreenRouteProp | CarsScreenRouteProp;
  navigation: HomeScreenNavigationProp | ActiveNavigationProp | HistoryNavigationProp | CarsNavigationProp;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenRouteProp = RouteProp<AuthStackParamList, 'Login'>
type RegisterScreenRouteProp = RouteProp<AuthStackParamList, 'Register'>

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;
type RegisterNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;

export type AuthStackProps = {
  route: LoginScreenRouteProp | RegisterScreenRouteProp;
  navigation: LoginScreenNavigationProp | RegisterNavigationProp;
};

export type SellerDrawerParamList = {
  Dashboard: undefined;
  Sales: undefined;
};

type DashboardScreenRouteProp = RouteProp<SellerDrawerParamList, 'Dashboard'>
type SalesScreenRouteProp = RouteProp<SellerDrawerParamList, 'Sales'>

type DashboardScreenNavigationProp = DrawerNavigationProp<
  SellerDrawerParamList,
  'Dashboard'
>;
type SalesNavigationProp = DrawerNavigationProp<
  SellerDrawerParamList,
  'Sales'
>;

export type SellerDrawerProps = {
  route: DashboardScreenRouteProp | SalesScreenRouteProp;
  navigation: DashboardScreenNavigationProp | SalesNavigationProp;
};
