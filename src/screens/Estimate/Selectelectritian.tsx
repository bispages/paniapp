import React, { useState } from "react";
import { View,StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Colors from "../../assets/colors";
import { useNavigation } from '@react-navigation/native';


const data =[   
    {
      id:1,
      title:'Anand krish',
      tag: '680301'
    },
    {
      id:2,
      title:'Alphy benny ',
      tag: '680301'
    },
    {
      id:3,
      title:"Alwin John",
      tag: '680302'
    },
    {
        id:4,
        title:"Hari Krishnan",
        tag: '680302'
      },
    
  ]

  const datas =[   
    {
      id:1,
      title:'Melwin ks',
      tag: '680302'
    },
    {
      id:2,
      title:'Jomon John ',
      tag: '680302'
    },
   
    
  ]

const Select =()=> {
    const [toggleState, setToggleState] = useState(true);
    const navigation = useNavigation();
    const toggleTab = () => {
      setToggleState(false);
      
  }
  const toggleTabs = () => {
    setToggleState(true);
    
}
  
    return (
        <View style={styles.container}>
                  <View style={styles.background}>
      {/* <Image style={styles.icon} source={require('../../assets/img/locationtab.png')}/> */}
        <TextInput style={styles.input} placeholder='608 301'></TextInput>
        <TouchableOpacity style={styles.pinbtn}>
         
          <Text style={styles.pintitle}> Change pincode</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headbar}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image style={styles.arrow} source={require('../../assets/img/Group63.png')}/>
        </TouchableOpacity>
        <Text style={styles.head}>Find an Electritian</Text>
      </View>

      <View style={styles.toggle}>
        {
            toggleState === true ? 
            <>
            <TouchableOpacity style={styles.tab} onPress={() =>toggleTab()}>
            <Image source={require('../../assets/img/star.png')} style={styles.toggleicon}/>
            <Text style={styles.toggletxt}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.tabs} onPress={() =>toggleTabs()}>
            <Image source={require('../../assets/img/location.png')} style={styles.toggleicon}/>
            <Text style={styles.toggletxt}>Near Me</Text>
        </TouchableOpacity>
            </>

            :

            <>
            <TouchableOpacity style={styles.tabs} onPress={() =>toggleTab()}>
            <Image source={require('../../assets/img/star.png')} style={styles.toggleicon}/>
            <Text style={styles.toggletxt}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.tab} onPress={() =>toggleTabs()}>
            <Image source={require('../../assets/img/location.png')} style={styles.toggleicon}/>
            <Text style={styles.toggletxt}>Near Me</Text>
        </TouchableOpacity>
            </>
        }
        
      </View>

      {
        toggleState === false ?
        <View style={styles.filter}>
        {
            datas.map((item)=>{
                return (
                    <View style={styles.card}>
                    <Image  source={require('../../assets/img/Ellipse10.png')} style={styles.shopimg}/>
                    <View style={styles.subcard}>
                        <Text style={styles.name}>{item?.title}</Text>
                   
                    <View style={styles.detcard}>
                        <Image  source={require('../../assets/img/star.png')} style={styles.favicon}/>
                        <Text style={styles.det}>{item?.tag}</Text>
                    </View>
                    </View>
                    <View style={styles.call}>
                    <Image  source={require('../../assets/img/phone-call.png')} style={styles.callicon}/>
        
                    </View>
        
                </View>

                )
            })
        }
       

      </View>
      :
      <View style={styles.filter}>
      {
          data.map((item)=>{
              return (
                  <View style={styles.card}>
                  <Image  source={require('../../assets/img/Ellipse10.png')} style={styles.shopimg}/>
                  <View style={styles.subcard}>
                      <Text style={styles.name}>{item?.title}</Text>
                 
                  <View style={styles.detcard}>
                      <Image  source={require('../../assets/img/Vector.png')} style={styles.favicon}/>
                      <Text style={styles.det}>{item?.tag}</Text>
                  </View>
                  </View>
                  <View style={styles.call}>
                  <Image  source={require('../../assets/img/phone-call.png')} style={styles.callicon}/>
      
                  </View>
      
              </View>

              )
          })
      }
     

    </View>
      }

            

        </View>
    )
}
export default Select;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
        paddingHorizontal:15,
    },
    headbar:{
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        marginVertical:20,
        display:"flex",
        flexDirection:'row'
    },
    filter:{
        display:'flex',
        flexDirection:'column'
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
        flexDirection:'row'
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
        backgroundColor:Colors.backgroundcard,
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
        alignItems:"center",
        justifyContent:"center"
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
        fontSize:27,
        fontWeight:'400',
        lineHeight:32,
        alignItems:'center',
        color:Colors.title,
      },
      shopimg:{
        width:65,
        height:65,
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
      },
      det:{
        fontSize:16,
        lineHeight:19.2,
        fontWeight:'400',
        color:"#8B8B8B",
        marginHorizontal:10,
      },


})