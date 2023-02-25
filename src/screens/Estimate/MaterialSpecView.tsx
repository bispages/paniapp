import React, { Fragment, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, IconButton, useTheme, ActivityIndicator } from 'react-native-paper';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';

import AddMinusButton from '../../components/AddMinusButton';
import { materialSpecList } from '../../utils/materialSpecList';
import { MaterialType, MaterialItem, Materials, FormValue, EstimateFormValues, MaterialSpec } from '../../types';
import styles from './Estimate.style';
import colorss from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { selectEstimate } from 'store/selectors';
import { addEstimate } from 'store/slices/EstimateStateSlice';

const MaterialSpecView = ({
  type,
  item,
  saveFormAndClose,
}: {
  type: MaterialType | undefined;
  item: MaterialItem | undefined;
  saveFormAndClose: Function;
}) => {
  const dispatch = useDispatch();
  const [numb, setNumb] = useState(0);
  const { dark, colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [itemInfo, setItemInfo] = useState({ type, item });
  const formVal: EstimateFormValues = useSelector(selectEstimate);

  // Get Count Value from the form.
  const getCountValue = ({ id }: MaterialSpec) => {
    const { estimateItems } = formVal;
    if (estimateItems?.length) {
      const countIndex = estimateItems.findIndex(
        estimateItem =>
          estimateItem?.typeId === itemInfo?.type?.id &&
          estimateItem?.itemId === itemInfo?.item?.id &&
          estimateItem?.specId === id,
      );
      if (countIndex >= 0) return estimateItems[countIndex]?.count;
    }
    return 0;
  };

  const updatestimate = () => {
    navigation.goBack();
  };

  // Update the count values.
  const updateCountValue = ({ material, count }: Materials) => {
    const { estimateItems } = formVal;
    if (estimateItems?.length) {
      const newMaterials = [...estimateItems];
      const deleteIndex = newMaterials.findIndex(
        estimateItem =>
          estimateItem?.typeId === itemInfo?.type?.id &&
          estimateItem?.itemId === itemInfo?.item?.id &&
          estimateItem?.specId === material?.id,
      );
      if (deleteIndex >= 0) newMaterials.splice(deleteIndex, 1);
      newMaterials.push({
        typeId: itemInfo?.type?.id || '',
        type: itemInfo?.type?.name || '',
        itemId: itemInfo?.item?.id || '',
        item: itemInfo?.item?.name || '',
        count: count || 0,
        specId: material?.id || '',
        spec: material?.name || '',
      });
      saveToFormValue(newMaterials);
    } else {
      saveToFormValue([
        {
          typeId: itemInfo?.type?.id || '',
          type: itemInfo?.type?.name || '',
          itemId: itemInfo?.item?.id || '',
          item: itemInfo?.item?.name || '',
          count: count || 0,
          specId: material?.id || '',
          spec: material?.name || '',
        },
      ]);
    }
  };

  // Saves the form by dispatch.
  const saveToFormValue = (estimateItems: FormValue) => {
    dispatch(addEstimate(estimateItems));
  };

  useEffect(() => {
    setLoading(true);
    setItemInfo({ type, item });
    setTimeout(() => {
      setLoading(false);
    }, 50);
  }, [type, item]);

  return (
    <Fragment>
      <View style={styles.boxcontainer}>
        <View style={styles.popup}>
          <Text style={styles.txt}>{numb}</Text>
        </View>
      </View>
      <View
        style={[
          styles.itemBotSheetHeader,
          {
            backgroundColor: colors.background,
            borderBottomColor: '#D8D6D6',
          },
        ]}>
        <View style={[styles.headerText, styles.alignMiddle]}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#474747', lineHeight: 29 }}>
            {`${itemInfo?.type?.name} - ${itemInfo?.item?.name}`}
          </Text>
        </View>
      </View>
      <BottomSheetScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.itemBotSheetContainer, { backgroundColor: colors.background }]}
        persistentScrollbar
        removeClippedSubviews>
        <View style={styles.itemBotSheetContent}>
          {loading ? (
            <View style={[{ flex: 1, flexDirection: 'column' }, styles.alignMiddle]}>
              <ActivityIndicator animating={loading} color={colors.text} />
            </View>
          ) : materialSpecList ? (
            materialSpecList.map(material => (
              <View style={styles.materialSpec} key={material.id}>
                <View style={{ flex: 1 }}>
                  <Text style={styless.btntxt}>{material.name}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <AddMinusButton
                    count={getCountValue(material)}
                    setNumb={setNumb}
                    numb={numb}
                    // style={styless.addMinusBtns}
                    style={[styles.addMinusBtn, { backgroundColor: colorss.btncolor }]}
                    updateCount={({ count }: { count: number }) => {
                      updateCountValue({ material, count });
                    }}
                  />
                </View>
              </View>
            ))
          ) : null}
        </View>
      </BottomSheetScrollView>
      <View style={styless.itemBotSheetContents}>
        <TouchableOpacity style={styless.savetxt} onPress={() => updatestimate()}>
          <Image source={require('../../assets/img/Group112.png')} style={styless.saveback} />
        </TouchableOpacity>
        <TouchableOpacity style={styless.savetxt} onPress={() => saveFormAndClose()}>
          <Text style={styless.savetxts}> Done</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default MaterialSpecView;
const styless = StyleSheet.create({
  btntxt: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    color: '#5A5959',
    marginLeft: 10,
  },
  itemBotSheetContents: {
    width: '100%',
    height: 75,
    borderBottomColor: '#D8D6D6',
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"#E1E1E1",
    flexDirection: 'row',
  },
  savetxt: {
    width: 116,
    height: 60,
    backgroundColor: colorss.btncolor,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  savetxts: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 29,
    color: colorss.white,
  },
  saveback: {
    width: 25,
    height: 30,
  },
  // addMinusBtns:{
  //   color:'#ffffff',
  //   backgroundColor:"#747883"
  // }
});
