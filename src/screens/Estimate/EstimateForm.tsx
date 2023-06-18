import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, useTheme, Text } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { selectEstimate } from '../../store/selectors';
import { EstimateFormValues } from '../../types';
import { addCustomer } from '../../store/slices/EstimateStateSlice';
import styles from './Estimate.style';
import colors from '../../assets/colors';
import { StackNavigationProp } from '@react-navigation/stack';

const EstimateForm = () => {
  const dispatch = useDispatch();
  const { dark, colors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const formVal: EstimateFormValues = useSelector(selectEstimate);
  const { customer } = formVal;

  const createEstimate = () => {
    dispatch(addCustomer({ name, area, mobile }));
    navigation.navigate('MaterialTypes');
    console.log( name, area,mobile,"iehdgdegy")
    console.log(mobile,"tttt")
    

  };
  const { appColors } = useTheme();
  return (
    <View style={[styles.panelButtonContainer]}>
      <View style={[styles.panelTextContainer]}></View>

      {/* <View style={styless.btnfield}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styless.backbtn} source={require('../../assets/img/backarrow.png')} />
        </TouchableOpacity>
      </View> */}

      <View style={styless.headfield}>
        <Text style={styless.head}> Customer Information </Text>
      </View>
    
      <View style={styless.boxfield}>
        <Image style={styless.icon} source={require('../../assets/img/addr.png')} />

        
        <TextInput
                mode="outlined"
                label="Name"
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={styless.textbox1}
                onChangeText={(text: string) => setName(text)}
                keyboardType="default"
                maxLength={40}
                // value={users?.userPhone}
                autoCorrect={false}
                // autoComplete="phone"
                returnKeyType="next"
                textAlign="left"
                textContentType="name"
              />
      </View>
      <View style={styless.boxfield}>
        <Image style={styless.icons} source={require('../../assets/img/home.png')} />
        {/* <TextInput multiline style={styless.textbox2} placeholder="Address"></TextInput> */}
        <TextInput
                mode="outlined"
                label="Address"
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={styless.textbox2}
                multiline={true}
                keyboardType="default"
                maxLength={80}
                onChangeText={(text: string) => setArea(text)}
                // value={users?.userPhone}
                autoCorrect={false}
                // autoComplete="phone"
                returnKeyType="next"
                textAlign="left"
                textContentType="area"
              />
      </View>
     
      <View style={styless.boxfield}>
      <Image style={styless.icon} source={require('../../assets/img/phonecall.png')} />
      <TextInput
                mode="outlined"
                label="Mobile Number"
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={styless.textbox3}
                onChangeText={(text: string) => setMobile(text)}
                keyboardType="numeric"
                maxLength={10}
                // value={users?.userPhone}
                autoCorrect={false}
                // autoComplete="phone"
                returnKeyType="next"
                textAlign="left"
                textContentType="mobile"
              />
              </View>

      <Button style={styless.btn} onPress={() => createEstimate()}>
        Estimate
      </Button>

      {/* <View style={[styles.panelButtonView]}>
        <Button
          dark
          loading={false}
          mode="contained"
          onPress={createEstimate}
          contentStyle={styles.panelButton}
          theme={{
            colors: {
              primary: colors.accent,
            },
          }}>
          Estimate
        </Button>
      </View> */}
    </View>
  );
};

export default EstimateForm;

const styless = StyleSheet.create({
  textbox1: {
    width: '98%',
    height: 55,
    paddingLeft: 15,
    // borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  boxfield: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    border: 'none',
    outline: 'none',
    alignItems:'center'
  },
  textbox2: {
    width: '98%',
    outline: 'none',
    
    minHeight: 55,
    maxHeight: 110,
    backgroundColor: colors.white,
    // borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    paddingLeft: 15,
    // alignItems:'flex-start',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  textbox3: {
    width: '98%',
    height: 55,
    // borderWidth: 1,
    paddingLeft: 15,
    borderColor: 'lightgrey',
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  btn: {
    width: 148,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.btncolor,
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  icon: {
    position: 'absolute',
    width: 16,
    height: 16,
    zIndex: 1,
    marginLeft: 5,
    // marginRight:3,
    alignSelf: 'center',
  },
  icons: {
    position: 'absolute',
    width: 16,
    height: 16,
    zIndex: 1,
    marginLeft: 5,
    marginTop: 10,
  },

  head: {
    fontSize: 27,
    fontWeight: '400',
    letterSpacing: -0.01,
    color: colors.headtag,
  },
  headfield: {},
  btnfield: {
    width: '100%',
    height: 80,
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  backbtn: {
    width: 46,
    height: 46,
  },
});
