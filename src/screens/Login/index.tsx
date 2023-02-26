// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//   View,
//   Keyboard,
//   useWindowDimensions,
//   Pressable,
//   StyleSheet,
//   Linking,
// } from 'react-native';
// import {
//   TextInput,
//   Text,
//   Button,
//   useTheme,
//   Checkbox,
//   Snackbar
// } from 'react-native-paper';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   Easing,
// } from 'react-native-reanimated';
// import { useNavigation } from '@react-navigation/native';
// import * as Animatable from 'react-native-animatable';

// import useBackHandler from '../../hooks/useBackHandler';
// import styles from './Login.style';
// import LoginPhone from '../../assets/img/loginphone.svg';
// import { BISPAGES_TERMS_CONDITION_URL } from '../../utils/constants';

// const Login = () => {
//   const INITIAL_SCALE = 1;
//   const INITIAL_OFFSET = 0;
//   const [showSnack, setShowSnack] = useState(false);
//   const [message, setMessage] = useState('');
//   const checkboxView = useRef<Animatable.View & View>(null);
//   const { appColors } = useTheme();
//   const navigation = useNavigation();
//   const windowWidth = useWindowDimensions().width;
//   const windowHeight = useWindowDimensions().height;
//   const [phone, setPhone] = useState('');
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [generateOTPDisabled, setGenerateOTPDisabled] = useState(true);
//   const scale = useSharedValue(INITIAL_SCALE);
//   const offsetView = useSharedValue(INITIAL_OFFSET);
//   const offsetImage = useSharedValue(INITIAL_OFFSET);

//   // For image scaling
//   const animatedScaleStyles = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: scale.value }],
//     };
//   });

//   // For transform input element to top of keyboard
//   const animatedTranslateStyles = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: offsetView.value }],
//     };
//   });

//   // For transform input element to top of keyboard
//   const animatedImageTranslateStyles = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: offsetImage.value }],
//     };
//   });

//   const scaleImage = (
//     scaleValue: number,
//     offsetViewValue: number,
//     offsetImageValue: number,
//   ) => {
//     offsetImage.value = withTiming(offsetImageValue, {
//       duration: 500,
//       easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//     });
//     scale.value = withTiming(scaleValue, {
//       duration: 500,
//       easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//     });
//     offsetView.value = withTiming(offsetViewValue, {
//       duration: 500,
//       easing: Easing.bezier(0.25, 0.1, 0.25, 1),
//     });
//   };

//   // Adds hardware BackHandler hook.
//   useBackHandler();

//   const submit = () => {
//     // TODO sideEffects dispatch.
//     navigation.navigate('verifyphone', { phone });
//   };

//   const onTextChange = (text: string) => {
//     setPhone(text.replace(/[^0-9]/g, ''));
//   };

//   const acceptTerms = (): void => {
//     Keyboard.dismiss();
//     setTermsAccepted(!termsAccepted);
//     if (checkboxView.current?.bounceIn) checkboxView.current.bounceIn(400);
//   };

//   useEffect(() => {
//     setGenerateOTPDisabled(!(termsAccepted && phone.length === 10));
//   }, [termsAccepted, phone]);

//   useEffect(() => {
//     // Keyboard events.
//     Keyboard.addListener('keyboardDidHide', keyboardDidHide);
//     Keyboard.addListener('keyboardDidShow', keyboardDidShow);

//     // cleanup function
//     return () => {
//       Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
//       Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
//     };
//   }, []);

//   const keyboardDidHide = () => {
//     Keyboard.dismiss();
//     scaleImage(INITIAL_SCALE, INITIAL_OFFSET, INITIAL_OFFSET);
//   };

//   const keyboardDidShow = () =>
//     scaleImage(0.5, -windowHeight * 0.12, -windowHeight * 0.03);

//   const onDismissSnackBar = () => {
//     setShowSnack(false);
//     setMessage('');
//   };

//   const openTerms = useCallback(async () => {
//     const supported = await Linking.canOpenURL(BISPAGES_TERMS_CONDITION_URL);
//     if (supported) {
//       await Linking.openURL(BISPAGES_TERMS_CONDITION_URL);
//     } else {
//       setMessage(`Don't know how to open this URL: ${BISPAGES_TERMS_CONDITION_URL}`);
//       setShowSnack(true);
//     }
//   }, []);

//   return (
//     <View style={[styles.login]}>
//       <Animated.View style={[styles.image, animatedImageTranslateStyles]}>
//         <Animated.View style={[{ width: '100%' }, animatedScaleStyles]}>
//           <LoginPhone width="90%" height="90%" />
//         </Animated.View>
//       </Animated.View>
//       <Animated.View style={[styles.avoidView, animatedTranslateStyles]}>
//         <View
//           style={[
//             StyleSheet.absoluteFillObject,
//             {
//               width: windowWidth,
//               height: windowWidth * 2,
//               borderRadius: 40,
//               backgroundColor: '#f7f7f7',
//               transform: [{ translateY: -windowWidth * 0.07 }],
//             },
//           ]}
//         />
//         <View style={styles.headline}>
//           <Text
//             style={[styles.heading]}
//             theme={{ colors: { text: appColors.primary } }}>
//             Let's set your phone number
//           </Text>
//           <Text
//             style={[styles.subHeading]}
//             theme={{ colors: { text: appColors.primary } }}>
//             We will send you the 4 digit verification code
//           </Text>
//         </View>
//         <View style={[styles.inputset]}>
//           <TextInput
//             mode="outlined"
//             label="Mobile Number"
//             left={
//               <TextInput.Affix
//                 text="+91"
//                 textStyle={[
//                   styles.preText,
//                   { borderRightColor: appColors.greyfriendTwo },
//                 ]}
//                 theme={{
//                   colors: {
//                     text: appColors.primary,
//                   },
//                 }}
//               />
//             }
//             theme={{
//               colors: {
//                 primary: appColors.primary,
//                 text: appColors.primary,
//                 background: appColors.white,
//               },
//             }}
//             style={[styles.textInput]}
//             keyboardType="phone-pad"
//             maxLength={10}
//             onChangeText={text => onTextChange(text)}
//             defaultValue={phone}
//             value={phone}
//             autoCorrect={false}
//             autoCompleteType="tel"
//             returnKeyType="done"
//             textAlign="left"
//             textContentType="telephoneNumber"
//           />
//         </View>
//         <View style={[styles.termsContainer]}>
//           <Text
//             dataDetectorType={"link"}
//             onPress={openTerms}
//             style={[styles.textStyle, { fontSize: 12.5, textDecorationLine: 'underline' }]}
//             theme={{ colors: { text: appColors.secondary } }}>
//             {`Privacy & Terms of Service`}
//           </Text>
//         </View>
//         <Animatable.View ref={checkboxView} style={[styles.checkboxContainer]}>
//           <Checkbox
//             status={termsAccepted ? 'checked' : 'unchecked'}
//             onPress={acceptTerms}
//             uncheckedColor={appColors.greyfriendTwo}
//             color={appColors.secondary}
//           />
//           <Pressable style={[styles.termsAcceptedText]} onPress={acceptTerms}>
//             <Text
//               style={[styles.textStyle]}
//               theme={{ colors: { text: appColors.primary } }}>
//               I accept the terms and conditions.
//             </Text>
//           </Pressable>
//         </Animatable.View>
//         <View style={styles.btnContainer}>
//           <Button
//             dark
//             loading={false}
//             mode="contained"
//             disabled={generateOTPDisabled}
//             onPress={submit}
//             contentStyle={styles.button}
//             theme={{
//               colors: {
//                 primary: appColors.secondary,
//               },
//             }}>
//             GENERATE OTP
//           </Button>
//         </View>
//       </Animated.View>
//       <Snackbar
//         visible={showSnack}
//         duration={1000}
//         onDismiss={onDismissSnackBar}
//         theme={{
//           colors: { surface: appColors.white, onSurface: appColors.error },
//         }}>
//         {message}
//       </Snackbar>
//     </View>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginstep } from '../../Const/Api';
import axios from 'axios';
const array = [
  {
    ids: 1,
    img: require('../../assets/img/worker.png'),
    tag: 'Personal',
  },
];
const idea = [
  {
    ids: 2,
    img: require('../../assets/img/shopicon.png'),
    tag: 'Shop',
  },
];

const Login = () => {
  const [click, setClick] = useState(false);
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const [select, setSelect] = useState(false);

  const togglecheck = () => {
    setClick(!click);
  };

  const submit = () => {
    navigation.navigate('verifyphone', { phone });
  };

  const onTextChange = (text: string) => {
    setPhone(text.replace(/[^0-9]/g, ''));
  };

  // async function Phonenumber() {
  //   const from = new FormData();
  //   form.append("userPhone",phone)

  //   const options = {
  //     method:'POST',
  //     url: loginstep,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Accept: "application/json",
  //     },
  //     data: form,
  //   };
  //   await axios
  //   .request(options)
  // .then(function (response) {
  //   Phonenumber();
  //   navigation.navigate('verifyphone', { phone });
  // })
  // .catch(function (error) {
  //   console.error(error);
  // });
  // }

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.logocontainer}>
          <Image style={styles.logo} source={require('../../assets/img/panilogo.png')} />
          <Image source={require('../../assets/img/panitit.png')} />
        </View>
      </View>
      <View style={styles.subcontainers}>
        <Text style={styles.txt}>Enter your phone number</Text>
        <TextInput
          style={styles.inputfield}
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={text => onTextChange(text)}></TextInput>

        <View style={styles.logocontainer}>
          <Text style={styles.optiontag}>Select option</Text>
          <View style={styles.select}>
            {array.map((item, i) => {
              return (
                <TouchableOpacity
                  style={select === false ? styles.selecticons : styles.selecticon}
                  key={i}
                  onPress={() => [setSelect(false), AsyncStorage.setItem('chooseitem', '1')]}>
                  <Image source={item?.img} style={styles.custicon} />
                  <Text style={styles.selecttag}>{item?.tag}</Text>
                </TouchableOpacity>
              );
            })}
            {idea.map((item, i) => {
              return (
                <TouchableOpacity
                  style={select === false ? styles.selecticon : styles.selecticons}
                  key={i}
                  onPress={() => [setSelect(true), AsyncStorage.setItem('chooseitem', '2')]}>
                  <Image source={item?.img} style={styles.custicon} />
                  <Text style={styles.selecttag}>{item?.tag}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.selectdiv}>
            {/* <Checkbox style={styles.check}/> */}
            <TouchableOpacity style={styles.check} onPress={() => togglecheck()}>
              {click === true ? <View style={styles.checked}></View> : ''}
            </TouchableOpacity>
            <Text style={styles.checktag}>
              {' '}
              Agree with <Text style={styles.checkline}>Terms & Conditions</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.submitbtn} onPress={() => submit()}>
            {/* <TouchableOpacity style={styles.submitbtn} onPress={() =>Phonenumber()}> */}
            <Text style={styles.join}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
  },
  subcontainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  subcontainers: {
    flex: 0.5,
    marginHorizontal: 20,
    justifyContent: 'center',
    // position:'relative'
    // backgroundColor:'red'
  },
  logocontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // height:"40%",
    // backgroundColor:'red'
  },

  logo: {
    marginVertical: 8,
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.logintag,
    marginVertical: 8,
  },
  inputfield: {
    width: '90%',
    height: 50,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.logintag,
    paddingHorizontal: 10,
  },
  optiontag: {
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: 'bold',
    color: colors.logintag,
    marginVertical: 15,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectdiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  selecticon: {
    width: 78,
    height: 70,
    borderRadius: 7,
    backgroundColor: colors.loginselection,
    marginHorizontal: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selecticons: {
    width: 78,
    height: 70,
    borderRadius: 7,
    backgroundColor: colors.loginselection,
    marginHorizontal: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6A6C6E',
  },
  custicon: {
    width: 36,
    height: 35,
  },
  selecttag: {
    fontSize: 11,
    lineHeight: 19.2,
    fontWeight: '400',
    color: colors.logintag,
  },
  check: {
    borderRadius: 50,
    borderColor: colors.logintag,
    borderWidth: 1,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    borderRadius: 50,
    backgroundColor: colors.logintag,
    borderWidth: 1,
    width: 12,
    height: 12,
  },
  checktag: {
    fontSize: 14,
    color: '#4D4D4D',
    lineHeight: 16.8,
  },
  checkline: {
    fontSize: 14,
    color: '#4D4D4D',
    lineHeight: 16.8,
    textDecorationLine: 'underline',
  },
  submitbtn: {
    width: 100,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.btncolor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  join: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.white,
  },
});
