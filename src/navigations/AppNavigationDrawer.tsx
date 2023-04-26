import React from 'react';
import { useTheme } from 'react-native-paper';
// import {
//   createStackNavigator,
//   TransitionPresets,
// } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
// import Search from '../screens/Search';
import Profile from '../screens/Profile';
import MyOrder from '../screens/MyOrder';
// import Bookmarks from '../screens/Bookmarks';
// import Settings from '../screens/Settings';
import Support from '../screens/Support';
import DrawerContent from '../screens/Drawer';
import OrdersHistory from '../screens/Shop/OrdersHistory';
import ShopProfile from '../screens/Shop/ShopProfile';
import Promotions from '../screens/Shop/Promotions';
// import Details from '../screens/Details';
import EstimateNavigationStack from '../navigations/EstimateNavigationStack';
import Orderdet from '../screens/MyOrder/Orderdet';
import styles from 'screens/Estimate/Estimate.style';

const AppDrawer = createDrawerNavigator();
// const SearchStack = createStackNavigator();

// export const SearchNavigationStack = () => {
//   const { colors } = useTheme();
//   const stackScreenOptions = {
//     headerShown: false,
//     headerTintColor: colors.text,
//     headerPressColorAndroid: colors.accent,
//     headerStyle: {
//       elevation: 0,
//       shadowOpacity: 0,
//       borderBottomWidth: 0,
//     },
//     ...TransitionPresets.SlideFromRightIOS,
//   };

//   return (
//     <SearchStack.Navigator
//       headerMode="float"
//       screenOptions={{ ...stackScreenOptions }}>
//       <SearchStack.Screen
//         name="Search"
//         component={Search}
//         options={{ title: 'Pani App' }}
//       />
//       <SearchStack.Screen name="Details" component={Details} />
//     </SearchStack.Navigator>
//   );
// };

const AppNavigationDrawer = () => {
  const { colors } = useTheme();

  return (
    <AppDrawer.Navigator
      initialRouteName="Searchstack"
      screenOptions={{
        headerShown: false,
        headerStatusBarHeight: 0,
        drawerType: 'front',
        headerTintColor: colors.text,
        headerPressColor: colors.accent,
        drawerStyle: { flex: 1 },
        sceneContainerStyle: { flex: 1 },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      {/* <AppDrawer.Screen
        name="Searchstack"
        component={SearchNavigationStack}
        options={({ route, navigation }) => ({
          title: 'Pani App',
          ...getDrawerHeaderConfig(route, navigation),
        })}
      /> */}
      <AppDrawer.Screen name="EstimateStack" component={EstimateNavigationStack} />
      <AppDrawer.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle:'My Profile', 

          headerTitleAlign: 'center', 
          headerTitleStyle: {
            fontSize: 24,
            color:'#455A64',
            fontWeight:'400'
          },
          

          headerLeft: () => (
        
            <TouchableOpacity
            
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
             <Image source={require('../../src/assets/img/menu.png')} style={styless.menudes}
            />
            </TouchableOpacity>
           
          ),

        })}
      />
      {/* <AppDrawer.Screen name="Bookmarks" component={Bookmarks} /> */}
      {/* <AppDrawer.Screen name="Settings" component={Settings} /> */}
      <AppDrawer.Screen
        name="Support"
        component={Support}
        options={{
          headerShown: true,
       
        }}
      />
      <AppDrawer.Screen
        name="MyOrder"
        component={MyOrder}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle:'My Order', 

          headerTitleAlign: 'center', 
          headerTitleStyle: {
            fontSize: 24,
            color:'#455A64',
            fontWeight:'400'
          },
          

          headerLeft: () => (
        
            <TouchableOpacity
            
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
             <Image source={require('../../src/assets/img/menu.png')} style={styless.menudes}
            />
            </TouchableOpacity>
           
          ),

        })}
      />
      <AppDrawer.Screen
        name="Orderdet"
        component={Orderdet}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle:'Order Details',
          headerTitleAlign: 'center', 
          headerTitleStyle: {
            fontSize: 24,
            color:'#455A64',
            fontWeight:'400'
          },
          

          headerLeft: () => (
        
            <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image source={require('../../src/assets/img/backarrow.png')} 
            style={styless.backimg}
            />
            </TouchableOpacity>
           
          ),
        })}
      />
      <AppDrawer.Screen
        name="OrdersHistory"
        component={OrdersHistory}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle:'Order History', 

          headerTitleAlign: 'center', 
          headerTitleStyle: {
            fontSize: 24,
            color:'#455A64',
            fontWeight:'400'
          },
          

          headerLeft: () => (
        
            <TouchableOpacity
            
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
             <Image source={require('../../src/assets/img/menu.png')} style={styless.menudes}
            />
            </TouchableOpacity>
           
          ),

        })}
      />
      <AppDrawer.Screen
        name="ShopProfile"
        component={ShopProfile}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle:'Shop Profile',
          headerTitleAlign: 'center', 
          headerTitleStyle: {
            fontSize: 24,
            color:'#455A64',
            fontWeight:'400'
          },
          

          headerLeft: () => (
        
            <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image source={require('../../src/assets/img/backarrow.png')} 
            style={styless.backimg}
            />
            </TouchableOpacity>
           
          ),
        })}
      />
      <AppDrawer.Screen
        name="Promotions"
        component={Promotions}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle:'Promotions',
          headerTitleAlign: 'center', 
          headerTitleStyle: {
            fontSize: 24,
            color:'#455A64',
            fontWeight:'400'
          },
          

          headerLeft: () => (
        
            <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image source={require('../../src/assets/img/backarrow.png')} 
            style={styless.backimg}
            />
            </TouchableOpacity>
           
          ),
        })}
      />
    </AppDrawer.Navigator>
  );
};

export default AppNavigationDrawer;
const styless = StyleSheet.create({
backimg: {
  width: 40,
  height: 40,
  marginLeft: 10,
  marginTop:10
},
menudes:{
  width: 35,
  height: 28,
  marginLeft: 15,
  marginTop:10
}
})
