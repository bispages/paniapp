import React, { useEffect } from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from '../screens/Splash';
import AppNavigationDrawer from './AppNavigationDrawer';
import OnBoardingNavigationStack, { LoginNavigationStack } from './OnBoardingNavigationStack';
import Colors from '../assets/colors';
import { setIsOnBoarded } from '../store/slices/AppStateSlice';
import { selectIsLoading, selectIsOnBoarded, selectUser } from '../store/selectors';

const RootStack = createStackNavigator();

const RootNavigationContainer = ({ theme }: { theme: Theme }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const onBoarded = useSelector(selectIsOnBoarded);
  const user = useSelector(selectUser);

  useEffect(() => {
    AsyncStorage.getItem('onboarded').then(value => {
      if (value !== null && value === '1') {
        dispatch(setIsOnBoarded(true));
      }
    });
  }, []);

  const screenOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: Colors.primary },
    ...TransitionPresets.SlideFromRightIOS,
  };

  return loading ? (
    <Splash />
  ) : (
    <NavigationContainer theme={theme}>
      {user ? (
        <AppNavigationDrawer />
      ) : (
        <RootStack.Navigator screenOptions={{ ...screenOptions }}>
          {onBoarded ? (
            <RootStack.Screen name="loginstack" component={LoginNavigationStack} />
          ) : (
            <RootStack.Screen name="onboardstack" component={OnBoardingNavigationStack} />
          )}
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigationContainer;
