import React from 'react';
import { useSelector } from 'react-redux';
import { TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Colors from '../../assets/colors';
// import EstimateForm from './EstimateForm';
// import Selectelectritian from './Selectelectritian';
// import Select from './Select';
import styless from './Estimate.style';
// import EmptyList from '../../assets/img/empty_list.svg';
// import colors from '../../assets/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetMaterialsQuery, useLazyGetMaterialsQuery } from '../../store/slices/IdentityApiSlice';
import { selectUser } from '../../store/selectors';

const Estimate = () => {
  // const { colors, appColors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();


  const [getMaterialList] = useLazyGetMaterialsQuery();
  const user = useSelector(selectUser);
  const { data: matItems, isLoading, isError } = useGetMaterialsQuery();
  

  const callestimate = () => {
    getMaterialList().then((res)=> console.log(res));
    navigation.navigate('EstimateForm');
  };

  return (
    <View style={[styless.panelButtonContainer]}>
      <View style={styles.background}>
        {/* <View style={styles.landmark}> */}
        <Image style={styles.locicon} source={require('../../assets/img/locationtab.png')} />
        {/* </View> */}
        <TextInput style={styles.input} placeholder="608 301">
          {/* <Image style={styles.icon} source={require('../../assets/img/locationtab.png')}/>  */}
        </TextInput>
        <TouchableOpacity style={styles.pinbtn}>
          <Text style={styles.pintitle}>Location</Text>
        </TouchableOpacity>
      </View>
      {/* {console.log("selectmode",mode)} */}
      {/* <Text style={styles.title}>Electrician</Text> */}
      {user?.userType === 0 ? <Text style={styles.title}>Electrician</Text> : <Text style={styles.title}>Shop</Text>}

      <View
        style={{
          // flex: 0.4,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}></View>

      {user?.userType === 1 ? (
        <TouchableOpacity style={styles.cardcontainer} onPress={() => navigation.navigate('Order')}>
          <View style={styles.LeftContainer}>
            <Image style={styles.iconimg} source={require('../../assets/img/shopcart.png')} />
          </View>
          <View style={styles.RightContainer}>
            <Text style={styles.Righttag}>Latest Order</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.cardcontainer} onPress={() => navigation.navigate('Selectelectritian')}>
          <View style={styles.LeftContainer}>
            <Image style={styles.iconimg} source={require('../../assets/img/electrician.png')} />
          </View>
          <View style={styles.RightContainer}>
            <Text style={styles.Righttag}>Find an Electritian</Text>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.cardcontainer} onPress={() => navigation.navigate('Select')}>
        <View style={styles.LeftContainer}>
          <Image style={styles.iconimg} source={require('../../assets/img/shop.png')} />
        </View>
        <View style={styles.RightContainer}>
          <Text style={styles.Righttag}>Find a Elecrical Shop </Text>
        </View>
      </TouchableOpacity>
      {user?.userType === 1 ? (
        <TouchableOpacity style={styles.cardcontainer} onPress={() => navigation.navigate('Selectelectritian')}>
          <View style={styles.LeftContainer}>
            <Image style={styles.iconimg} source={require('../../assets/img/electrician.png')} />
          </View>
          <View style={styles.RightContainer}>
            <Text style={styles.Righttag}>Find an Electritian</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.cardcontainer} onPress={() => callestimate()}>
          <View style={styles.LeftContainer}>
            <Image style={styles.iconimg} source={require('../../assets/img/estimate.png')} />
          </View>
          <View style={styles.RightContainer}>
            <Text style={styles.Righttag}>Estimate</Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.cardcontainer}>
        <View style={styles.LeftContainer}>
          <Image style={styles.iconimg} source={require('../../assets/img/offer.png')} />
        </View>
        <View style={styles.RightContainer}>
          <Text style={styles.Righttag}>New Offers</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Estimate;
const styles = StyleSheet.create({
  cardcontainer: {
    width: 350,
    height: 100,
    backgroundColor: Colors.backgroundcard,
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  landmark: {
    // backgroundColor: "red",zIndex:1,position:'absolute'
  },

  LeftContainer: {
    // width:70,
    height: 70,
  },
  locicon: {
    zIndex: 1,
    position: 'absolute',
    marginLeft: 10,
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

  RightContainer: {
    width: '80%',
  },
  Righttag: {
    fontSize: 22,
    fontWeight: '400',
  },
  iconimg: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 29,
    fontWeight: '400',
    lineHeight: 35,
    color: Colors.title,
    marginVertical: 10,
  },
  background: {
    // width:'100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    // backgroundColor:'red'
  },
  pintitle: {
    position: 'absolute',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    color: Colors.white,
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
  icon: {
    width: 13,
    height: 18,
    position: 'absolute',
  },
});
