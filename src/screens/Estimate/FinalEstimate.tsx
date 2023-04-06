import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import colors from '../../assets/colors/index';

const arr = [
  {
    id:1,
    txt:"1. insulation Tape - Rs 332 - 3 Nos"
  },
  {
    id:2,
    txt:"2. insulation Tape - Rs 20- 3 Nos"
  },
  {
    id:3,
    txt:"3. insulation Tape - Rs 203- 3 Nos"
  },
  {
    id:4,
    txt:"4. insulation Tape - Rs 10- 3 Nos"
  },
  {
    id:5,
    txt:"5. insulation Tape - Rs 55- 3 Nos"
  },
  {
    id:6,
    txt:"6. insulation Tape - Rs 67- 3 Nos"
  },
]
const FinalEstimate = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
      display:'flex',
      flex:1,
      flexDirection:'column',
      borderTopWidth:2,
      borderTopColor:'rgba(216, 214, 214, 0.8)'
      
      
    }}>
     <View
     style={{
      flex:.9,
      width:'100%',
      paddingHorizontal:10
      
      }}>
      <Text
      style={{
        fontSize:20,
        lineHeight:24,
        fontWeight:'600',
        color:'#535454',
        marginVertical:10
      }}
      >Customer Details</Text>
      <View 
          style={{
            width:"100%",
            height:90,
            marginVertical:10,
            borderRadius:5,
            backgroundColor:'rgba(217, 217, 217, 0.4)',
            justifyContent:'space-between',
            alignSelf:'center',
            display:'flex',
            flexDirection:'row'
          }}>
            <View style={{
               justifyContent:'center',
               alignSelf:'center',
               display:'flex',
               flexDirection:'column',
               marginHorizontal:10
            }}>
            <Text style={{fontSize:17, fontWeight:'500',color:'#535454', lineHeight:20,marginVertical:5}}>Alphy Benny</Text>
            <Text style={{fontSize:17, fontWeight:'500',color:'#535454', lineHeight:20,marginVertical:5}}>Ollur center</Text>

            </View>
            <View style={{
               justifyContent:'center',
               alignSelf:'center',
               display:'flex',
               flexDirection:'column',
               marginHorizontal:10
            }}>
             <Text style={{fontSize:17, fontWeight:'500',color:'#535454', lineHeight:20,marginVertical:5}}>10-8-2022</Text>
             <Text style={{fontSize:17, fontWeight:'500',color:'#535454', lineHeight:20,marginVertical:5}}>89437 93274</Text>

            </View>
            

          </View>
          <Text
          style={{
            fontSize:22,
            lineHeight:24,
            fontWeight:'600',
            color:'#535454',
            marginVertical:10,
            alignSelf:'center'
          }}
          >Material Items</Text>
          <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{
            width:"100%",
            height:'auto',
            display:'flex',
            flexDirection:'column',
            borderWidth:1,
            marginVertical:10,
            borderRadius:5,
            paddingHorizontal:20,
            borderColor:'rgba(166, 166, 166, 0.8)',
           
          }}>
            <Text
          style={{
            fontSize:22,
            lineHeight:24,
            fontWeight:'600',
            color:'#535454',
            marginVertical:10,
            textDecorationLine:'underline',
            alignSelf:'center'
          }}
          >UPVC</Text>
            <>
            {
              arr.map((item,i)=>{
                return (
                  <Text
          style={{
            fontSize:17,
            lineHeight:20,
            fontWeight:'500',
            color:'#535454',
            marginVertical:5
          }}>
            {item?.txt}
          </Text>

                )
              })
            }</>
            <Text
          style={{
            fontSize:22,
            lineHeight:24,
            fontWeight:'600',
            color:'#535454',
            marginVertical:10,
            textDecorationLine:'underline',
            alignSelf:'center'
          }}
          >PVC</Text>

<>
            {
              arr.map((item,i)=>{
                return (
                  <Text
          style={{
            fontSize:17,
            lineHeight:20,
            fontWeight:'500',
            color:'#535454',
            marginVertical:5
          }}>
            {item?.txt}
          </Text>

                )
              })
            }</>

          </ScrollView>
         
          </View>
          <View
          style={{
            flex:.2,
            width:"100%",
            
            justifyContent:'center',
            alignSelf:'center',
           
          }}>
             <View
          style={{
            height:50,
            width:"100%",
            backgroundColor:'rgba(217, 217, 217, 0.4)',
            justifyContent:'space-between',
            alignItems:'center',
            display:'flex',
            flexDirection:'row',
            paddingHorizontal:25
          }}>
              <Text
          style={{
            fontSize:21,
            lineHeight:24,
            fontWeight:'500',
            color:'#535454',
            marginVertical:10
          }}
          >Total Amount</Text>
             <Text
          style={{
            fontSize:24,
            lineHeight:24,
            fontWeight:'600',
            color:'#535454',
            marginVertical:10
          }}
          >1036 rs</Text>

          </View>
            <TouchableOpacity
            style={{
              width:170,
              height:50,
              alignItems:'center',
              justifyContent:'center',
              borderRadius:20,
              alignSelf:'center',
              backgroundColor:colors.btncolor,
              marginVertical:10
            }}
            onPress={()=>navigation.navigate("ChooseShop")}>
              <Text
               style={{
                fontSize:20,
                fontWeight:'500',
                color:'#fff',
              }}
              >Place Order</Text>
            </TouchableOpacity>
          </View>
      

    </ScrollView>
  );
};



export default FinalEstimate;
