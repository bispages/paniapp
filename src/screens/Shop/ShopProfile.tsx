import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import styless from '../Profile/Profile.style';
import { StackNavigationProp } from '@react-navigation/stack';

const ShopProfile = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <View style={styless.container}>
      <View style={styles.headcontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/img/backarrow.png')} style={styles.imgback} />
        </TouchableOpacity>
        <Text style={styles.profiletxt}>Shop Profile</Text>
      </View>
      <View style={styles.profilecontainer}>
        <View style={styles.profile}></View>
        <Text style={styles.profiletag}>Add Profile Picture</Text>
      </View>
      <View style={styles.details}>
        <TextInput style={styles.inputdetails} placeholder="Enter Name"></TextInput>
        <TextInput style={styles.inputdetails} placeholder="Pin code"></TextInput>
        <TextInput style={styles.inputdetails} placeholder="Place"></TextInput>
        <TextInput style={styles.inputdetails} placeholder="Phone"></TextInput>
      </View>

      <View style={styles.savebtn}>
        <TouchableOpacity style={styles.save}>
          <Text style={styles.savetxt}> Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShopProfile;
const styles = StyleSheet.create({
  profilecontainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profiletxt: {
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 36,
    color: colors.title,
    marginHorizontal: 30,
  },
  imgback: {
    width: 45,
    height: 45,
    marginHorizontal: 20,
  },
  profile: {
    width: 140,
    height: 140,
    borderWidth: 3.5,
    marginTop: 20,
    borderColor: colors.profileborder,
    borderRadius: 10,
  },
  profiletag: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: -0.2,
    color: 'rgba(0,0,0,0.7)',
    marginVertical: 20,
  },
  headcontainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
    // backgroundColor:'red'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputdetails: {
    width: 319,
    height: 50,
    borderWidth: 2,
    borderColor: colors.inputborder,
    borderRadius: 7,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  savebtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  save: {
    width: 109,
    height: 60,
    color: colors.white,
    borderRadius: 30,
    backgroundColor: colors.btncolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savetxt: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '400',
    fontFamily: 'Gotham Rounded',
  },
});
