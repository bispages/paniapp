import React, {
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, Pressable, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import colorss from '../../assets/colors/index'

import MaterialSpecView from './MaterialSpecView';


import { MaterialType, MaterialItem } from '../../types';
import useBackHandler from '../../hooks/useBackHandler';
import { materialItemsList } from '../../utils/materialItemsList';
import {
  ESTIMATE_MATERIAL_BOTSHEET_SNAPMIN,
  ESTIMATE_MATERIAL_BOTSHEET_SNAPMAX,
} from '../../utils/constants';
import styles from './Estimate.style';

type routeParams = {
  route: { params: { type: MaterialType } };
};

const MaterialItems = ({ route: { params } }: routeParams) => {
  const { type } = params;
  const { dark, colors } = useTheme();
  const navigation = useNavigation();

  const snapPoints = useMemo(
    () => [
      ESTIMATE_MATERIAL_BOTSHEET_SNAPMIN,
      ESTIMATE_MATERIAL_BOTSHEET_SNAPMAX,
    ],
    [],
  );
  const [item, setItem] = useState<MaterialItem>();
  const [isBotSheetActive, setIsBotSheetActive] = useState(false);
  const materialSpecBottomSheet = useRef<BottomSheet>(null);
  const backAction = useCallback(() => {
    if (isBotSheetActive) {
      closeMaterialSpecBotSheet(materialSpecBottomSheet);
      return true;
    }
    return false;
  }, [isBotSheetActive]);

  // Adds hardware BackHandler hook.
  useBackHandler(backAction);

  // Save and Close the bottomSheet
  const saveFormAndClose = () => {
    closeMaterialSpecBotSheet(materialSpecBottomSheet);
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index >= 0) {
        setIsBotSheetActive(true);
      } else {
        setIsBotSheetActive(false);
      }
    },
    [isBotSheetActive],
  );

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={0}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const showMaterialSpecBotSheet = useCallback(
    (item: MaterialItem, sheet: RefObject<BottomSheet>) => {
      setItem(item);
      setTimeout(() => {
        sheet.current?.snapToIndex(1);
      }, 100);
    },
    [],
  );

  const closeMaterialSpecBotSheet = useCallback(
    (sheet: RefObject<BottomSheet>) => sheet.current?.close(),
    [],
  );

  const renderBottomSheet = useCallback(
    (type: MaterialType, item: MaterialItem | undefined) => (
      <BottomSheet
        ref={materialSpecBottomSheet}
        index={-1}
        // enablePanDownToClose
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.background }}
        handleStyle={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          
        }}
        onChange={(index: number) => handleSheetChanges(index)}
        backdropComponent={renderBackdrop}>
         
        <MaterialSpecView
          type={type}
          item={item}
          saveFormAndClose={saveFormAndClose}
        />
      </BottomSheet>
    ),
    [item, type],
  );

  // Function to render material Items List.
  const renderMaterialItemsList = (item: MaterialItem) => (
    <Pressable
      key={item.id}
      onPress={() => showMaterialSpecBotSheet(item, materialSpecBottomSheet)}
      style={[styless.block, { backgroundColor: colorss.materialitemscard }]}

      android_ripple={{ color: colors.background, radius: 200 }}>
        
        <Image source={require("../../assets/img/valve.png")} style={styless.product}/>
        
      <Text
        style={{ fontSize: 14, fontWeight:"400" }}
        theme={{ colors: { text: colorss.textcolor } }}>
        {item.name}
      </Text>
    </Pressable>
  );

  const saveEstimate = () => {
    navigation.navigate('EstimateTableView');
  };

  return (
    <View style={styles.container}>
      <View style={styless.headingContainer}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Image source={require("../../assets/img/backarrow.png")} style={styless.back}/>
      </TouchableOpacity>
        <Text style={styless.heading}>Material Items</Text>
      </View>
      <View style={styless.itemsContainer}>
        {materialItemsList ? (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={styless.listContainer}>
                {materialItemsList.map(renderMaterialItemsList)}
              </View>
            </ScrollView>
          </View>
        ) : null}
      </View>
      <View style={styless.saveBtnContainer}>
        <Button style={styless.saveBtn}>
        <Image source={require("../../assets/img/icon-park-solid_back.png")} style={styless.backinfo}/>
          <Text style={styless.saveBtntxt}>Save</Text>
        </Button>
        
      </View>
      {renderBottomSheet(type, item)}
    </View>
  );
};

export default MaterialItems;
const styless = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '3%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headingContainer: {
    flex: 0.1,
    marginTop:-10,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection:'row',
    alignItems:"center",
    justifyContent: 'flex-start',
    backgroundColor:colorss.white
  },
  itemsContainer: {
    flex: 0.78,
    // backgroundColor:'red',
   
    width: '100%',
    backgroundColor:colorss.white
  },
  block: {
    width: '30%',
    height: 110,
    margin: 5,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colorss.materialbackground
  },
  product:{
    width:50,
    height:50
  },
  heading:{
    fontSize:27,
    lineHeight:32,
    fontWeight:"400",
    color:"#515253",
    marginLeft:20
  },
  back:{
    width:46,
    height:46
  },
  saveBtnContainer: {
    width: '100%',
    flex: 0.12,
    zIndex: 0,
    marginTop: 15,
    backgroundColor:colorss.materialbackground,
    alignItems:'center',
    justifyContent:'center'
  },
  saveBtn:{
    width:135,
    height:60,
    borderRadius:30,
    backgroundColor:colorss.btncolor,
    alignItems:'center',
    justifyContent:'center'
  },
  backinfo:{
    width:25,
    height:25
  },
  backinfos:{
    width:20
  },
  saveBtntxt:{
    fontSize:22,
    lineHeight:26,
    fontWeight:"400",
    color:"#ffffff",
    marginLeft:15
  },
  add:{
    width:'100%',
    backgroundColor:colorss.btncolor,
    alignItems:'center',
    justifyContent:'center',
    // marginTop:-40,
    

  }
 


})