import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-animatable';
import { useTheme, Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Drawer.style';
import { selectUser } from '../../store/selectors';
import { logOutUser } from '../../store/slices/AppStateSlice';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {
    state: { routeNames, index },
    navigation,
  } = props;
  const dispatchAction = useDispatch();
  const { colors } = useTheme();
  const user = useSelector(selectUser);
  const [userddet, setUserddet] = useState('')
  const [userpick, setUserpick] = useState('')

  useEffect(()=> {
    AsyncStorage.getItem('user').then(value => {
      setUsderadd(JSON.parse(value) || '');
    });
    

    AsyncStorage.getItem('userimgs').then(value => {
      setUserpick(JSON.parse(value) || '');
    });

    // console.log("QQQQQQQQQQ",user);

  }, [])
  console.log("QQQQQQQQQQ",setUserpick);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 10,
            alignItems: 'center',
          }}>
          {user?.userType === 0 ? (
            <View
              style={{
                // paddingTop: 10,
                alignItems: 'center',
                justifyContent:'center',
                width: 160,
                height: 160,
                borderWidth: 3,
                borderRadius: 80,
                borderColor: '#667280',
              }}>
              {user?.image?.path ? (
                <Avatar.Image source={{ uri: user?.image?.path }} size={155} />
              ) : (
                // <Avatar.Icon size={200} icon="account-circle" />
                <Image source={require('../../assets/img/Vectorshop.png')} />
              )}
            </View>
          ) : (
            <View
              style={{
                // paddingTop: 10,
                alignItems: 'center',
                width: 160,
                height: 160,
                borderWidth: 3,
                borderRadius: 40,
                borderColor: '#667280',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              {user?.image?.path ? (
                <Avatar.Image source={{ uri: user?.image?.path }} size={155} />
              ) : (
                // <Avatar.Icon size={200} icon="account-circle" />
                <Image
                  source={require('../../assets/img/mdi_shop.png')}
                  style={{ resizeMode: 'contain', width: 160, height: 160 }}
                />
              )}
            </View>
          )}

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Title style={styles.title}>{user?.userName ?? 'Name'}</Title>
            <Caption style={styles.caption}>{`${user?.pincode ?? ''}`}</Caption>
          </View>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="briefcase-outline" color={color} size={size} />
              )}
              focused={routeNames[index] === 'EstimateStack'}
              inactiveTintColor="#535454"
              activeTintColor="#535454"
              label="Home "
              onPress={() => {
                navigation.navigate('EstimateStack');
              }}
            /> */}
            {user?.userType === 0 ? (
              <>
                <DrawerItem
                  icon={({ color, size }) => <Icon name="account-circle" color={color} size={35} />}
                  focused={routeNames[index] === ' My Profile'}
                  inactiveTintColor="#535454"
                  activeTintColor="#535454"
                  labelStyle={{ color: '#535454', fontSize: 20 }}
                  label="My Profile"
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => <Icon name="cart" color={color} size={35} />}
                  focused={routeNames[index] === 'My Orders'}
                  inactiveTintColor="#535454"
                  activeTintColor="#535454"
                  labelStyle={{ color: '#535454', fontSize: 20 }}
                  label="My Orders"
                  onPress={() => {
                    navigation.navigate('MyOrder');
                  }}
                />
              </>
            ) : (
              <>
                <DrawerItem
                  icon={({ color }) => (
                    <Icon name="store" color={color} size={35} />
                    // <Image source={require('../../assets/img/shopprofile.png')} />
                  )}
                  focused={routeNames[index] === ' Shop Profile'}
                  inactiveTintColor="#535454"
                  activeTintColor="#535454"
                  labelStyle={{ color: '#535454', fontSize: 20, marginLeft: -8 }}
                  label="Shop Profile"
                  onPress={() => {
                    navigation.navigate('ShopProfile');
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => <Icon name="cart" color={color} size={35} />}
                  focused={routeNames[index] === 'OrdersHistory'}
                  inactiveTintColor="#535454"
                  activeTintColor="#535454"
                  labelStyle={{ color: '#535454', fontSize: 20, marginLeft: -8 }}
                  label="Orders History"
                  onPress={() => {
                    navigation.navigate('OrdersHistory');
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => <Image source={require('../../assets/img/Group39.png')} />}
                  focused={routeNames[index] === 'Promotions'}
                  inactiveTintColor="#535454"
                  activeTintColor="#535454"
                  labelStyle={{ color: '#535454', fontSize: 20 }}
                  label="Promotions"
                  onPress={() => {
                    navigation.navigate('Promotions');
                  }}
                />
              </>
            )}
            <DrawerItem
              icon={
                ({ color, size }) => <Icon name="face-agent" color={color} size={35} />
                // <Image source={require('../../assets/img/Group24.png')} />
              }
              focused={routeNames[index] === 'Support'}
              inactiveTintColor="#535454"
              activeTintColor="#535454"
              labelStyle={{ color: '#535454', fontSize: 20, marginLeft: -8 }}
              label="Support"
              onPress={() => {
                navigation.navigate('Support');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => <Image source={require('../../assets/img/Vectorshare.png')} />}
              focused={routeNames[index] === 'Settings'}
              inactiveTintColor="#535454"
              activeTintColor="#535454"
              labelStyle={{ color: '#535454', fontSize: 20 }}
              label="Share to Friends"
              onPress={() => {
                navigation.navigate('Settings');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={
            ({ color, size }) => <Icon name="logout-variant" color={color} size={35} />
            // <Image source={require('../../assets/img/signout.png')} styles={{width:150, height:150}}/>
          }
          label="Sign Out"
          onPress={() => {
            AsyncStorage.removeItem('user').then(() => dispatchAction(logOutUser()));
          }}
          inactiveTintColor="#535454"
          activeTintColor="#535454"
          labelStyle={{ color: '#535454', fontSize: 20, marginLeft: -8 }}
          activeBackgroundColor={colors.accent}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
