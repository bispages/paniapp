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
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import colors from '../../assets/colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { USERTYPE } from '../../utils/constants';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useOtpLoginMutation } from '../../store/slices/LoginApiSlice';
// import backimg from '../../assets/img/icon-park-solid_back.png'

const userOptions = [
  {
    ids: 0,
    img: require('../../assets/img/worker.png'),
    tag: 'Personal',
  },
  {
    ids: 1,
    img: require('../../assets/img/shopicon.png'),
    tag: 'Shop',
  },
];

const Login = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [terms, setTerms] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [userType, setUserType] = useState(USERTYPE.USER);
  const { appColors } = useTheme();
  const [otpLogin, { isLoading: otpLoader }] = useOtpLoginMutation();

  const togglecheck = () => {
    setAgreeTerms(prevAgreeTerms => !prevAgreeTerms);
  };

  const submit = async () => {
    if (userPhone.length < 10 || !agreeTerms) return;

    try {
      const data = await otpLogin({ userPhone, userType, agreeTerms }).unwrap();
      navigation.navigate('verifyphone', data);
    } catch (error) {
      console.error('rejected', error);
    }
  };

  const onTextChange = (phoneNumber: string) => {
    phoneNumber = phoneNumber.replace(/[^\d]/g, '');
    setUserPhone(phoneNumber);
    console.log(userPhone,"21212112122");
  };

  return (
    <View style={styles.container}>
      {
        terms === true ?
        <View style={styles.termscontainer}>
          <View style={styles.innercontainer}>
            <View style={styles.termstag}>
              <TouchableOpacity onPress={()=>setTerms(false)}>
              <Image style={{marginHorizontal:10,width:20,height:20}} source={require('../../assets/img/icon-park-solid_back.png')}/>
              </TouchableOpacity>
          <Text style={{fontSize:18,color:'#fff',fontWeight:'600', marginLeft:'15%'}}>Terms and Conditions</Text>
          </View>
          <ScrollView style={styles.scrolltag}>
          <Text style={{fontSize:16,lineHeight:18,color:'#000',fontWeight:'400',textAlign:'justify'}}>
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.

Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin.
            </Text>
          
          </ScrollView>
        </View>
        </View>
        :("")
      }
      <View style={styles.subcontainer}>
        <View style={styles.logocontainer}>
          <Image style={styles.logo} source={require('../../assets/img/panilogo.png')} />
          <Image source={require('../../assets/img/panitit.png')} />
        </View>
      </View>
      <View style={styles.subcontainers}>
        <Text style={styles.txt}>Enter your phone number</Text>
        <View style={styles.boxfield}> 
        <Text style={styles.code}>+91 |</Text> 
        <TextInput
          mode="outlined"
          theme={{
            colors: {
              primary: appColors.secondary,
              text: appColors.primary,
              background: appColors.white,
            },
          }}
          keyboardType="numeric"
          maxLength={10}
          autoCorrect={false}
          // textAlign="flex-start"
          textContentType="oneTimeCode"
          style={styles.inputfield}
          value={userPhone}
          onChangeText={onTextChange}>
            {/* <Text style={styles.count}>+91</Text> */}
          </TextInput>
          </View>

        <View style={styles.logocontainer}>
          <Text style={styles.optiontag}>Select your role</Text>
          <View style={styles.select}>
            {userOptions?.map(item => {
              return (
                <TouchableOpacity
                  style={userType === item.ids ? styles.selecticons : styles.selecticon}
                  key={item.tag}
                  onPress={() => {
                    setUserType(item.ids);
                    AsyncStorage.setItem('usertype', item.ids.toString());
                  }}>
                  <Image source={item?.img} style={styles.custicon} />
                  <Text style={styles.selecttag}>{item?.tag}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.selectdiv}>
            <TouchableOpacity style={styles.check} onPress={togglecheck}>
              {!!agreeTerms ? <View style={styles.checked}></View> : null}
            </TouchableOpacity>
            <Text style={styles.checktag}>
              Agree with </Text>
              <TouchableOpacity
               style={styles.clicktag}
               onPress={()=>setTerms(true)}>
                <Text style={styles.checkline}>Terms & Conditions</Text>
                </TouchableOpacity>
            
          </View>
          <Button
            dark
            loading={otpLoader}
            mode="contained"
            disabled={!(userPhone.length >= 10 && agreeTerms)}
            onPress={submit}
            style={styles.button}
            theme={{
              colors: {
                primary: appColors.btncolor,
              },
            }}>
            JOIN
          </Button>
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
  code:{
    position: 'absolute',
    zIndex:1,
    alignSelf:'center',
    marginHorizontal:5,
    fontSize: 20,
    color:'rgba(0, 0, 0, 0.36)'
  },
  boxfield: {
    // marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    border: 'none',
    outline: 'none',
  },
  termstag:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    height:60,
    // justifyContent:'center',
    width:'100%',
    backgroundColor:colors.btncolor,
    borderTopLeftRadius:5,
    borderTopRightRadius:5
  },
  subcontainers: {
    flex: 0.5,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // position:'relative'
    // backgroundColor:'red'
  },
  scrolltag:{
    margin:10
  },
  innercontainer:{
    width:'90%',
    height:'80%',
    // alignItems:'center',
    // justifyContent:'center',
    backgroundColor:'#fff',
    borderRadius:5
    
  },
  logocontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // height:"40%",
    // backgroundColor:'red'
  },
  termscontainer:{
    position: 'absolute',
    // width:'90%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex:2,
    backgroundColor: 'rgba(80, 80, 80, 0.3)',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
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
  clicktag:{
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:10,
    marginHorizontal:5,
    // backgroundColor:'blue'
  },
  inputfield: {
    width: '70%',
    height: 50,
    borderColor: colors.logintag,
    textAlignVertical: 'center',
    fontSize: 20,
    textAlign:'left',
    paddingLeft:40
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
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    // backgroundColor:'red'
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
    borderWidth: 2,
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
    marginLeft: 8,
    fontWeight:'800'
    
  },
  checkline: {
    fontSize: 14,
    color: '#4D4D4D',
    lineHeight: 16.8,
    textDecorationLine: 'underline',
    fontWeight:'800'
    // marginTop:10
  },
  button: {
    width: '70%',
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  join: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.white,
  },
});
