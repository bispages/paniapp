import React from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';

import colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';


const Orderdet = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.ordercontainer}>
        <View style={styles.headbar}>
        <Text style={styles.head}>Order Details</Text>
        </View>
       
            <View style={styles.shophead}>
                <Text style={styles.shop}>Starlink Electricals</Text>
                <Text style={styles.place}>Thrissur, Ollur</Text>
                <View style={styles.dethead}>
                    <Text style={styles.price}>20-8-2022</Text>
                    <Text style={styles.price}>10,000 RS</Text>
                </View>

            </View>
            <Text style={styles.billingaddress}>Billing Address</Text>
            <View style={styles.shophead}>
            <Text style={styles.shop}>Alphy Benny</Text>
                <View style={styles.dethead}>
                <Text style={styles.place}>Alphy Benny</Text>
                    <Text style={styles.price}>8943793274</Text>
                </View>

            </View>

            <View style={styles.containerbox}>
                <Text style={styles.places}>UPVC</Text>
                <Text>1. Insulation Tape - 3 Nos - Rs 30</Text>
                <Text style={styles.places}>UPVC</Text>
                <Text >1. Insulation Tape - 3 Nos - Rs 30</Text>
                <Text style={styles.places}>PPR</Text>
                <Text>1. Insulation Tape - 3 Nos - Rs 30</Text>
               

            </View>

        
       
     </View>
  );
};

export default Orderdet;
const styles = StyleSheet.create({
    ordercontainer:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        // justifyContent:'center',
        backgroundColor:colors.backgroundcard
       
    
      },
      head:{
        fontSize:22,
        fontWeight:'600',
        color:colors.dark,
       
        
      },
      headbar:{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        // marginVertical:15,
        backgroundColor:"#fff",
        width:'100%',
        height:60,
      },
      containerbox:{
        width:'98%',
        borderWidth:1,
        borderRadius:5
   
      },
      shophead:{
        display:'flex',
       alignContent:'center',
       justifyContent:'center',
       backgroundColor:'#E7E7E7',
       width:'97%',
       height:120,
       marginHorizontal:20,
       marginVertical:10,
       borderRadius:5,
       paddingHorizontal:8
      },
      dethead:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center'
        
      },
      shop:{
        fontSize:20,
        lineHeight:24,
        fontWeight:'600',
        color:"#2F2F2F"

      },
      places:{
        fontSize:20,
        lineHeight:24,
        fontWeight:'600',
        color:"#2F2F2F",
        textDecorationLine:'underline'
      },
      place:{
        fontSize:17,
        lineHeight:20,
        fontWeight:'500',
        color:"rgba(74,74,74,0.9)",
        marginVertical:7

      },
      price:{
        fontSize:18,
        lineHeight:20,
        fontWeight:'500',
        color:"#393939"

      },
      billingaddress:{
        fontSize:18,
        lineHeight:20,
        fontWeight:'500',
        color:"#393939",
        alignSelf:'flex-start',
        marginHorizontal:6
      }
      

})
