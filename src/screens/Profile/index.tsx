import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors';

import styless from './Profile.style';
import { useGetUsersQuery } from '../../store/slices/IdentityApiSlice';



const Profile = () => {

  const { data: users } = useGetUsersQuery();
  console.log(users,"getUsersiooio");

  return (
    <View style={styless.container}>
      <View  style={styles.profilecontainer}>
        <View  style={styles.profile}>

        </View>
        <Text  style={styles.profiletag}>Add Profile Picture</Text>
      </View>
      {
        users?.users?.map((item, i) => {
            return (
              <View style={styles.details}>
        <TextInput  style={styles.inputdetails}>{item?.userName}</TextInput>
        <TextInput  style={styles.inputdetails}>{item?.place}</TextInput>
        <TextInput  style={styles.inputdetails}>{item?.pincode}</TextInput>
        <TextInput  style={styles.inputdetails}>{item?.userPhone}</TextInput>


      </View>

            )})
      }
      

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
