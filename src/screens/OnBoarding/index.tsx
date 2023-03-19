import React, { RefObject, ReactElement, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  Image,
  useWindowDimensions,
  ImageProps,
  StyleSheet,
  Pressable,
  ImageRequireSource,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useBackHandler from '../../hooks/useBackHandler';
import styles from './OnBoarding.style';
import { setIsOnBoarded } from '../../store/slices/AppStateSlice';
import { selectIsOnBoarded } from '../../store/selectors';
import { StackNavigationProp } from '@react-navigation/stack';

type Item = {
  key: string;
  title: string;
  text: string;
  image: ImageProps;
};

// Onboarding Slides.
const slides = [
  {
    key: 'OnBoardOne',
    title: 'Call a technician?',
    text: 'Find electritian or plumber in your neighbourhood.',
    image: require('../../assets/img/28724.png'),
    backGroundColor: '#ffffff',
  },
  {
    key: 'OnBoardTwo',
    title: 'Need Material?',
    text: 'Hassle-free to buy materials and get them delivered at your door step.',
    image: require('../../assets/img/28723.png'),
    backGroundColor: '#ffffff',
  },
  {
    key: 'OnBoardThree',
    title: 'Estimate easily?',
    text: 'No more pen and paper work. Smarter way to prepare estimates and place orders.',
    image: require('../../assets/img/28725.png'),
    backGroundColor: '#ffffff',
  },
  {
    key: 'OnBoardFour',
    title: 'Find a service guy',
    text: 'Reach out the service personel around you with a few clicks.',
    image: require('../../assets/img/28726.png'),
    backGroundColor: '#ffffff',
  },
];

const BackGround = ({ scrollX, inputRange }: { scrollX: RefObject<Animated.Value>; inputRange: number[] }) => {
  const backgroundColor = scrollX.current?.interpolate({
    inputRange: inputRange,
    outputRange: slides.map(slide => slide.backGroundColor),
  });
  return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />;
};

const Circles = ({
  scrollX,
  width,
  inputRange,
}: {
  scrollX: RefObject<Animated.Value>;
  width: number;
  inputRange: number[];
}) => {
  const translateY = scrollX.current?.interpolate({
    inputRange: inputRange,
    outputRange: slides.map((_, index) => (index === slides.length - 1 ? width : 0)),
  });
  return (
    <Animated.View style={[styles.circleContainer, { transform: [{ translateY: translateY ? translateY : 0 }] }]}>
      {slides.map((_, index) => {
        const scale = scrollX.current?.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [1, 1.5, 1],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.current?.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`circle-${index}`}
            style={[
              styles.circle,
              { opacity },
              {
                transform: [
                  {
                    scale: scale ? scale : 1,
                  },
                ],
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

const DoneButton = ({
  scrollX,
  width,
  onDone,
  inputRange,
}: {
  scrollX: RefObject<Animated.Value>;
  width: number;
  onDone: any;
  inputRange: number[];
}) => {
  const translateY = scrollX.current?.interpolate({
    inputRange: inputRange,
    outputRange: slides.map((_, index) => (index === slides.length - 1 ? 0 : width)),
  });
  return (
    <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: translateY ? translateY : 0 }] }]}>
      <Pressable onPress={onDone} style={styles.buttonCircle} android_ripple={{ color: '#FFF', radius: width }}>
        <Text style={styles.getStarted}>{`Get Started`}</Text>
      </Pressable>
    </Animated.View>
  );
};

const OnBoarding = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const onBoarded = useSelector(selectIsOnBoarded);
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0));
  const inputRange = slides.map((_, index) => index * width);

  // Adds BackHandler hook.
  useBackHandler();

  const navigateToLogin = useCallback(() => {
    navigation.navigate('loginstack');
  }, [navigation]);

  useEffect(() => {
    // If user already onBoarded navigate to login.
    if (onBoarded) navigateToLogin();
  }, []);

  const renderScreens = ({ item }: { item: Item }) => {
    return (
      <View style={[styles.screen, { width }]} key={item.key}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image as ImageRequireSource}
            style={[styles.image, { width: width * 0.7, height: width * 0.7 }]}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const onDone = () => {
    // User finished the introduction. Save this and show login.
    dispatch(setIsOnBoarded(true));
    AsyncStorage.setItem('onboarded', '1').then(() => {
      navigateToLogin();
    });
  };

  return onBoarded ? (
    <View style={styles.slide} />
  ) : (
    <SafeAreaView style={styles.container}>
      <BackGround scrollX={scrollX} inputRange={inputRange} />
      <Animated.FlatList
        data={slides}
        horizontal
        pagingEnabled
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX.current } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderScreens}
      />
      <Circles scrollX={scrollX} width={width} inputRange={inputRange} />
      <DoneButton scrollX={scrollX} width={width} onDone={onDone} inputRange={inputRange} />
    </SafeAreaView>
  );
};

export default OnBoarding;
