import React, {useEffect, useState} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetPlacesQuery } from '../../store/slices/IdentityApiSlice';
import { selectUserId } from '../../store/selectors';
import { useSelector } from 'react-redux';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';

const arr = [
  {
    id:1,
    txt:"Marathakkara",
    dist:"Thrissur, Kerala",
    pin:"680623"
  },
  {
    id:2,
    txt:"Ollur",
    dist:"Thrissur, Kerala",
    pin:"680613"
  },
  {
    id:3,
    txt:"Thrissur",
    dist:"Thrissur, Kerala",
    pin:"680323"
  },
  {
    id:4,
    txt:"Amballur",
    dist:"Thrissur, Kerala",
    pin:"680203"
  },
  {
    id:5,
    txt:"Thaloor",
    dist:"Thrissur, Kerala",
    pin:"680513"
  },
  {
    id:6,
    txt:"Pudukad 680302",
    dist:"Thrissur, Kerala",
    pin:"680533"
  },
]
const Placeselection = () => {
 const [filterdData, setFilterdData] = useState();
 const [masterdData, setMasterdData] = useState();
 const [searchitem, setSearchitem] = useState();
 const userId = useSelector(selectUserId);
 const [search, setSearch] = useState('');
 const { data: locationdet, isLoading } = useGetPlacesQuery();
 
 //cannot get datas in locationdet


 console.log(locationdet,"locationdet");

 const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

 const searchFilter = (text) => {

  if (text) {
    const newData = masterdData.filter((item) => {
      // const itemData= item.txt ? item.txt.toUpperCase() : "".toUpperCase;
      const itemData= item.txt ? item.txt.toUpperCase() : "".toUpperCase;
const textData = text.toUpperCase();
return itemData.indexOf(textData) > -1;

    });
  setFilterdData(newData);
setSearch(text);
  }
  else {
    setFilterdData(masterdData);
    setSearch(text);
  }
 }

 const selectaction = (item) => {
  navigation.navigate('userform', {item});
 }
 
  // try {
  //   navigation.navigate('userform')
  //   // navigation.goBack();
  //   AsyncStorage.setItem('useradddet',JSON.stringify(item?.pin));
  // } catch (e) {
  // }
//  }
 const ItemView = ({item}) => {
 
  return (
    <TouchableOpacity
    style={{height:60, backgroundColor:'rgba(243, 243, 243, 0.8)', paddingHorizontal:15,
    borderRadius:8, margin:8, display:'flex', flexDirection:'row',justifyContent:'space-between'}}
    onPress={()=>selectaction(item)}>
     
      <View style={{ display:'flex', flexDirection:'column', height:60,
      justifyContent:'center'}}>
      <Text style={{fontSize:16,lineHeight:24,color:"#424242",fontWeight:'500'}}>
      {item?.placeName}
      </Text>
    <Text style={{fontSize:16,lineHeight:24,color:"#424242",fontWeight:'500'}}>
      {item?.district}
    </Text>
    </View>
    <View style={{height:60, display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:16,lineHeight:26,color:"#424242",fontWeight:'500'}}>
      {item?.pincode}
    </Text>
    </View>

    </TouchableOpacity>
    
  )
 }

 const ItemSeparatorView = () => {
  return (
    <View
    />
  )
 }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#fff'}}>
      <View>
        <TextInput 
        style={{ borderWidth:1, margin:8, padding:12, borderRadius:8, borderColor:'#BEBEBE', fontSize:16,
        lineHeight:26,color:"#424242",fontWeight:'500'}}
        value={search}
        placeholder='Search Place or Pincode'
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}/>
        <FlatList
        data={locationdet}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        
        />
   
      </View>
    </SafeAreaView>
  );
};



export default Placeselection;