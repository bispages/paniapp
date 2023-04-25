import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors';
import styless from './Profile.style';
import { useGetUsersQuery } from '../../store/slices/IdentityApiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUserId } from '../../store/selectors';
import { useSelector } from 'react-redux';

const Profile = () => {

  const userId = useSelector(selectUserId);
  // const { data: userdet } = useGetNearUsersQuery(userId);

  const { data: users } = useGetUsersQuery(userId);
  console.log(users,"getUsersiooio");

  const[mode,setMode] = useState('');

  AsyncStorage.getItem('user').then(value => {
    setMode(value || '');
  });

  // console.log(JSON.stringify(mode?.userId),"12345678hjjgh");
  const { appColors } = useTheme();
  return (
    <View style={styless.container}>
      <View  style={styles.profilecontainer}>
        <View  style={styles.profile}>

        </View>
        <Text  style={styles.profiletag}>Add Profile Picture</Text>
      </View>
     
              <View style={styles.details}>
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
                style={[styles.textInput]}
               
                keyboardType="default"
                maxLength={40}
              
                // defaultValue={userName}
                value={users?.userName}
                autoCorrect={false}
                autoComplete="name"
                // returnKeyType="next"
                textAlign="left"
                textContentType="name"
              />
           
              <TextInput
                mode="outlined"
                label="Place"
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={[styles.textInput]}
               
                keyboardType="default"
                maxLength={40}
              
                // defaultValue={userName}
                value={users?.place}
                autoCorrect={false}
                autoComplete="name"
                // returnKeyType="next"
                textAlign="left"
                textContentType="name"
              />
              <TextInput
                mode="outlined"
                label="Pincode"
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={[styles.textInput]}
               
                keyboardType="default"
                maxLength={6}
              
                defaultValue={Number}
                value={users?.pincode}
                autoCorrect={false}
                autoComplete="name"
                // returnKeyType="next"
                textAlign="left"
                textContentType="name"
              />
              <TextInput
                mode="outlined"
                label="User Phone"
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={styles.textInput}
               
                keyboardType="numeric"
                maxLength={10}
              
                
                value={users?.userPhone}
                autoCorrect={false}
                // autoComplete="phone"
                returnKeyType="next"
                textAlign="left"
                textContentType="phone"
              />
         {/* <Text>{users?.userPhone}</Text> */}
              
              </View>

      <View style={styles.savebtn}>
        <TouchableOpacity style={styles.save}>
          <Text style={styles.savetxt}> Save </Text>
          </TouchableOpacity>
      </View>
   
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  textInput:{
    width: '70%',
    marginVertical:3
  },

  profilecontainer:{
    width:'100%',
    height:200,
    alignItems:'center',
    justifyContent:'center'
  },
  profile:{
    width:140,
    height:140,
    borderWidth:3.5,
    borderColor:colors.profileborder,
    borderRadius:70
  },
  profiletag:{
    fontSize:16,
    fontWeight:'400',
    lineHeight:19,
    letterSpacing:-0.2,
    color:'rgba(0,0,0,0.7)',
    marginVertical:20    
  },
  details:{
    display:'flex',
    flexDirection:'column',
    marginTop:20,
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  inputdetails:{
    width:319,
    height:50,
    borderWidth:2,
    borderColor:colors.inputborder,
    borderRadius:7,
    marginVertical:10
  },
  savebtn:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
    marginBottom:10
  },
  save:{
    width:109,
    height:60,
    color:colors.white,
    borderRadius:30,
    backgroundColor:colors.btncolor,
    alignItems:'center',
    justifyContent:'center'   
  },
  savetxt:{
    fontSize:20,
    color:colors.white,
    fontWeight:'400',
    fontFamily:"Gotham Rounded"
  }


})
