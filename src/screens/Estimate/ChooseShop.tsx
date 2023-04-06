import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from '../../assets/colors';
import { useSelector } from 'react-redux';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetNearUsersQuery, useGetFavUsersQuery } from '../../store/slices/IdentityApiSlice';
import { useGetUsersQuery } from '../../store/slices/IdentityApiSlice';
import { selectUserId } from '../../store/selectors';
// import { useGetUsersQuery } from '../../store/slices/IdentityApiSlice';
const data = [
  {
    id: 1,
    title: 'Kings Elecrricals',
    tag: 'Rice bazar, Thrissur',
  },
  {
    id: 2,
    title: 'CT Electricals ',
    tag: 'Junction, Marathakkara',
  },
  {
    id: 3,
    title: "Poppy's Elctricals",
    tag: 'Main road, Ollur',
  },
 
  
  
];

const datas = [
  {
    id: 1,
    title: 'Starlink Electricals',
    tag: 'Rice bazar, Thrissur',
  },
  {
    id: 2,
    title: 'Space Electricals ',
    tag: 'Junction, Marathakkara',
  },
  
];

const Select = () => {
  const [toggleState, setToggleState] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const userId = useSelector(selectUserId);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { data: nearusers } = useGetNearUsersQuery(userId);
  const { data: favusers } = useGetFavUsersQuery(userId);
  console.log(nearusers, 'Nearusers');
  console.log(favusers, 'Favusers');

  const toggleTab = () => {
    setToggleState(false);
  };
  const toggleTabs = () => {
    setToggleState(true);
  };
  const closeconfirm = () => {
    setConfirmation(false);
  };
  const openconfirm = () => {
    setConfirmation(true);
  };
 
  return (
    <>
    {
        confirmation === true ? 
        <View style={{width:'100%', alignItems:'center', justifyContent:'center', position:'absolute',backgroundColor:'rgba(80, 80, 80, 0.8)', height:'100%',zIndex:1,}}>
          <View style={{width:'80%',paddingVertical:20, borderRadius:5, backgroundColor:'#fff', height:"auto",display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:18, lineHeight:25,color:'#454545',fontWeight:'500'}}>Are you sure,</Text>
          <Text style={{fontSize:18, lineHeight:25,color:'#454545',fontWeight:'500'}}>you want to place order to</Text>
          <Text style={{fontSize:19, lineHeight:26,color:'#454545',fontWeight:'600'}}>Kings Electricals ?</Text>
          
            
            <View style={{width:'100%',display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity
              onPress={()=>closeconfirm()}
               style={{width:98, height:50, margin:10, borderRadius:26, backgroundColor:'#979797',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff',lineHeight:18,fontSize:18,fontWeight:'400'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>closeconfirm()}
               style={{width:98, height:50,margin:10, borderRadius:26, backgroundColor:'#656A72',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff',lineHeight:18,fontSize:18,fontWeight:'400'}}>Yes</Text>
              </TouchableOpacity>
            </View>
            </View>
          
          </View>
          :("")
      }
    <View style={styles.container} >
      
        <View style={styles.headbar}>
        
        <Text style={styles.head}>Select a shop to place order</Text>
      </View>
      <View style={styles.background}>
        <Image style={styles.locicon} source={require('../../assets/img/locationtab.png')} />
        <TextInput style={styles.input} placeholder="608 301"></TextInput>
        <TouchableOpacity style={styles.pinbtn}>
          <Text style={styles.pintitle}> Location</Text>
        </TouchableOpacity>
      </View>
      

      <View style={styles.toggle}>
        {toggleState === true ? (
          <>
            <TouchableOpacity style={styles.tab} onPress={() => toggleTab()}>
              <Image source={require('../../assets/img/star.png')} style={styles.toggleicon} />
              <Text style={styles.toggletxt}>Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabs} onPress={() => toggleTabs()}>
              <Image source={require('../../assets/img/location.png')} style={styles.toggleicon} />
              <Text style={styles.toggletxt}>Near Me</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.tabs} onPress={() => toggleTab()}>
              <Image source={require('../../assets/img/star.png')} style={styles.toggleicon} />
              <Text style={styles.toggletxt}>Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => toggleTabs()}>
              <Image source={require('../../assets/img/location.png')} style={styles.toggleicon} />
              <Text style={styles.toggletxt}>Near Me</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {toggleState === false ? (
        <ScrollView showsVerticalScrollIndicator={false}
        style={styles.filter}
        >
          {datas.map(item => {
            return (
              <TouchableOpacity 
              onPress={()=>openconfirm()}
              style={styles.card}>
                <Image source={require('../../assets/img/shopimg.png')} style={styles.shopimg} />
                <View style={styles.subcard}>
                  <Text style={styles.name}>{item?.title}</Text>

                  <View style={styles.detcard}>
                    <Image source={require('../../assets/img/star.png')} style={styles.favicon} />
                    <Text style={styles.det}>{item?.tag}</Text>
                  </View>
                </View>
                <View style={styles.call}>
                  {/* <Image source={require('../../assets/img/phone-call.png')} style={styles.callicon} /> */}
                </View>
              </TouchableOpacity>
            );
          })}
          
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}
        style={styles.filter}
        >
          {data.map(item => {
            return (
              <TouchableOpacity  onPress={()=>openconfirm()}
               style={styles.card}>
                <Image source={require('../../assets/img/shopimg.png')} style={styles.shopimg} />
                <View style={styles.subcard}>
                  <Text style={styles.name}>{item?.title}</Text>

                  <View style={styles.detcard}>
                    <Image source={require('../../assets/img/Vector.png')} style={styles.favicon} />
                    <Text style={styles.det}>{item?.tag}</Text>
                  </View>
                </View>
                 <View style={styles.call}>
                  {/* <Image source={require('../../assets/img/phone-call.png')} style={styles.callicon} /> */}
                </View> 
              </TouchableOpacity>
            );
          })}

<TouchableOpacity style={styles.card}>
            <View style={{width:95,  height: 96, backgroundColor:'#548B67', borderRadius:8, alignItems:'center', justifyContent:'center', display:'flex', marginHorizontal:6}}>
          <Image source={require('../../assets/img/watsvector.png')} style={{height:54, width:54}} />
          </View>
           <View style={styles.subcard}>
                  <Text style={styles.name}>Place Order Via</Text>

                  <View style={styles.detcard}>
                    
                    <Text style={styles.name}>Whatsapp</Text>
                  </View>
                </View>
                <View style={styles.call}></View>
                

          </TouchableOpacity>
        </ScrollView>
        
      )}
    </View>
    </>
  );
};
export default Select;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal:15
    
  },
  headbar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  filter: {
    display: 'flex',
    flexDirection: 'column',
  },
  subcard: {
    display: 'flex',
    width: '56%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  detcard: {
    display: 'flex',
    flexDirection: 'row',
  },
  callicon: {
    width: 34,
    height: 34,
    marginRight: 2,
    marginVertical: 5,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 110,
    borderRadius: 8,
    backgroundColor: Colors.backgroundcard,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  toggle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  call: {
    height: 110,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  toggletxt: {
    fontSize: 19,
    fontWeight: '400',
    lineHeight: 22,
    color: Colors.name,
  },
  toggleicon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
  tab: {
    width: '47%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundcard,
  },
  tabs: {
    width: '47%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundcard,
    borderWidth: 2,
    borderColor: '#6B7887',
  },
  background: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 42,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 27,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 27,
    backgroundColor: Colors.backgroundcard,
    paddingHorizontal: 5,
    zIndex: -1,
    paddingLeft: 30,
  },
  locicon: {
    zIndex: 1,
    position: 'absolute',
    marginLeft: 10,
  },
  arrow: {
    width: 25,
    height: 25,
    marginRight: 40,
  },
  pinbtn: {
    width: 147,
    height: 42,
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.btncolor,
    backgroundColor: Colors.btncolor,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
  pintitle: {
    position: 'absolute',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    color: Colors.white,
  },
  head: {
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 32,
    alignItems: 'center',
    color: "#515253",
  },
  shopimg: {
    width: 90,
    height: 90,
    marginHorizontal: 10,
  },
  favicon: {
    width: 16,
    height: 16.5,
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '400',
    color: '#515151',
    marginVertical: 8,
  },
  det: {
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: '400',
    color: '#8B8B8B',
    marginHorizontal: 10,
  },
});
