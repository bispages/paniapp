import React, { useState } from 'react';
import { TextInput, View,StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Text, FAB, useTheme } from 'react-native-paper';
import colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectEstimateState } from '../../store/slices/EstimateStateSlice';
import { addEstimate } from '../../store/slices/EstimateStateSlice';
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

  const materialsdatas = useSelector(selectEstimateState);
  const matypes = materialsdatas.estimateItems.data ? Object.keys(materialsdatas.estimateItems.data) : [];
  const materialinfo = materialsdatas.estimateItems?.data;

  console.log("materialsdatas",materialsdatas);
  console.log("matypes",matypes);
  console.log("materialinfo",materialinfo)
  
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
     style={styles.container}>
    
        {
          matypes.map((item, key) => {
            return (

           
        <View style={styles.itemscontainer} key={key}>
            <Text style={styles.producttag}>{item}</Text>
            <View style={styles.productitems}>
                {
                    materialinfo[item].map((items)=>{
                        return (
                          items.sizes.map((itemss,index)=> {
                            return (

                          <View style={{display:'flex', flexDirection:'row',justifyContent:'center',borderBottomWidth:1.8,borderBottomColor:'#F6F6F6'}}> 
                             <View style={{width:'40%',display:'flex',alignItems:'flex-start'}}>
                           
                             {itemss.count === 0 ?
                                ("")
                              :
                               <Text style={styles.productitemslist}> 
                            {items?.name}
                            </Text>
                          }
                            </View>
                            <View style={{width:'60%',display:'flex',justifyContent:'center'}}>
                           
                                {itemss.count === 0 ?
                                ("")
                              :
                              <View style={{display:'flex', flexDirection:'row',}}>
                                <Text style={styles.productitemslists}>
                            - {itemss?.unit} inch
                            </Text>
                            <Text style={styles.productitemslists}>
                           {itemss?.count} nose
                            </Text>
                            <Text style={styles.productitemslists}>
                           ₹{itemss.price * itemss.count}
                            </Text>
                            </View>
                            }
                            </View>
                            </View>
                           
                              )
                            })
                            
                            
                           
                        )
                    })
                }
               
               
               

            </View>

        </View>
         )
        })
      }
        
    </ScrollView>
   
  );
};

export default Estimate;
const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        flex: 1,
        display:'flex'
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
    fontSize:18,
    lineHeight:20,
    color:'#323232',
    marginVertical:5,
  
  },
  productitemslists:{
    fontSize:18,
    lineHeight:20,
    color:'#323232',
    marginVertical:5,
    marginRight:20


  
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
