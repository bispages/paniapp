import React, { useState } from 'react';
import { View,StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, useTheme, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { EstimateFormValues } from '../../types';
import { addCustomer } from '../../store/actions';
import styles from './Estimate.style';
import colors from '../../assets/colors';

const EstimateForm = () => {
  const dispatch = useDispatch();
  const { dark, colors } = useTheme();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const formVal: EstimateFormValues = useSelector(
    (state: RootState) => state.estimate,
  );
  const { customer } = formVal;

  const createEstimate = () => {
    dispatch(addCustomer({ name, area, mobile, pincode }));
    navigation.navigate('MaterialTypes');
  };

  return (
    <View style={[styles.panelButtonContainer]}>
      <View style={[styles.panelTextContainer]}>
        
        </View>
       
      <View style={styless.btnfield} >
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image style={styless.backbtn}  source={require('../../assets/img/backarrow.png')}
        /></TouchableOpacity>
      </View>
      <View style={styless.headfield}>
        <Text style={styless.head}> Customer Information </Text>
        </View>
      <View style={styless.boxfield}>
      
      <Image style={styless.icon} source={require('../../assets/img/addr.png')}/>
      
      <TextInput style={styless.textbox1} placeholder=' Name'></TextInput>
      </View>
      <View style={styless.boxfield}>
        <TextInput style={styless.textbox2} placeholder='Address'></TextInput>
      </View>
      <View style={styless.boxfield}>
        <TextInput style={styless.textbox3} placeholder='Mobile Number'></TextInput>
      </View>

      <Button style={styless.btn} onPress={()=>createEstimate()}> Estimate</Button>


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
 
  textbox1:{
    width:329,
    height:55,
    borderWidth:1,
    borderColor:'rgba(190,190,190,0.9)',
    borderRadius:7,
    backgroundColor:colors.white,
  },
  boxfield:{
    marginVertical:10,
    display:'flex',
    flexDirection:'row'

  },
  textbox2:{
    width:329,
    height:100,
    backgroundColor:colors.white,
    borderWidth:1,
    borderColor:'rgba(190,190,190,0.9)',
    borderRadius:7,
    // alignItems:'flex-start',
    display:'flex',
    justifyContent:'flex-start',
    textAlignVertical: 'top',
  },
  textbox3:{
    width:329,
    height:55,
    borderWidth:1,
    borderColor:'rgba(190,190,190,0.9)',
    borderRadius:10,
    backgroundColor:colors.white,
  },
  btn:{
    width:148,
    height:60,
    borderRadius:30,
    backgroundColor:colors.btncolor,
    alignContent:'center',
    justifyContent:'center',
    marginVertical:20
  },
  icon:{
    position:'absolute',
    width:16,
    height:16
  },
  head:{
    fontSize:27,
    fontWeight:'400',
    letterSpacing:-0.01,
    color:colors.headtag
  },
  headfield:{
    
  },
  btnfield:{
    width:'100%',
    height:80,
    alignContent:'center',
    justifyContent:'flex-start',
    marginBottom:30,
  },
  backbtn:{
    width:46,
    height:46
  }
})