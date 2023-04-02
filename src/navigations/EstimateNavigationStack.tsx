import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { StyleSheet, Image, Text } from 'react-native';
import Estimate from '../screens/Estimate';
import MaterialTypes from '../screens/Estimate/MaterialTypes';
import MaterialItems from '../screens/Estimate/MaterialItems';
import EstimateTableView from '../screens/Estimate/EstimateTableView';
import EstimateForm from '../screens/Estimate/EstimateForm';
import MenuButton from '../components/MenuButton';
import Selectelectritian from '../screens/Estimate/Selectelectritian';
import Select from '../screens/Estimate/Select';
import Cart from '../screens/Estimate/Cart';
import { TouchableOpacity } from 'react-native';
import Order from '../screens/Estimate/Order';
import OrderDet from '../screens/Estimate/OrderDet';

const EstimateStack = createStackNavigator();

const EstimateNavigationStack = () => {
  const { colors } = useTheme();
  const stackScreenOptions = () => ({
    headerShown: true,
    headerTintColor: colors.text,
    headerPressColorAndroid: colors.accent,
    
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      
    },
    headerTitleStyle: {
      fontSize: 18,
    },
    ...TransitionPresets.SlideFromRightIOS,
  });

  return (
    <EstimateStack.Navigator
      screenOptions={stackScreenOptions}>
      <EstimateStack.Screen
        name="Estimate"
        component={Estimate}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Image source={require('../../src/assets/img/menu.png')} style={styles.menudes}
            />
            </TouchableOpacity>
            // <MenuButton 
            //   handler={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            // />
          ),
        })}
      />
      <EstimateStack.Screen
        name="EstimateForm"
        component={EstimateForm}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
          
            <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            
            </TouchableOpacity>
          ),
        })}
      />
      <EstimateStack.Screen
        name="Order"
        component={Order}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            // <Image source={require('../../src/assets/img/Group 54.png')}/>
            <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Image source={require('../../src/assets/img/menu.png')} style={styles.menudes}
            />
            </TouchableOpacity>
          ),

        })}
      />
      <EstimateStack.Screen
        name="MaterialTypes"
        component={MaterialTypes}
        options={({ navigation }) => ({
          headerTitle: 'Select Materials',
          headerTitleAlign: 'center',
          headerLeft: () => (
        
            <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image source={require('../../src/assets/img/backarrow.png')} style={styles.backimg} />
            </TouchableOpacity>
           
          ),
          headerRight: () => (
        
            <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../../src/assets/img/cart.png')} style={styles.cartimg} />
            </TouchableOpacity>
           
          ),
        })}
      />
         <EstimateStack.Screen
        name="Cart"
        component={Cart}
        options={({ navigation }) => ({
          headerTitle: '',
          // headerTitle: 'Cart',
          // headerTitleAlign: 'center',
        })}
          
         
      />
        <EstimateStack.Screen
        name="OrderDet"
        component={OrderDet}
        options={{ title: '' }}
      />
      <EstimateStack.Screen
      
        name="MaterialItems"
        component={MaterialItems}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
          
            <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            
            </TouchableOpacity>
          ),
        })}
      />
      <EstimateStack.Screen
        name="EstimateTableView"
        component={EstimateTableView}
        options={{ title: 'Final Estimate' }}
      />
       <EstimateStack.Screen
        name="Select"
        component={Select}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            // <Image source={require('../../src/assets/img/Group 54.png')}/>
            <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Image source={require('../../src/assets/img/menu.png')} style={styles.menudes}
            />
            </TouchableOpacity>
          ),
        })}
      />
       <EstimateStack.Screen
        name="Selectelectritian"
        component={Selectelectritian}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            // <Image source={require('../../src/assets/img/Group 54.png')}/>
            <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Image source={require('../../src/assets/img/menu.png')} style={styles.menudes}
            />
            </TouchableOpacity>
          ),
        })}
      />
    </EstimateStack.Navigator>
  );
};

export default EstimateNavigationStack;

const styles = StyleSheet.create({
  menudes :{
    width:40,
    height:30,
    marginLeft:20,
    marginTop:10,
    borderRadius:2
  },
  backimg: {
    width: 40,
    height: 40,
    marginLeft: 20,
    marginTop:10
  },
  cartimg: {
    width: 47,
    height: 45,
    marginRight:20,
    marginTop:10
  }
})