import React, { useState, useEffect, Fragment } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../assets/colors';
// import { useNavigation } from '@react-navigation/native';
import {
  useGetNearUsersQuery,
  useGetFavUsersQuery,
  useSetFavUserMutation,
  useSetFavRemoveMutation,
} from '../../store/slices/IdentityApiSlice';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useGetUsersQuery } from '../../store/slices/IdentityApiSlice';
import { selectUserId } from '../../store/selectors';

const dataq = [
  {
    id: 1,
    userName: 'Anand krish',
    pincode: '680301',
  },
  {
    id: 2,
    userName: 'Alphy benny ',
    pincode: '680301',
  },
  {
    id: 3,
    userName: 'Alwin John',
    pincode: '680302',
  },

  {
    id: 3,
    userName: 'Alwin John',
    pincode: '680302',
  },
  {
    id: 4,
    userName: 'Hari Krishnan',
    pincode: '680302',
  },
];

const datas = [
  {
    id: 1,
    title: 'Melwin ks',
    tag: '680302',
  },
  {
    id: 2,
    title: 'Jomon John ',
    tag: '680302',
  },
];

const Select = () => {
  const [toggleState, setToggleState] = useState(true);
  const [favUserId, setFavUserId] = useState('');
  const [isFavourite, setIsFavourite] = useState();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [updatefavUserProfile, { isLoading: updatefavUserProfileLoader }] = useSetFavUserMutation();
  const [updateremoveUserProfile, { isLoading: updateremoveUserProfileLoader }] = useSetFavRemoveMutation();

  const userId = useSelector(selectUserId);
  const { data: users } = useGetUsersQuery(userId);
  const { data: nearusers, isLoading } = useGetNearUsersQuery(userId);
  const { data: favusers, refetch } = useGetFavUsersQuery(userId);

  console.log(users, 'getUsers');
  console.log(nearusers, 'Nearusers');
  console.log(favusers, 'Favusers');
  console.log(userId, 'userId');

  const toggleTabs = () => {
    setToggleState(true);
  };

  const saveDetails = async item => {
    setFavUserId(item?.userId);
    setIsFavourite(true);
    console.log('WTRXX', favUserId, isFavourite);
    const favuserDetails = {
      favUserId,
      isFavourite,
    };
    await updatefavUserProfile(favuserDetails);
    refetch();
    isLoading();
  };

  const removefromfav = async item => {
    setFavUserId(item?.userId);
    console.log('favUserId', favUserId);
    const favuserDetailss = {
      favUserId,
    };
    await updateremoveUserProfile(favuserDetailss);
    refetch();
    isLoading();
  };

  const toggleTab = () => {
    console.log(favusers, 'Favusers');
    setToggleState(false);
  };

  useEffect(() => {
    console.log(nearusers, 'nearusers');
  }, [nearusers]);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image style={styles.locicon} source={require('../../assets/img/locationtab.png')} />
        <TextInput style={styles.input} placeholder="608 301"></TextInput>
        <TouchableOpacity style={styles.pinbtn}>
          <Text style={styles.pintitle}> Location </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.arrow} source={require('../../assets/img/Group63.png')} />
        </TouchableOpacity>
        <Text style={styles.head}>Find an Electritian</Text>
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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.filter}>
          {favusers?.length === 0 ? (
            <Text style={styles.dets}>There is no favourite users</Text>
          ) : (
            <>
              {favusers?.map((item, i) => {
                return (
                  <View style={styles.card} key={i}>
                    <Image source={require('../../assets/img/Ellipse10.png')} style={styles.shopimg} />
                    <View style={styles.subcard}>
                      <Text style={styles.name}>{item?.userName}</Text>

                      <View style={styles.detcard}>
                        <TouchableOpacity onPress={() => removefromfav(item)}>
                          <Image source={require('../../assets/img/star.png')} style={styles.favicon} />
                        </TouchableOpacity>
                        <Text style={styles.det}>{item?.pincode}</Text>
                      </View>
                    </View>
                    <View style={styles.call}>
                      <Image source={require('../../assets/img/phone-call.png')} style={styles.callicon} />
                    </View>
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.filter}>
          
            {isLoading ? (
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#6B7887" />
              </View>
         
          ) : (
            <>
            {console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH")}
              { nearusers?.length === 0 ? (
                <View style={{ display: 'flex', alignItems: 'center' }}>
                   {console.log("77777777777777777777777777777777")}
                <Text style={styles.dets}>There is no Nearby users</Text>
                </View>
              ) : (
                <Fragment>
                  {nearusers?.map((item, i) => {
                    return (
                      <View style={styles.card} key={i}>
                         {console.log("888888888888888888888888888888888888")}
                       
                        <Image source={require('../../assets/img/Ellipse10.png')} style={styles.shopimg} />
                        <View style={styles.subcard}>
                          <Text style={styles.name}>{item?.userName}</Text>

                          <View style={styles.detcard}>
                            {favusers?.some(favusersItem => favusersItem.userId === item.userId) ? (
                              <TouchableOpacity onPress={() => removefromfav(item)}>
                                <Image source={require('../../assets/img/star.png')} style={styles.favicon} />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity onPress={() => saveDetails(item)}>
                                <Image source={require('../../assets/img/Vector.png')} style={styles.favicon} />
                              </TouchableOpacity>
                            )}

                            <Text style={styles.det}>{item?.pincode}</Text>
                          </View>
                        </View>
                        <View style={styles.call}>
                          <Image source={require('../../assets/img/phone-call.png')} style={styles.callicon} />
                        </View>
                      </View>
                    );
                  })}
                </Fragment>
              )}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default Select;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
  },
  headbar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  filter: {
    display: 'flex',
    flexDirection: 'column',
  },
  locicon: {
    zIndex: 1,
    position: 'absolute',
    marginLeft: 10,
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
    marginHorizontal: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 27,
    fontWeight: '400',
    lineHeight: 32,
    alignItems: 'center',
    color: Colors.title,
  },
  shopimg: {
    width: 65,
    height: 65,
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
  dets: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '400',
    color: '#8B8B8B',
    marginVertical: 25,
    alignSelf: 'center',
    fontStyle: 'italic',
  },
});
