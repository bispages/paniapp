import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const product = [
  {
    id: 1,
    producttit: 'insulation Type 3 Nos',
  },
  {
    id: 2,
    producttit: 'Tie Type Pipe 6 Nos',
  },
  {
    id: 3,
    producttit: 'insulation Type 3 Nos',
  },
  {
    id: 4,
    producttit: 'insulation Type 2 Nos',
  },
  {
    id: 5,
    producttit: 'Tie Type Pipe 4 Nos',
  },
  {
    id: 6,
    producttit: 'insulation Type 3 Nos',
  },
];

const OrderDet = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    
    <View style={styles.container}>
      {/* <View style={styles.ordercontainer}> */}
        
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/img/backarrow.png')} style={styles.imgcontainer} />
        </TouchableOpacity>
        <Text style={styles.orderdiv}>Order Details</Text>
        <TouchableOpacity>
          <Image source={require('../../assets/img/print.png')} style={styles.imgcontainer} />
        </TouchableOpacity> */}
      {/* </View> */}
      <View style={styles.topcontainer}>
        <View style={styles.card}>
          <View style={styles.carddet}>
            <Text style={styles.name}>Leo Johnson</Text>
            <Text style={styles.place}>Thrissur, Ollur</Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../../assets/img/phone-call.png')} style={styles.phonecontainer} />
          </TouchableOpacity>
        </View>
        <Text style={styles.place}>Billing address (customer)</Text>
        <View style={styles.card}>
          <View style={styles.carddet}>
            <Text style={styles.name}>Alphe Benny</Text>
            <Text style={styles.place}>Ollur center,Thrissur</Text>
          </View>
          <Text style={styles.place}>8596783251</Text>
        </View>
      </View>
      <ScrollView style={styles.bottomcontainer} showsVerticalScrollIndicator={false}>
        <View style={styles.productcard}>
          <Text style={styles.headbar}>UPVC</Text>
        </View>
        <View style={styles.columncontainer}>
          {product.map((item, index) => {
            return (
              <View style={styles.rowcontainer} key={index}>
                <View style={styles.number}>
                  <Text style={styles.producttxt}>{index + 1}</Text>
                </View>
                <View style={styles.producttype}>
                  <Text style={styles.producttxt}>{item?.producttit}</Text>
                </View>
                <View style={styles.productimg}>
                  <Image source={require('../../assets/img/lbow.png')} style={styles.productcontainer} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    
    backgroundColor:'#fff'
  },
  topcontainer: {
    flex: 0.49,
    flexDirection: 'column',
    backgroundColor: '#F9F7F7',
    justifyContent:'center'
    // backgroundColor: 'red',

  },
  ordercontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    backgroundColor:'#fff'
  },
  bottomcontainer: {
    flex: 0.65,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  phonecontainer: {
    width: 35,
    height: 35,
    marginHorizontal: 5,
  },
  card: {
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'space-between',
    height: 80,
    borderRadius: 4,
    backgroundColor:'rgba(217, 217, 217, 0.4)',
    marginVertical: 5,
  },
  carddet: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  billing: {
    fontSize: 14,
    lineHeight: 18.2,
    color: '#606060',
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  det: {
    fontSize: 14,
    color: '2F2F2F',
    fontWeight: '400',
    lineHeight: 19.2,
    marginHorizontal: 8,
  },
  productcontainer: {
    width: 30,
    height: 30,
    marginVertical: 4,
  },
  place: {
    fontSize: 17,
    lineHeight: 20.4,
    color: '#5A5A5A',
    fontWeight: '400',
    marginHorizontal: 8,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
    color: 'black',
    fontWeight: '500',
    marginHorizontal: 8,
  },
  orderdiv: {
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 8,
    color: '#455A64',
    lineHeight: 36,
  },
  headbar: {
    fontSize: 24,
    marginVertical: 15,
    fontWeight: '500',
    color: '#535454',
    textDecorationLine: 'underline',
  },
  productcard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  columncontainer: {
    flexDirection: 'column',
  },
  rowcontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9F7F7',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  producttxt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#323232',
    marginVertical: 8,
  },
  number: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  producttype: {
    width: '70%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor:'blue'
  },
  productimg: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  imgcontainer: {
    width: 45,
    height: 45,
  },
});
