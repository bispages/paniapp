import React, { useState } from 'react';
import { TextInput, View,StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text, FAB, useTheme } from 'react-native-paper';
import colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';

const data =[   
    {
      id:1,
      title:'Insulation tape - 3 nose',
      
    },
    {
      id:2,
      title:'Insulation tape - 3 nose ',
      
    },
    {
      id:3,
      title:"Insulation tape - 3 nose",
     
    },
    {
        id:4,
        title:"Insulation tape - 3 nose",
        
    },
    {
        id:5,
        title:'Insulation tape - 3 nose ',
        
      },
      {
        id:6,
        title:'Insulation tape - 3 nose ',
        
      },
      {
        id:7,
        title:"Insulation tape - 3 nose",
       
      },
      {
          id:8,
          title:"Insulation tape - 3 nose",
          
      },
      
     
  ]

const Estimate = () => {
  const navigation = useNavigation();
  
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
     style={styles.container}>
        {/* <View style={styles.headcontainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image source={require('../../assets/img/backarrow.png')} style={styles.back}></Image>
            </TouchableOpacity>
            <Text style={styles.headtag}>Cart View</Text>
        </View> */}
        
        <View style={styles.itemscontainer}>
            <Text style={styles.producttag}>UPVC</Text>
            <View style={styles.productitems}>
                {
                    data.map((item)=>{
                        return (
                            <Text style={styles.productitemslist}>
                            {item?.title}
                            </Text>
                        )
                    })
                }
               

            </View>

            <Text style={styles.producttag}>PVC</Text>
            <View style={styles.productitems}>
                {
                    data.map((item)=>{
                        return (
                            <Text style={styles.productitemslist}>
                            {item?.title}
                            </Text>
                        )
                    })
                }
            </View>
        </View>
        
    </ScrollView>
   
  );
};

export default Estimate;
const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
    },

    headcontainer: {
    flex: 0.1,
    height:70,
    width: '100%',
    flexDirection:'row',
    alignItems:"center",
    justifyContent: 'flex-start',
    backgroundColor:colors.cardbackground,
    
  },
  headcontainers: {
    flex: 0.1,
    height:70,
    width: '100%',
    flexDirection:'row',
    alignItems:"center",
    justifyContent: 'space-between',
    backgroundColor:colors.cardbackground,
    paddingHorizontal:20,
    bottom:0
    
  },
  itemscontainer: {
    flex: 1,
    width: '100%',
    backgroundColor:colors.white,
    paddingHorizontal:25,
    overflow:'scroll'
    
  },
  back:{
    width:46,
    height:46,
    marginHorizontal:20
  },
  headtag:{
    fontSize:30,
    color:"#455A64",
    fontWeight:"bold",
    marginLeft:50
  },
  producttag:{
    fontSize:24,
    color:"#535454",
    lineHeight:29,
    textDecorationLine:'underline',
    marginVertical:20
  },
  productitems:{
    flexDirection:'column'
  },
  productitemslist:{
    fontSize:16,
    lineHeight:19,
    color:'#323232',
    marginVertical:5
  },
  price:{
    color:'#434242',
    fontSize:24,
    lineHeight:24,
    fontWeight:'bold'
  },
  pricetag:{
    color:'#434242',
    fontSize:20,
    lineHeight:24,
    fontWeight:'600'
  }

})
