import React, { useState } from "react";
import { View,StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from "../../assets/colors";
import { useNavigation } from '@react-navigation/native';

const data =[   
    {
      id:1,
      title:'Leo Johnson',
      tag: 'Thrissur, Ollur',
      date:'20-8-2022',
    },
    {
      id:2,
      title:'Leo Johnson',
      tag: 'Thrissur, Ollur',
      date:'20-8-2022',
    },
    {
      id:3,
      title:'Leo Johnson',
      tag: 'Thrissur, Ollur',
      date:'20-8-2022',
    },
    
    {
      id:4,
      title:'Leo Johnson',
      tag: 'Thrissur, Ollur',
      date:'20-8-2022',
    },
    {
      id:5,
      title:'Leo Johnson',
      tag: 'Thrissur, Ollur',
      date:'20-8-2022',
    },
   
    
  ]

const Order =()=> {
    const [toggleState, setToggleState] = useState(true);
    const navigation = useNavigation();

//     const toggleTab = () => {
//       setToggleState(false);
      
//   }
  const toggleTabs = () => {
    
    navigation.navigate('OrderDet')
    
}
  
    return (
        <View style={styles.container}>
      
      <View style={styles.headbar}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image style={styles.arrow} source={require('../../assets/img/Group63.png')}
        /></TouchableOpacity>
      <Text style={styles.head}>Order Received</Text>
      </View>

     
      
        <ScrollView
        showsVerticalScrollIndicator={false} style={styles.filter}>
        {
            data.map((item, i)=>{
                return (
                    <TouchableOpacity style={styles.card} index={i}
                    onPress={()=>toggleTabs()}
                    >
                    <Image  source={require('../../assets/img/Ellipse10.png')} style={styles.shopimg}/>
                    <View style={styles.subcard}>
                    <Text style={styles.det}>{item?.date}</Text>
                        <Text style={styles.name}>{item?.title}</Text>
                        
                   
                    <View style={styles.detcard}>
                        
                        <Text style={styles.det}>{item?.tag}</Text>
                    </View>
                    </View>
                    <View style={styles.call}>
                        <View style={styles.newdiv}>
                            <Text style={styles.viewtxt}>New</Text>
                        </View>
                    <Image  source={require('../../assets/img/phone-call.png')} style={styles.callicon}/>
        
                    </View>
        
                </TouchableOpacity>

                )
            })
        }
       

      </ScrollView>
     

            

        </View>
    )
}
export default Order;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
        
    },
    headbar:{
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        marginVertical:20,
        display:"flex",
        flexDirection:'row',
        marginHorizontal:8
    },
    filter:{
        display:'flex',
        flexDirection:'column',
        backgroundColor:Colors.backgroundcard,
        paddingHorizontal:8,
    },
    subcard:{
        display:'flex',
        width:'56%',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start'
    },
    detcard:{
        display:'flex',
        // flexDirection:'row',
        textAlign:'flex-start'
    },
    callicon:{
        width:34,
        height:34,
        marginHorizontal:10,
        marginVertical:5
    },
    card:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        height:110,
        borderRadius:8,
        backgroundColor:'#D2D8DB',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:10
    },
    toggle:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        marginBottom:10
    },
    call:{
        height:110,
        display:"flex",
        flexDirection:'column',
        alignItems:"center",
        justifyContent:"space-between",
        
    },
    toggletxt:{
        fontSize:19,
        fontWeight:'400',
        lineHeight:22,
        color:Colors.name

    },
    toggleicon:{
        width:25,
        height:25,
        marginHorizontal:10
    },
    tab:{
        width:'47%',
        height:50,
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:Colors.backgroundcard,

    },
    tabs:{
        width:'47%',
        height:50,
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:Colors.backgroundcard,
        borderWidth:2,
        borderColor:"#6B7887"

    },
    background:{
        width:'100%',
        height:'auto',
        display:'flex',
        flexDirection:'row',
        overflow:"hidden",
        alignItems:"center",
        justifyContent:'space-between',
        marginTop:10,
        marginBottom:20
      },
      input:{
        width:352,
        height:42,
        borderBottomLeftRadius:7,
        borderBottomRightRadius:27,
        borderTopLeftRadius:7,
        borderTopRightRadius:27,
        backgroundColor:Colors.backgroundcard,
        paddingHorizontal:5
      },
      arrow:{
        width:25,
        height:25,
        marginRight:40
      },
      pinbtn:{
        width:147,
        height:42,
        position:'absolute',
        borderWidth:1,
        borderColor:Colors.btncolor,
        backgroundColor:Colors.btncolor,
        borderRadius:27,
        alignItems:"center",
        justifyContent:"center",
        right:0,
      },
      pintitle:{
        position:'absolute',
        fontSize:14,
        lineHeight:19,
        fontWeight:'400',
        color:Colors.white,
        
      },
      head:{
        fontSize:30,
        fontWeight:'600',
        lineHeight:36,
        color:Colors.title,
      },
      shopimg:{
        width:90,
        height:90,
        marginHorizontal:10,
      },
      favicon:{
        width:16,
        height:16.5,
       
      },
      name:{
        fontSize:20,
        lineHeight:24,
        fontWeight:'400',
        color:"#515151",
        marginVertical:8,
        marginHorizontal:9
      },
      det:{
        fontSize:16,
        lineHeight:19.2,
        fontWeight:'400',
        color:"#8B8B8B",
        marginHorizontal:10,
      },
      newdiv:{
        width:45,
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        backgroundColor:'#FF6565',
        marginTop:-10,
        marginRight:-10
        
      },
      viewtxt:{
        fontSize:14,
        fontWeight:'600',
        color:"#ffffff"
      }



})