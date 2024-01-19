import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';

import colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { useGetEstimateDetQuery } from '../../store/slices/IdentityApiSlice';

type routeParams = {
  route: { params: { estimateId: string; } };
};

const Orderdet = ({ route: { params } }: routeParams) => {
    const navigation = useNavigation();
    const { estimateId } = params;
    const { data: estdet, isLoading } = useGetEstimateDetQuery( estimateId );

    console.log("NNNNNNNNNNNNN",estdet)
  return (
    <View style={styles.ordercontainer}>
      {
        isLoading ?
        (
          <View style={{display:'flex',
          alignItems:'center', hight: '40%'}}>
        <ActivityIndicator size="large" color="#6B7887"/>
        </View>
        )
        :(
          <>
          
        <View style={styles.headbar}>
       
        </View>
        
       
            <View style={styles.shophead}>
                <Text style={styles.shop}>Starlink Electricals</Text>
                <Text style={styles.place}>Thrissur, Ollur</Text>
                <View style={styles.dethead}>
                    <Text style={styles.price}>20-8-2022</Text>
                    <Text style={styles.price}>{estdet?.totalAmount} RS</Text>
                </View>

            </View>
            <Text style={styles.billingaddress}>Billing Address</Text>
            <View style={styles.shophead}>
            <Text style={styles.shop}>{estdet?.customerName}</Text>
                <View style={styles.dethead}>
                <Text style={styles.place}>{estdet?.customerAddress}</Text>
                    <Text style={styles.price}>{estdet?.customerPhone}</Text>
                </View>

            </View>
           

               

            <ScrollView style={styles.containerbox}
            showsVerticalScrollIndicator={false}
            
            >
              <>
               {
              estdet.materials.map((item,index) => {
                return (
                  <>
                
                <Text style={styles.places}>{item?.materialType}</Text>
                <Text style={styles.items}>{index + 1}. {item?.materialName} - {item?.quantity} Nos - Rs {item?.price}</Text>
                
                </>
                )
              })
            }
               </>

            </ScrollView>
          
            </>

)

}
        
       
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
      items:{
        color:'#323232',
        fontSize:17,
        lineHeight:19,
        fontWeight:'500',
        marginVertical:3
      },
      headbar:{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        // marginVertical:15,
        backgroundColor:"#fff",
        width:'100%',
        height:10,
      },
      containerbox:{
        width:'94%',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:5,
        height:'auto',
        // paddingVertical:10
        marginBottom:10
   
      },
      shophead:{
        display:'flex',
       alignContent:'center',
       justifyContent:'center',
       backgroundColor:'#ECECEC',
       width:'94%',
       height:120,
       marginHorizontal:20,
       marginVertical:10,
       borderRadius:5,
       borderWidth:1,
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
        textDecorationLine:'underline',
        alignSelf:'center',
        marginVertical:10
      },
      place:{
        fontSize:17,
        lineHeight:20,
        fontWeight:'500',
        color:"#606060",
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
        color:"#606060",
        alignSelf:'flex-start',
        marginHorizontal:12
      }
      

})
