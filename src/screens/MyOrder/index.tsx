import React from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { useGetMyOrderListQuery } from '../../store/slices/IdentityApiSlice';
import { selectUserId } from '../../store/selectors';
import { useSelector } from 'react-redux';


const info =[
    {
        id:1,
        image:require('../../assets/img/shopimg.png'),
        date:"20-08-2022",
        name:"Startlink Electricals",
        place:"Thrissur,Ollur",
        rate:"1000"
    },
    {
        id:2,
        image:require('../../assets/img/shopimg.png'),
        date:"20-08-2022",
        name:"Space Electricals",
        place:"Thrissur,Ollur",
        rate:"4000"
    },
    {
        id:3,
        image:require('../../assets/img/shopimg.png'),
        date:"20-08-2022",
        name:"Leo Electricals",
        place:"Thrissur,Ollur",

        rate:"20,000"
    },
    {
        id:4,
        image:require('../../assets/img/shopimg.png'),
        date:"20-08-2022",
        name:"John Electricals",
        place:"Thrissur,Ollur",
        rate:"40,000"
    },
]



const Profile = () => {
  const navigation = useNavigation();
  const userId = useSelector(selectUserId);
  const { data: users, isLoading } = useGetMyOrderListQuery({ userId });
  // console.log("WWW",users.estimates)
  return (
    <View style={styles.ordercontainer}>
         <View style={styles.container}>
        {
            users?.estimates?.map((item,i)=>{
                return (
                    <TouchableOpacity style={styles.cardcontainer} key={i} 
                    onPress={()=>navigation.navigate('Orderdet')

                    }>
                    <View style={styles.imagecard}>
                        <Image style={styles.img} source={require('../../assets/img/shopimg.png')}/>
        
                     </View>
                    <View style={styles.carddet}>
                    <Text style={styles.date}>20-08-2022//</Text>
                    <Text style={styles.name}>{item?.estimateName}</Text>
                    <Text style={styles.place}>Thrissur//</Text>
        
                    </View>
                     <View style={styles.contactdet}>
                    <Text style={styles.price}>{item?.totalAmount} Rs</Text>
                    <Image  style={styles.contact} source={require('../../assets/img/phone-call.png')}/>
        
                     </View>
        
                </TouchableOpacity>

                    )

            }
           )
        }
      
      
        
        </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
    ordercontainer:{
        width:'100%',
        height:'auto',
        alignItems:'center',
        justifyContent:'center',
       
    
      },
      container:{
        display:'flex',
        flexDirection:"column",
        marginTop:20,
        
      },
      cardcontainer:{
        width:372,
        minWidth:300,
        height:108,
        borderRadius:4,
        padding:10,
        marginVertical:10,
        backgroundColor:colors.cardbackground,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'

      },
      contactdet:{
        display:'flex',
        flexDirection:'column',
        height:76,
        alignItems:'center',
        justifyContent:'space-between'

      },
      carddet:{
        width:176,
        marginHorizontal:10
      },
      contact:{
        width:34,
        height:34
      },

      imagecard:{
        width:66,
        height:76,
        borderRadius:2
      },
      img:{
        width:66,
        height:76,
        borderRadius:2
      },
      date:{
        fontSize:15,
        lineHeight:18,
        color:colors.shopname,
        fontWeight:'400',
        fontFamily:'Gotham Rounded'
      },
      name:{
        fontSize:15,
        lineHeight:18,
        color:colors.shopdate,
        fontWeight:'400',
        marginVertical:7,
        fontFamily:'Gotham Rounded'
      },

      place:{
        fontSize:15,
        fontFamily:'Gotham Rounded',
        lineHeight:18,
        color:'rgba(74,74,74,0.9)',
        fontWeight:'400'

      },
      price:{
        fontSize:16,
        lineHeight:19,
        letterSpacing:-0.01,
        color:colors.price
      },

 


})
