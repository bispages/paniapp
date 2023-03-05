import React, { useState } from "react";
import { View,StyleSheet, Image, Text, TouchableOpacity, TextInput,ScrollView } from 'react-native';
import Colors from "../../assets/colors";
import { useNavigation } from '@react-navigation/native';
import Product from '../../assets/img/productz.png';
import { useGetMaterialsQuery } from '../../store/slices/IdentityApiSlice'
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
    amount:"1.50",
    count:0,
    initialCount: 0
  },
  {
    id:2,
    amount:"1.00",
    count:0,
    initialCount: 0
  },
  {
    id:3,
    amount:"2.00",
    count:0,
    initialCount: 0
  },
  {
    id:4,
    amount:"2.50",
    count:0,
    initialCount: 0
  },
  {
    id:5,
    amount:"3.00",
    count:0,
    initialCount: 0
  },
  {
    id:6,
    amount:"3.50",
    count:0,
    initialCount: 0
  },
  {
    id:7,
    amount:"2.50",
    count:0,
    initialCount: 0
  },
  {
    id:8,
    amount:"3.00",
    count:0,
    initialCount: 0
  },
  {
    id:9,
    amount:"3.50",
    count:0,
    initialCount: 0
  },
  
]

  

const MaterialItems =()=> {
  const [visible, setVisible] = useState(false);
  const [num,setNum] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [data, setData] = useState(countitem)
    const [load, setLoad] = useState(true)
    const [click, setClick] = useState({ id: 0, count: 0 })
  const navigation = useNavigation();

  const { data: users } = useGetMaterialsQuery();
  console.log(users,"Material Items")


  const popup=()=>{
    setNum(true);
    setTimeout(function(){
      setNum(false)
    }, 100);
  }

   const handleProductCount = (id, payload) => {
        const item = data.find(item => item.id === id)

        if (payload === "inc") {
            item.count += 1
            item.initialCount += 1;
            if (click.id === id) {
                click.count += 1
            } else {
                if (item.initialCount > 0) {
                    click.count = item.initialCount
                } else {
                    click.count = 1
                }
            }
            click.id = id
            setLoad(!load)
        } else {
            if (item.count > 0) {
                item.count--
                item.initialCount--
                if (click.id === id) {
                    click.count -= 1
                } else {
                    if (item.initialCount > 0) {
                        click.count = item.initialCount
                    } else {
                        click.count = -1
                    }
                }
                click.id = id
                setLoad(!load)
            } else {
                alert("Something went wrong")
            }

        }

        console.log('%%', data);
    }

  // let adding = (index, value) => {
    
  //   let product_array;
  //   product_array = [...countitem];
  //   product_array[index][value] = parseInt(product_array[index]?.count) + 1;
  //   product_array[index][value] = `${product_array[index]?.count}`;
  //   setProductDetails(product_array);
  // }

  // let decending = (index, value) => {
    
  //     let product_array;
  //     product_array = [...countitem];
  //     if(product_array[index]?.count > 0){
  //     product_array[index][value] = parseInt(product_array[index]?.count) - 1;
  //     product_array[index][value] = `${product_array[index]?.count}`;
  //     setProductDetails(product_array);
  //     }
  //   }
    
  
    
    return (
        <View style={styles.container}>
          {
            visible === true ?
            <View style={styles.modalcontainer}>
              {
                num === true ?
                <View style={styles.countbar}>
                  <Text style={styles.countnum}>{click.count}</Text>
                  </View>
                :("")
              }

              <View style={styles.contentdiv}>
                <View style={styles.contentdivtap}>
              </View>
              <View style={styles.contentbar}>
                <Text  style={styles.producttxt}>PVC - Elbow Holder</Text>
              </View>
              <ScrollView 
              showsVerticalScrollIndicator={false}
              style={styles.below}>
                {
                  countitem?.map((item,index)=>{
                    return (
                    <View style={styles.itemcontentbar} key={index}>
                <View style={styles.typecontentbar}>
              <Text style={styles.amountline}>{item?.amount}<Text style={styles.inches}> inch</Text></Text>
              </View>
              <View style={styles.rowset}>
              <TouchableOpacity style={styles.btnselector} onPress={()=> [handleProductCount(item.id, "dec"), popup()]}>
                <Text style={styles.icontxt}>—</Text>
              </TouchableOpacity>
              <View style={styles.number}>
              <Text style={styles.Count}>{item.count}</Text>
              </View>
              <TouchableOpacity style={styles.btnselector} onPress={()=> [handleProductCount(item.id, "inc"), popup()]}>
                <Text style={styles.icontxt}>+</Text>
              </TouchableOpacity>
              </View>

              </View>)

                  })
                }
              </ScrollView>
              <View style={styles.productback}>
                <TouchableOpacity  style={styles.donebar} onPress={()=>navigation.navigate('MaterialTypes')}>
                {/* <Text  style={styles.donetxt}>Back</Text> */}
                <Image source={require('../../assets/img/Group112.png')}/>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.donebar} onPress={()=>{setVisible(false),click.count = 0
                        data.map((item, i) => item.initialCount = 0)
                        setLoad(!load)}}>
                <Text  style={styles.donetxt}>Done</Text>
                </TouchableOpacity>
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
          <View>

          </View>
                  
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
    width:'97%',
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
  rowset:{
    display:'flex',
    flexDirection:'row',
    // backgroundColor:'green'
  },
  countbar:{
    width:90,
    height:90,
    borderRadius:50,
    backgroundColor:'#f5f5f5',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
    
    
  },
  below:{
    display:'flex',
    flexDirection:'column',
    marginHorizontal:10
  },
  donebar:{
    backgroundColor:'#6B7887',
    width:130,
    height:55,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
  },
  donetxt:{
    fontSize:22,
    fontWeight:'500',
    color:'#ffffff'
  },
  contentdiv:{
    left:0,
    right:0,
    bottom:0,
    // flex:0.9,
    height:'83%',
    backgroundColor:'#ffffff',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    alignItems:"center",
    justifyContent:'flex-start',
  },
  number:{
    width:50,
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
    width:'43%',
    // backgroundColor:"red"
  },
  productback:{
    width:'100%',
    height:70,
    backgroundColor:'rgba(234, 234, 234,0.3)',
    borderTopWidth:2,
    borderTopColor:'#D8D6D6',
    alignItems:'center',
    justifyContent:'space-between',
    display:'flex',
    flexDirection:'row',
    paddingHorizontal:20
  },
  countnum:{
    fontSize:26,
    fontWeight:'bold',
    color:'#AAAAAA'
  }
  


    


})