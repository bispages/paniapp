import React, { useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { MaterialType } from '../../types';
// import { materialTypesList } from '../../utils/materialTypesList';
import styles from './Estimate.style';
import colorss from '../../assets/colors';
import colors from '../../assets/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetMaterialsQuery } from '../../store/slices/IdentityApiSlice';
import { selectMaterials } from '../../store/selectors/apiSelectors';
import { useSelector} from 'react-redux';


const MaterialTypes = () => {
  const { dark, colors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [vist, setVisit] = useState(false);

  const materials = useSelector(selectMaterials);
  console.log('userestimate123', materials);

  // const { data: matItems, isFetching, isError } = useGetMaterialsQuery();

  // if (isFetching) {
  //   return null;
  // }

  // console.log(matItems, 'matItems123456');

  const matypes = Object.keys(materials.data);

  console.log(matypes,"WWWmatItems123456");
  const changestate = () => {
    setVisit(!vist);
    // navigation.navigate("ChooseShop")
    navigation.navigate('FinalEstimate');
  };
  // const movetocart = () => {
  //   navigation.navigate('Cart');
  // };

  const moveToMaterialItemSelect = (type: matypes) => {
    setTimeout(() => {
      navigation.navigate('MaterialItems', { type });
    }, 20);
  };

  // Function to render material Types List.
  const renderMaterialTypesList = (item: matypes) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => moveToMaterialItemSelect(item)}
        style={[styles.block, { backgroundColor: colorss.materialbackground }]}
        android_ripple={{ color: colors.background, radius: 200 }}>
        <Text style={styless.txt} theme={{ colors: { text: colorss.background } }}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        {matypes ? (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.listContainer}>{matypes.map(renderMaterialTypesList)}</View>
              {/* <Text>{matypes[0]}</Text> */}
            </ScrollView>
          </View>
        ) : null}
      </View>
      <View style={styless.btncontainer}>
        <TouchableOpacity style={styless.btn}>
          <Text>Reset Estimate</Text>
        </TouchableOpacity>
      </View>
      <View style={styless.carts}>
        {vist === true ? (
          <View style={styless.cart}>
            <Image source={require('../../assets/img/empty-cart1.png')} style={styless.cartimg} />
            <Text style={styless.carttag}>Your cart is empty</Text>
          </View>
        ) : null}
      </View>
      <View style={styless.btncontainers}>
        <TouchableOpacity style={styless.btns} onPress={changestate}>
          <Text style={styless.btntxt}>Generate Estimate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MaterialTypes;
const styless = StyleSheet.create({
  headContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  headscontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 15,
    borderBottomWidth: 2,
    marginBottom: 10,
    borderBottomColor: colorss.borderColor,
    // backgroundColor:'red',
  },
  backimg: {
    width: 45,
    height: 45,
    marginLeft: 20,
  },

  headtxt: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '600',
    color: '#515253',
    marginHorizontal: 40,
  },
  heading: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '400',
    color: colors.Estimate,
    marginVertical: 5,
  },
  name: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '400',
    color: colors.name,
  },
  txt: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: 0.07,
    color: '#5A6066',
  },
  cartimage: {
    width: 56,
    height: 54,
  },
  btncontainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    marginRight: '27%',
    marginTop: 20,
  },
  btncontainers: {
    width: '100%',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 30,
  },
  btn: {
    width: 140,
    height: 42,
    borderRadius: 43,
    borderWidth: 1,
    borderColor: '#6B7887',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    backgroundColor: colors.white,
  },
  btns: {
    width: 250,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    color: colors.white,
    backgroundColor: colors.btncolor,
  },
  btntxt: {
    fontSize: 22,
    color: colors.white,
    lineHeight: 26,
    fontWeight: '400',
  },
  cart: {
    width: '80%',
    backgroundColor: 'rgba(233, 233, 233, 0.7)',
    height: 110,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#D5D5D5',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carts: {
    width: '100%',

    height: 130,
    borderRadius: 16,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartimg: {
    width: 60,
    height: 60,
  },
  carttag: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
    marginVertical: 6,
    color: 'rgba(59, 59, 59, 0.9)',
  },
});
