import React, { ReactElement, useEffect } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import {
  LOGOPOSITIONFROMMIDDLE,
  ACTIVITYPOSITIONFROMTOP,
  TEXTLOADERPOSITIONFROMTOP,
} from '../../utils/constants';
import styles from './Splash.style';

const Splash = (): ReactElement => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  useEffect(() => {
    offset.value = withTiming(LOGOPOSITIONFROMMIDDLE, {
      duration: 1000,
      easing: Easing.elastic(1),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyles]}>
        <View style={styles.headcontainer}>
        <Image source={require('../../assets/img/panilogo.png')}></Image>
        <Image source={require('../../assets/img/panitit.png')}></Image>
        </View>

      </Animated.View>
      <View style={styles.splashContainer}>
        
        <ActivityIndicator
          style={{ transform: [{ translateY: ACTIVITYPOSITIONFROMTOP }] }}
          size="small"
          color="#FFFFFF"
        />
        <Text
          style={[
            { transform: [{ translateY: TEXTLOADERPOSITIONFROMTOP }] },
            { fontSize: 12, fontWeight: '400', color: 'white' },
          ]}>
          Loading
        </Text>
      </View>
    </View>
  );
};

export default Splash;
