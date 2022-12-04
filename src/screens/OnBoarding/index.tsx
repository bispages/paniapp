import React, {
  RefObject,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react';
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
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useBackHandler from '../../hooks/useBackHandler';
import { onBoard } from '../../store/actions';
import { RootState } from '../../store';
import styles from './OnBoarding.style';

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

const Square = ({
  scrollX,
  width,
}: {
  scrollX: RefObject<Animated.Value>;
  width: number;
}) => {
  const sqRotValue = Animated.modulo(
    Animated.divide(
      Animated.modulo(scrollX.current || 0, width),
      new Animated.Value(width),
    ),
    1,
  );

  const rotate = sqRotValue.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    outputRange: [
      '45deg',
      '36deg',
      '27deg',
      '18deg',
      '9deg',
      '0deg',
      '-9deg',
      '-18deg',
      '-27deg',
      '-36deg',
      '-45deg',
    ],
  });

  return (
    <Animated.View
    />
  );
};

const BackGround = ({
  scrollX,
  inputRange,
}: {
  scrollX: RefObject<Animated.Value>;
  inputRange: number[];
}) => {
  const backgroundColor = scrollX.current?.interpolate({
    inputRange: inputRange,
    outputRange: slides.map(slide => slide.backGroundColor),
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

const Circles = ({
  scrollX,
  width,
}: {
  scrollX: RefObject<Animated.Value>;
  width: number;
}) => (
  <View style={styles.circleContainer}>
    
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
  </View>
);

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
  const { colors, appColors } = useTheme();
  const translateY = scrollX.current?.interpolate({
    inputRange: inputRange,
    outputRange: slides.map((_, index) =>
      index === slides.length - 1 ? 0 : width,
    ),
  });
  return (
    <Animated.View
      style={[
        styles.buttonCircleContainer,
        { transform: [{ translateY: translateY ? translateY : 0 }] },
      ]}>
      <Pressable
        onPress={onDone}
        style={[
          styles.buttonCircle,
          {
            backgroundColor: appColors.success,
          },
        ]}
        android_ripple={{ color: '#000', radius: width }}>
        <Icon name="check" color={colors.text} size={24} />
      </Pressable>
    </Animated.View>
  );
};

const OnBoarding = (): ReactElement => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { onBoarded } = useSelector((state: RootState) => state.onboard);
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
            source={item.image}
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
    dispatch(onBoard());
    AsyncStorage.setItem('onboarded', '1').then(() => {
      navigateToLogin();
    });
  };

  return onBoarded ? (
    <View style={styles.slide} />
  ) : (
    <SafeAreaView style={styles.container}>
      <BackGround scrollX={scrollX} inputRange={inputRange} />
      <Square scrollX={scrollX} width={width} />
      <Animated.FlatList
        data={slides}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX.current } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={32}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderScreens}
      />
      <Circles scrollX={scrollX} width={width} />
      <DoneButton
        scrollX={scrollX}
        width={width}
        onDone={onDone}
        inputRange={inputRange}
      />
    </SafeAreaView>
  );
};

export default OnBoarding;
