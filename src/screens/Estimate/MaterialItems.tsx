import React, { useState } from "react";
import { View,StyleSheet, Image, Text, TouchableOpacity, TextInput,ScrollView } from 'react-native';
import Colors from "../../assets/colors";
import { useNavigation } from '@react-navigation/native';
import Product from '../../assets/img/productz.png';
// import {colors} from '../../assets/colors'

const arr =[
  {
    id:1,
    title:'Ball valve',
    img:Product
  },
  {
    id:2,
    title:'Coupler',
    img:Product
  },
  {
    id:3,
    title:'Elbow',
    img:Product
  },
  {
    id:4,
    title:'End cap',
    img:Product
  },
  {
    id:5,
    title:'Reducer',
    img:Product
  },
  {
    id:6,
    title:'Union',
    img:Product
  },
  {
    id:7,
    title:'Elbow 90',
    img:Product
  },
  {
    id:8,
    title:'elbow Holder',
    img:Product
  },
  {
    id:9,
    title:'Equal tee',
    img:Product
  },
  {
    id:10,
    title:'Flange Adapter',
    img:Product
  },
  {
    id:11,
    title:'End cap2',
    img:Product
  },
  {
    id:12,
    title:'Elbow 2',
    img:Product
  },
  

]

const countitem =[
  {
    id:1,
    amount:"1.50"
  },
  {
    id:2,
    amount:"1.00"
  },
  {
    id:3,
    amount:"2.00"
  },
  {
    id:4,
    amount:"2.50"
  },
  {
    id:5,
    amount:"3.00"
  },
  {
    id:6,
    amount:"3.50"
  },
]

  

const MaterialItems =()=> {
  const [visible, setVisible] = useState(false);
  const [num,setNum] = useState(0);

  const adding = () => {
    setNum(num+1);
  }

  const decending = () => {
    if(num>0){
      setNum(num-1);
    }
    
  }
    
    return (
        <View style={styles.container}>
          {
            visible === true ?
            <View style={styles.modalcontainer}>
              <View style={styles.contentdiv}>
                <View style={styles.contentdivtap}>
              </View>
              <View style={styles.contentbar}>
                <Text  style={styles.producttxt}>PVC - Elbow Holder</Text>
              </View>
              <View style={styles.below}>
                {
                  countitem.map((item,i)=>{
                    return (
                    <View style={styles.itemcontentbar}>
                <View style={styles.typecontentbar}>
              <Text style={styles.amountline}>{item?.amount}<Text style={styles.inches}> inch</Text></Text>
              </View>
              <TouchableOpacity style={styles.btnselector} onPress={()=>decending()}>
                <Text style={styles.icontxt}>—</Text>
              </TouchableOpacity>
              <View style={styles.number}>
              <Text style={styles.Count}>{num}</Text>
              </View>
              <TouchableOpacity style={styles.btnselector} onPress={()=>adding()}>
                <Text style={styles.icontxt}>+</Text>
              </TouchableOpacity>

              </View>)

                  })
                }
              </View>
              
              
              </View>
            </View>
            :
            ("")
          }
          <View style={styles.headcontainer}>
            <Image style={styles.back} source={require('../../assets/img/backarrow.png')}/>
          <Text style={styles.head}>Material Items</Text>
          </View>
          <ScrollView style={styles.cardcontainer}>
            <View style={styles.cardboxcontainer}>
            {
              arr?.map((item,i) => {
                return (
                  <TouchableOpacity style={styles.card} onPress={()=>setVisible(!visible)} key={i}>
              <Image style={styles.productimg} source={item?.img}/>
              <Text style={styles.txt}>{item?.title}</Text>
              

            </TouchableOpacity>

                )
              })
            }
            </View>
          </ScrollView>
                  
        </View>
    )
}
export default MaterialItems;
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff'

  },
  itemcontentbar:{
    width:'95%',
    // height:55,
    borderRadius:8,
    backgroundColor:'#f5f5f5',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:10,
    paddingHorizontal:10
  },
  below:{
    display:'flex',
    flexDirection:'column',
    marginHorizontal:10
  },
  contentdiv:{
    left:0,
    right:0,
    bottom:0,
    flex:0.77,
    backgroundColor:'#ffffff',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    alignItems:"center",
    justifyContent:'flex-start',
  },
  number:{
    width:30,
    alignItems:'center',
    justifyContent:'center',
    // backgroundColor:'red'
  },
  headcontainer:{
    display:'flex',
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:5,
    borderBottomWidth:3,
    borderBottomColor:"rgba(216, 214, 214, 0.8)"
  },
  back:{
    width:40,
    height:40,
    marginHorizontal:30,
    marginVertical:8
  },
  head:{
    fontSize:22,
    fontWeight:'400',
    lineHeight:20,
    color:"#515253"
  },
  cardcontainer:{
    
    // marginHorizontal:10,
    display:'flex',
    // flexDirection:'row',
    // flexWrap:'wrap',
    width:'100%'
  },
  card:{
    width: 110,
    height: 110,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#f4f4f4',
    display:'flex',
    flexDirection:'column'
  },
  txt:{
    fontSize:14,
    fontWeight:"400",
    lineHeight:17,
    color:"#323232",
    textAlign:'center'

  },
  productimg:{
    width:66,
    height:67
  },
  cardboxcontainer:{
    display:'flex',
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',
    flexWrap:'wrap',
    marginVertical:10
    
  },
  modalcontainer:{
    display:'flex',
    backgroundColor:Colors.modalback,
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    zIndex:1,
    justifyContent:'flex-end'
  },
  contentdivtap:{
    width:100,
    height:13,
    borderRadius:10,
    backgroundColor:"#767676",
    marginVertical:20
  },
  contentbar:{
    borderBottomWidth:2,
    width:"100%",
    borderBottomColor:'#D8D6D6',
    alignItems:'center',
    justifyContent:'center'
  },
  producttxt:{
    fontSize:20,
    fontWeight:'500',
    lineHeight:20,
    color:'#474747',
    marginBottom:15,
    marginTop:5
  },
  btnselector:{
    width:60,
    height:55,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.btncolor,
    borderRadius:4
  },
  icontxt:{
    fontSize:35,
    fontWeight:'600',
    color:Colors.white
  },
  Count:{
    fontSize:20,
    fontWeight:'600',
    color:'#5A5959',
    lineHeight:20
  },
  amountline:{
    fontSize:20,
    fontWeight:'500',
    color:'#5A5959',
    lineHeight:20
  },
  inches:{
    fontSize:18,
    fontWeight:'300',
    color:'#5A5959',
    lineHeight:20,
    marginHorizontal:10
  },
  typecontentbar:{
    width:'40%',
    // backgroundColor:"red"
  }
  


    


})