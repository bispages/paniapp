import React, { useEffect, useReducer, createRef, RefObject, useState, useCallback } from 'react';
import { View, TextInput, Keyboard, TouchableOpacity, useWindowDimensions, StyleSheet, Image } from 'react-native';
import { Text, TextInput as PaperTextInput, Button, useTheme } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { logInUser, saveUser } from '../../store/slices/AppStateSlice';
import styles from './Login.style';
import { useOtpVerifyMutation } from '../../store/slices/LoginApiSlice';
import { useLazyGetUsersQuery } from '../../store/slices/IdentityApiSlice';
import { User } from 'types';

const initialState = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
};

type CodeObject = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
};

type Action = {
  type: string;
  value: string;
};

function reducer(state: CodeObject | any, action: Action) {
  switch (action.type) {
    case 'code1':
      return { ...state, code1: action.value };
    case 'code2':
      return { ...state, code2: action.value };
    case 'code3':
      return { ...state, code3: action.value };
    case 'code4':
      return { ...state, code4: action.value };
    default:
      throw new Error('Codes not fetched');
  }
}

type routeParams = {
  route: { params: { sessionId: string; userPhone: string } };
};

const VerifyPhone = ({ route: { params } }: routeParams) => {
  const INITIAL_SCALE = 1;
  const INITIAL_OFFSET = 0;
  const { userPhone } = params;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const scale = useSharedValue(INITIAL_SCALE);
  const offsetView = useSharedValue(INITIAL_OFFSET);
  const offsetImage = useSharedValue(INITIAL_OFFSET);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [verifyActionDisabled, setVerifyActionDisabled] = useState(true);
  const refs: RefObject<TextInput>[] = [];
  const { appColors } = useTheme();
  const dispatchAction = useDispatch();
  const [otpVerify, { isLoading: otpVerifyLoader }] = useOtpVerifyMutation();
  const [triggerGetUser, { isFetching: getUserLoader }] = useLazyGetUsersQuery();
  const [seconds, setSeconds] = useState(30);
  const [minutes, setMinutes] = useState(0);
  const [show, setShow] = useState(false);

  // For image scaling
  const animatedScaleStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
console.log(userPhone,"123abc")
  // For transform input element to top of keyboard
  const animatedTranslateStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetView.value }],
    };
  });
  const settime =()=> {
    setShow(true)
    
    setSeconds(30);
    setMinutes(0);
  }

  var timer;

  // For transform input element to top of keyboard
  // const animatedImageTranslateStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateY: offsetImage.value }],
  //   };
  // });

  const scaleImage = (scaleValue: number, offsetViewValue: number, offsetImageValue: number) => {
    scale.value = withTiming(scaleValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    offsetView.value = withTiming(offsetViewValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    offsetImage.value = withTiming(offsetImageValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  useEffect(() => {
    if (!verifyActionDisabled) Keyboard.dismiss();
  }, [verifyActionDisabled]);

  useEffect(() => {
    // Keyboard events.
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    // cleanup function
    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
      Keyboard.removeAllListeners('keyboardDidShow');
    };
  }, []);

  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0){
        clearInterval(timer);
        setShow(false)
      }
    },1000);
    return () => clearInterval(timer)
  });

  const keyboardDidHide = () => scaleImage(INITIAL_SCALE, INITIAL_OFFSET, INITIAL_OFFSET);

  const keyboardDidShow = () => scaleImage(0.5, -windowHeight * 0.12, -windowHeight * 0.03);

  const onTextChange = (key: string, text: string, index: number) => {
    const val = text.replace(/[^0-9]/g, '');
    dispatch({ type: key, value: val });
    if (index < 3 && '' !== val) refs[index + 1].current?.focus();
  };

  const isVerifyActionDisabled = useCallback(() => {
    const isFilled = Object.keys(initialState).filter(key => state[key] === '').length;
    setVerifyActionDisabled(isFilled > 0);
  }, [state]);

  useEffect(() => {
    isVerifyActionDisabled();
  }, [state]);

  const resend = () => null;

  const verify = async () => {
    try {
      const otp = Object.keys(initialState)
        .map(key => state[key])
        .join('');
      const data = await otpVerify({ ...params, otp }).unwrap();

      if (data) {
        const { userId, userPhone, isNewUser } = data;
        dispatchAction(logInUser(data));
        if (isNewUser) navigation.navigate('userform', { userId, userPhone });
        else {
          const userDetails = (await triggerGetUser(userId).unwrap()) as User;
          AsyncStorage.setItem('user', JSON.stringify(userDetails)).then(() => {
            dispatchAction(saveUser(userDetails));
          });
        }
      }
    } catch (error) {
      console.error('OTP verification failed', error);
    }
  };

  return (
    <View style={styless.login}>
      <View style={styless.loginlogo}>
        <Image source={require('../../assets/img/Group189.png')} style={styless.logo} />
      </View>
      {/* <Animated.View
        style={[styles.image, animatedImageTranslateStyles, { paddingTop: 8 }]}
        >
        <Animated.View style={[{ width: '100%' }, animatedScaleStyles]}>
          <Verifyphone width="100%" height="90%" />
        </Animated.View>
      </Animated.View> */}
      <Animated.View style={[styles.avoidView, animatedTranslateStyles]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              width: windowWidth,
              height: windowWidth * 2,
              // borderRadius: 40,
              backgroundColor: '#ffffff',
              // transform: [{ translateY: -windowWidth * 0.07 }],
            },
          ]}
        />
        <View style={styles.headline}>
          <Text style={styless.heading}>OTP Verification</Text>
          <View style={[styles.phoneVerifyContainer]}>
            <Text style={styless.subHeading}>Enter the OTP sent to</Text>
            <Text
              style={[styles.phonenum]}
              theme={{
                colors: { text: appColors.primary },
              }}>{`+91 ${userPhone}`}</Text>
          </View>
        </View>
        <View style={styles.inputsetContainer}>
          <View style={styles.codeContainer}>
            {Object.keys(initialState).map((key, index) => {
              const newRef = createRef<TextInput>();
              refs.push(newRef);
              return (
                <PaperTextInput
                  key={key}
                  ref={newRef}
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: appColors.secondary,
                      text: appColors.primary,
                      background: appColors.white,
                    },
                  }}
                  style={[styles.otpTextInput]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={text => onTextChange(key, text, index)}
                  defaultValue={state[key]}
                  value={state[key]}
                  autoCorrect={false}
                  returnKeyType={key === 'code4' ? 'done' : 'next'}
                  textAlign="center"
                  textContentType="oneTimeCode"
                />
              );
            })}
          </View>
          <View style={styles.resendContainer}>
            <Text style={styless.resendText} theme={{ colors: { text: appColors.primary } }}>
              Didn't received OTP?
            </Text>
            <View style={styles.resendBtn}>
            {
          show === false ?
              <TouchableOpacity onPress={()=>settime()}>
            
                <Text style={styless.resendBtnTxt}>Resent Code</Text>
              </TouchableOpacity>
             
                :
                <Text style={styless.resendBtnTxt2}>Resent Code</Text>
              }
             
              
              
            </View>
            {
          show === true &&
          <Text style={styless.counter}>{minutes}:{seconds < 10 ? "0" + seconds : seconds }</Text>
          // :
          // ("")

        }
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            dark
            loading={otpVerifyLoader || getUserLoader}
            mode="contained"
            disabled={verifyActionDisabled}
            onPress={verify}
            style={styless.button}
            theme={{
              colors: {
                primary: appColors.btncolor,
              },
            }}>
            VERIFY
          </Button>
        </View>
      </Animated.View>
    </View>
  );
};

export default VerifyPhone;
const styless = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  loginlogo: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 232,
    height: 232,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 31.2,
    color: '#4A4A4A',
  },
  subHeading: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
    color: '#4D4D4D',
    marginVertical: 10,
  },
  resendText: {
    fontWeight: '400',
    fontSize: 13,

    color: '#878787',
  },
  resendBtnTxt: {
    fontWeight: '600',
    fontSize: 13,
    marginTop: -5,
    color: '#4D4D4D',
  },
  resendBtnTxt2: {
    fontWeight: '600',
    fontSize: 13,
    marginTop: -5,
    color: '#878787'
  },
  counter:{
    fontWeight: '600',
    fontSize: 13,
    color: '#4D4D4D',
    marginHorizontal:5
  },

  button: {
    width: '30%',
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
