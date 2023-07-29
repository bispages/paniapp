import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, useTheme, Text } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { addCustomer } from '../../store/slices/EstimateStateSlice';
import styles from './Estimate.style';
import colors from '../../assets/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLazyGetMaterialsQuery } from '../../store/slices/IdentityApiSlice';

const EstimateForm = () => {
  const dispatch = useDispatch();
  const { appColors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [mobile, setMobile] = useState('');
  const [getMaterialList, { isLoading, isError, data, error }] = useLazyGetMaterialsQuery();
  const createEstimate = () => {
    dispatch(addCustomer({ name, area, mobile }));
    getMaterialList()
      .then(() => navigation.navigate('MaterialTypes'))
      .catch(err => console.log(err));
    console.log(name, area, mobile, 'customer details');
  };

  return (
    <View style={[styles.panelButtonContainer]}>
      {isLoading ? (
        <View>
          {/* please add styles here */}
          <Image source={require('../../assets/img/loading.gif')} />
        </View>
      ) : (
        <>
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
              autoCorrect={false}
              returnKeyType="next"
              textAlign="left"
              textContentType="name"
            />
          </View>
          <View style={styless.boxfield}>
            <Image style={styless.icons} source={require('../../assets/img/home.png')} />
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
              autoCorrect={false}
              returnKeyType="next"
              textAlign="left"
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
              autoCorrect={false}
              returnKeyType="next"
              textAlign="left"
            />
          </View>

          <Button
            disabled={name === '' || area === '' || mobile === ''}
            style={styless.btn}
            onPress={() => createEstimate()}>
            Estimate
          </Button>
        </>
      )}
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
    alignItems: 'center',
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
