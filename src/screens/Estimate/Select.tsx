import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from '../../assets/colors';
import { useSelector } from 'react-redux';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetNearUsersQuery, useGetFavUsersQuery } from '../../store/slices/IdentityApiSlice';
import { useGetUsersQuery } from '../../store/slices/IdentityApiSlice';
import { selectUserId } from '../../store/selectors';
// import { useGetUsersQuery } from '../../store/slices/IdentityApiSlice';
const data = [
  {
    id: 1,
    title: 'Kings Elecrricals',
    tag: 'Rice bazar, Thrissur',
  },
  {
    id: 2,
    title: 'CT Electricals ',
    tag: 'Junction, Marathakkara',
  },
  {
    id: 3,
    title: "Poppy's Elctricals",
    tag: 'Main road, Ollur',
  },
  {
    id: 1,
    title: 'Kings Elecrricals',
    tag: 'Rice bazar, Thrissur',
  },
  {
    id: 2,
    title: 'CT Electricals ',
    tag: 'Junction, Marathakkara',
  },
  {
    id: 3,
    title: "Poppy's Elctricals",
    tag: 'Main road, Ollur',
  },
];

const datas = [
  {
    id: 1,
    title: 'Starlink Electricals',
    tag: 'Rice bazar, Thrissur',
  },
  {
    id: 2,
    title: 'Space Electricals ',
    tag: 'Junction, Marathakkara',
  },
  {
    id: 1,
    title: 'Kings Elecrricals',
    tag: 'Rice bazar, Thrissur',
  },
  {
    id: 2,
    title: 'CT Electricals ',
    tag: 'Junction, Marathakkara',
  },
  {
    id: 3,
    title: "Poppy's Elctricals",
    tag: 'Main road, Ollur',
  },
];

const Select = () => {
  const [toggleState, setToggleState] = useState(true);
  const userId = useSelector(selectUserId);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { data: nearusers } = useGetNearUsersQuery(userId);
  const { data: favusers } = useGetFavUsersQuery(userId);
  console.log(nearusers, 'Nearusers');
  console.log(favusers, 'Favusers');

  const toggleTab = () => {
    setToggleState(false);
  };
  const toggleTabs = () => {
    setToggleState(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image style={styles.locicon} source={require('../../assets/img/locationtab.png')} />
        <TextInput style={styles.input} placeholder="608 301"></TextInput>
        <TouchableOpacity style={styles.pinbtn}>
          <Text style={styles.pintitle}>Location</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.arrow} source={require('../../assets/img/Group63.png')} />
        </TouchableOpacity>
        <Text style={styles.head}>Find Electrical Shops</Text>
      </View>

      <View style={styles.toggle}>
        {toggleState === true ? (
          <>
            <TouchableOpacity style={styles.tab} onPress={() => toggleTab()}>
              <Image source={require('../../assets/img/star.png')} style={styles.toggleicon} />
              <Text style={styles.toggletxt}>Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabs} onPress={() => toggleTabs()}>
              <Image source={require('../../assets/img/location.png')} style={styles.toggleicon} />
              <Text style={styles.toggletxt}>Near Me</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.tabs} onPress={() => toggleTab()}>
              <Image source={require('../../assets/img/star.png')} style={styles.toggleicon} />
              <Text style={styles.toggletxt}>Favouristes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => toggleTabs()}>
              <Image source={require('../../assets/img/location.png')} style={styles.toggleicon} />
              <Text style={styles.toggletxt}>Near Me</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {toggleState === false ? (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.filter}>
          {favusers?.map(item => {
            return (
              <>
                {item?.userType === 0 ? (
                  <View style={styles.favbardiv}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: Colors.name }}>There is no favouristes</Text>
                  </View>
                ) : (
                  <View style={styles.card}>
                    <Image source={require('../../assets/img/shopimg.png')} style={styles.shopimg} />
                    <View style={styles.subcard}>
                      <Text style={styles.name}>{item?.userName}</Text>

                      <View style={styles.detcard}>
                        <Image source={require('../../assets/img/star.png')} style={styles.favicon} />
                        <Text style={styles.det}>{item?.place}</Text>
                      </View>
                    </View>
                    <View style={styles.call}>
                      <Image source={require('../../assets/img/phone-call.png')} style={styles.callicon} />
                    </View>
                  </View>
                )}
              </>
            );
          })}
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.filter}>
          {nearusers?.map(item => {
            return (
              <>
                {item?.userType === 0 ? (
                  <>
                   <View style={styles.favbardiv}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: Colors.name }}>There is no near Shops</Text>
                  </View>
                    
                    
                  </>
                ) : (
                  <View style={styles.card}>
                    <Image source={require('../../assets/img/shopimg.png')} style={styles.shopimg} />
                    <View style={styles.subcard}>
                      <Text style={styles.name}>{item?.userName}</Text>

                      <View style={styles.detcard}>
                        <Image source={require('../../assets/img/Vector.png')} style={styles.favicon} />
                        <Text style={styles.det}>{item?.place}</Text>
                      </View>
                    </View>
                    <View style={styles.call}>
                      <Image source={require('../../assets/img/phone-call.png')} style={styles.callicon} />
                    </View>
                  </View>
                )}
              </>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
export default Select;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
  },
  headbar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  filter: {
    display: 'flex',
    flexDirection: 'column',
  },
  favbardiv: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
  },
  subcard: {
    display: 'flex',
    width: '56%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  detcard: {
    display: 'flex',
    flexDirection: 'row',
  },
  callicon: {
    width: 34,
    height: 34,
    marginRight: 3,
    marginVertical: 5,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 110,
    borderRadius: 8,
    backgroundColor: Colors.backgroundcard,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  toggle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  call: {
    height: 110,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  toggletxt: {
    fontSize: 19,
    fontWeight: '400',
    lineHeight: 22,
    color: Colors.name,
  },
  toggleicon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
  tab: {
    width: '47%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundcard,
  },
  tabs: {
    width: '47%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundcard,
    borderWidth: 2,
    borderColor: '#6B7887',
  },
  background: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 42,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 27,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 27,
    backgroundColor: Colors.backgroundcard,
    paddingHorizontal: 5,
    zIndex: -1,
    paddingLeft: 30,
  },
  locicon: {
    zIndex: 1,
    position: 'absolute',
    marginLeft: 10,
  },
  arrow: {
    width: 25,
    height: 25,
    marginRight: 40,
  },
  pinbtn: {
    width: 147,
    height: 42,
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.btncolor,
    backgroundColor: Colors.btncolor,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
  pintitle: {
    position: 'absolute',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    color: Colors.white,
  },
  head: {
    fontSize: 27,
    fontWeight: '400',
    lineHeight: 32,
    alignItems: 'center',
    color: Colors.title,
  },
  shopimg: {
    width: 90,
    height: 90,
    marginHorizontal: 10,
  },
  favicon: {
    width: 16,
    height: 16.5,
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '400',
    color: '#515151',
    marginVertical: 8,
  },
  det: {
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: '400',
    color: '#8B8B8B',
    marginHorizontal: 10,
  },
});
