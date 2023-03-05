import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from '../../assets/colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const Promotions = () => {
  const [toggleState, setToggleState] = useState(true);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <View style={styles.headbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.arrow} source={require('../../assets/img/backarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.head}>Promotions</Text>
      </View>
      <View style={styles.promohead}>
        <Image source={require('../../assets/img/whatsapp2.png')} />
      </View>

      <View style={styles.filter}>
        <Text style={styles.us}> Connect us</Text>
        <Text style={styles.letstag}>
          Lets connect through whatsapp, our promotional product exports work with you to grow and develop your brand.
        </Text>

        <TouchableOpacity style={styles.connect}>
          <Image source={require('../../assets/img/wts.png')} />
          <Text style={styles.pro}>Promote Bussiness</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Promotions;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  us: {
    fontSize: 26,
    lineHeight: 29,
    color: '#454545',
    fontWeight: '600',
  },
  letstag: {
    fontSize: 17,
    lineHeight: 26,
    color: '#454545',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  connect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: 250,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#6B7887',
    marginVertical: 20,
  },
  pro: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  headbar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 30,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  promohead: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },

  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 110,
    borderRadius: 8,
    backgroundColor: '#D2D8DB',
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
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
    width: 352,
    height: 42,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 27,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 27,
    backgroundColor: Colors.backgroundcard,
    paddingHorizontal: 5,
  },
  arrow: {
    width: 40,
    height: 40,
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
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 36,
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
    marginHorizontal: 9,
  },
  det: {
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: '400',
    color: '#8B8B8B',
    marginHorizontal: 10,
  },
  newdiv: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#FF6565',
    marginTop: -10,
    marginRight: -10,
  },
  viewtxt: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
