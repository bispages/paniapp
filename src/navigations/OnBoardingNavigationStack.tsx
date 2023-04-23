import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import OnBoarding from '../screens/OnBoarding';
import Login from '../screens/Login';
import VerifyPhone from '../screens/Login/VerifyPhone';
import UserForm from '../screens/User/UserForm';
import PlaceSelection from '../screens/User/Placeselection';
import Colors from '../assets/colors';
import Selectlan from '../screens/Languageselection/Selectlan';
import Accept from '../screens/Languageselection/Accept';

const OnBoardStack = createStackNavigator();
const LoginStack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: Colors.primary },
  ...TransitionPresets.SlideFromRightIOS,
};

export const LoginNavigationStack = () => (
  <LoginStack.Navigator screenOptions={{ ...screenOptions }}>
    <LoginStack.Screen name="login" component={Login} />
    <LoginStack.Screen name="verifyphone" component={VerifyPhone} />
    <LoginStack.Screen name="userform" component={UserForm} />
    <LoginStack.Screen name="placeselection" component={PlaceSelection} />
  </LoginStack.Navigator>
);

const OnBoardingNavigationStack = () => (
  <OnBoardStack.Navigator screenOptions={{ ...screenOptions }}>
    <OnBoardStack.Screen name="onboard" component={OnBoarding} />
    <OnBoardStack.Screen name="selectlan" component={Selectlan} />
    <OnBoardStack.Screen name="accept" component={Accept} />
    <OnBoardStack.Screen name="loginstack" component={LoginNavigationStack} />
  </OnBoardStack.Navigator>
);

export default OnBoardingNavigationStack;
