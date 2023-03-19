import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setIsOnBoarded } from '../../store/slices/AppStateSlice';
import { selectIsOnBoarded } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';

const Accept = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const dispatch = useDispatch();

    const onDone = () => {
        // User finished the introduction. Save this and show login.
        dispatch(setIsOnBoarded(true));
        AsyncStorage.setItem('onboarded', '1').then(() => {
          navigateToLogin();
        });
      };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        Do you want to make your phone number available to public?
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'rgba(38, 44, 50, 0.06)',
          paddingHorizontal:20,
          paddingVertical:10
        }}>
          <View
          style={{
            width:'20%',
           
          }}>
             <Text
          style={{
            fontSize: 18,
            lineHeight: 26,
            color: '#262C32',
            fontWeight: '600',
            marginHorizontal: 5,
          }}>
          Note :
        </Text>
          </View>

          <View
          style={{
            width:'80%',
           
          }}>
            <Text style={styles.language}> If you click yes, you get calls from your locality for electrical
          repair works.</Text>
          </View>
   
      </View>
      <TouchableOpacity style={{width:'80%'}} onPress={onDone}>
      <View style={{ borderWidth:2.5, borderRadius:8, borderColor:'#6B7887',alignItems:'center',justifyContent:'center', marginVertical:20}}>
          <Text style={styles.sectionTitle}>Yes</Text>
          <Text style={styles.sectionTitletag}>I am an electrician or shop owner</Text>

          </View>
          </TouchableOpacity>
          <TouchableOpacity  style={{width:'80%'}} onPress={onDone}>
          <View style={{borderWidth:2.5, borderRadius:8, borderColor:'#6B7887',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.sectionTitle}>No</Text>
          <Text style={styles.sectionTitletag}>I am an user</Text>

          </View>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff',
    flex:1
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#262C32',
    marginVertical: 30,
    lineHeight: 34,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  languageContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  language: {
    fontSize: 18,
    fontWeight: '500',
    color: '#262C32',
    lineHeight: 28,
    textAlign: 'left',
  },
  sectionTitletag:{
    fontSize:22,
    lineHeight:22,
    fontWeight:'500',
    color:'#4A4A4A',
    marginHorizontal:10,
    textAlign:'center',
    marginBottom:10
  }
});

export default Accept;
