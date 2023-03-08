import React, { useEffect, useState, useRef, useCallback, useMemo, RefObject } from 'react';
import { Text, View, Keyboard, Pressable, ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import { TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './User.style';
import {
  // PROFESSIONNUMBER,
  USERTYPE,
  USERFORM_BOTSHEET_SNAPMAX,
  USERFORM_BOTSHEET_SNAPMID,
  USERFORM_BOTSHEET_SNAPMIN,
} from '../../utils/constants';
import useBackHandler from '../../hooks/useBackHandler';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { saveUser } from '../../store/slices/AppStateSlice';
// import { professionList } from '../../utils/professionList';
// import { categoryList } from '../../utils/categoryList';

type routeParams = {
  route: { params: { userPhone: string } };
};

const UserForm = ({ route: { params } }: routeParams) => {
  const { userPhone } = params;
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [place, setPlace] = useState('');
  const [userType, setUserType] = useState(USERTYPE.USER);
  const [image, setImage] = useState<Image | null>(null);
  // const [selectedItems, setSelectedItems] = useState<ItemList[]>([]);
  const [saveDisabled, setSaveDisabled] = useState(true);
  // const [dataList, setDataList] = useState(professionList);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [isBotSheetActive, setIsBotSheetActive] = useState(false);
  const bottomSheet = useRef<BottomSheet>(null);
  const photoBottomSheet = useRef<BottomSheet>(null);
  const windowWidth = useWindowDimensions().width;
  const { appColors } = useTheme();
  const dispatchAction = useDispatch();
  const user = AsyncStorage.getItem('usertype');

  const snapPoints = useMemo(
    () => [USERFORM_BOTSHEET_SNAPMIN, USERFORM_BOTSHEET_SNAPMID, USERFORM_BOTSHEET_SNAPMAX],
    [],
  );
  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />
    ),
    [],
  );

  const handleSheetChanges = useCallback(
    (index: number, sheet: RefObject<BottomSheet>) => {
      if (index <= 0) {
        sheet.current?.close();
        setIsBotSheetActive(false);
      } else {
        setIsBotSheetActive(true);
      }
    },
    [isBotSheetActive],
  );

  const showBotSheet = useCallback((sheet: RefObject<BottomSheet>) => {
    keyboardDidHide();
    sheet.current?.snapToIndex(1);
  }, []);

  const closeBotSheet = useCallback((sheet: RefObject<BottomSheet>) => sheet.current?.close(), []);

  const backAction = useCallback(() => {
    if (isBotSheetActive) {
      closeBotSheet(bottomSheet);
      closeBotSheet(photoBottomSheet);
      return true;
    }
    return false;
  }, [isBotSheetActive]);

  // Adds hardware BackHandler hook.
  useBackHandler(backAction);

  const keyboardDidHide = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    // Keyboard events.
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const onDismissSnackBar = () => {
    setShowSnack(false);
    setMessage('');
  };

  // useEffect(() => {
  //   const list = userType === USERTYPE_USER ? professionList : categoryList;
  //   setDataList(list);
  //   setSelectedItems([]);
  // }, [userType]);

  useEffect(() => {
    if (pincode.length >= 6) Keyboard.dismiss();
    // setSaveDisabled(!(name && pincode && selectedItems.length > 0));
    setSaveDisabled(!(name && pincode && place));
  }, [name, pincode, place]);
  // }, [name, pincode, selectedItems]);

  const saveDetails = () => {
    const userDetails = {
      userPhone,
      name,
      pincode,
      userType,
      image,
      place,
      // category: selectedItems,
      category: [],
    };
    AsyncStorage.setItem('user', JSON.stringify(userDetails)).then(() => {
      dispatchAction(saveUser(userDetails));
    });
  };

  // const updateSelectedItems = (item: ItemList, index: number) => {
  //   if (
  //     selectedItems.length <= PROFESSIONNUMBER - 1 ||
  //     (item.selected !== undefined && item.selected)
  //   ) {
  //     let itemsSelectedList: ItemList[] = [];
  //     let currentItem = {} as ItemList;
  //     if (item.selected === undefined || !item.selected) {
  //       currentItem = { ...item, selected: true };
  //       itemsSelectedList = [currentItem, ...selectedItems];
  //     } else {
  //       currentItem = { ...item, selected: false };
  //       itemsSelectedList = selectedItems.filter(
  //         (selectedItem: ItemList) => item.id !== selectedItem.id,
  //       );
  //     }
  //     const newDataList = dataList.slice();
  //     newDataList[index] = currentItem;
  //     setSelectedItems(itemsSelectedList);
  //     setDataList(newDataList);
  //   } else {
  //     setMessage(`Can't add more`);
  //     setShowSnack(true);
  //   }
  // };

  // const renderBottomSheet = () => (
  //   <BottomSheet
  //     ref={bottomSheet}
  //     index={-1}
  //     snapPoints={snapPoints}
  //     onChange={(index: number) => handleSheetChanges(index, bottomSheet)}
  //     backdropComponent={renderBackdrop}>
  //     <BottomSheetScrollView
  //       showsHorizontalScrollIndicator={false}
  //       contentContainerStyle={[styles.listContainer]}
  //       persistentScrollbar
  //       removeClippedSubviews>
  //       {dataList.map((item: ItemList, index: number) => {
  //         return (
  //           <Chip
  //             key={item.id}
  //             icon={
  //               userType === USERTYPE_SHOP
  //                 ? 'store-outline'
  //                 : 'account-circle-outline'
  //             }
  //             style={
  //               item.selected
  //                 ? [
  //                     styles.dataListChip,
  //                     {
  //                       backgroundColor: colors.accent,
  //                       borderColor: colors.accent,
  //                     },
  //                   ]
  //                 : [
  //                     styles.dataListChip,
  //                     {
  //                       backgroundColor: colors.text,
  //                       borderColor: colors.disabled,
  //                     },
  //                   ]
  //             }
  //             textStyle={
  //               item.selected
  //                 ? { color: colors.text }
  //                 : { color: colors.primary }
  //             }
  //             selected={item?.selected ?? false}
  //             selectedColor={item.selected ? colors.text : colors.primary}
  //             onPress={() => updateSelectedItems({ ...item }, index)}>
  //             {item.name}
  //           </Chip>
  //         );
  //       })}
  //     </BottomSheetScrollView>
  //   </BottomSheet>
  // );

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 120,
      compressImageMaxHeight: 120,
      cropping: true,
      mediaType: 'photo',
    })
      .then((image: Image) => {
        closeBotSheet(photoBottomSheet);
        if ('path' in image) setImage(image);
      })
      .catch(err => console.log(err));
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 120,
      height: 120,
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      cropperActiveWidgetColor: appColors.secondary,
    })
      .then((image: Image) => {
        closeBotSheet(photoBottomSheet);
        if ('path' in image) setImage(image);
      })
      .catch(err => console.log(err));
  };

  const renderPhotoBottomSheet = () => (
    <BottomSheet
      ref={photoBottomSheet}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={(index: number) => handleSheetChanges(index, photoBottomSheet)}
      backdropComponent={renderBackdrop}>
      <BottomSheetScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        persistentScrollbar
        removeClippedSubviews>
        <View style={{ alignItems: 'center', paddingTop: 10 }}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <View style={[styles.panelButtonContainer]}>
          <View style={[styles.panelButtonView]}>
            <Button
              dark
              loading={false}
              mode="contained"
              onPress={takePhotoFromCamera}
              contentStyle={styles.panelButton}
              theme={{
                colors: {
                  primary: appColors.secondary,
                },
              }}>
              TAKE PHOTO
            </Button>
          </View>
          <View style={[styles.panelButtonView]}>
            <Button
              dark
              loading={false}
              mode="contained"
              onPress={choosePhotoFromLibrary}
              contentStyle={styles.panelButton}
              theme={{
                colors: {
                  primary: appColors.secondary,
                },
              }}>
              CHOOSE FROM LIBRARY
            </Button>
          </View>
          <View style={[styles.panelButtonView]}>
            <Button
              dark
              loading={false}
              mode="contained"
              onPress={() => closeBotSheet(photoBottomSheet)}
              contentStyle={styles.panelButton}
              theme={{
                colors: {
                  primary: appColors.secondary,
                },
              }}>
              CANCEL
            </Button>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );

  return (
    <View style={styless.container}>
      <View style={[styles.container, { backgroundColor: appColors.userpagetopback }]}>
        {/* <View style={styless.logocontainer}> */}
        {/* <Image source={require('../../assets/img/panilogo.png')}
        style={styless.logo}
        /> */}

        {/* </View> */}
        <View style={[styles.userBannerContainer]}>
          {image ? (
            <>
              <ImageBackground
                source={{
                  uri: image.path,
                }}
                style={[
                  styles.imgContainer,
                  {
                    borderColor: appColors.white,
                    backgroundColor: appColors.dimwhite,
                  },
                ]}
              />
              <Pressable
                disabled={isBotSheetActive}
                onPress={() => showBotSheet(photoBottomSheet)}
                style={[styles.editPic, { backgroundColor: appColors.secondary }]}>
                <Icon name="camera-plus" color={appColors.primary} size={14} />
              </Pressable>
            </>
          ) : (
            <Pressable
              disabled={isBotSheetActive}
              style={[
                styles.imgContainer,
                {
                  borderColor: appColors.white,
                  backgroundColor: appColors.dimwhite,
                },
              ]}
              onPress={() => showBotSheet(photoBottomSheet)}>
              <Icon name="camera-plus-outline" color={appColors.primary} size={30} style={styles.icon} />
            </Pressable>
          )}
        </View>
        <View style={[styles.formContainer]}>
          <>
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  width: windowWidth,
                  height: windowWidth * 2,

                  backgroundColor: '#ffffff',
                  transform: [{ translateY: -windowWidth * 0.01 }],
                },
              ]}
            />
            <View style={[styles.textContainer]}>
              <TextInput
                mode="outlined"
                label="Name"
                // left={
                //   <TextInput.Icon
                //     name="account-outline"
                //     style={styles.preText}
                //     color={appColors.secondary}
                //   />
                // }
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={[styles.textInput]}
                keyboardType="default"
                maxLength={40}
                onChangeText={(text: string) => setName(text)}
                defaultValue={name}
                value={name}
                autoCorrect={false}
                autoComplete="name"
                returnKeyType="next"
                textAlign="left"
                textContentType="name"
              />
            </View>
            <View style={[styles.textContainer]}>
              <TextInput
                mode="outlined"
                label="Pincode"
                // left={
                //   <TextInput.Icon
                //     name="map-marker-outline"
                //     style={styles.preText}
                //     color={appColors.secondary}
                //   />
                // }
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={[styles.textInput]}
                keyboardType="numeric"
                maxLength={6}
                onChangeText={(text: string) => setPincode(text)}
                defaultValue={pincode}
                value={pincode}
                autoCorrect={false}
                autoComplete="postal-code"
                returnKeyType="next"
                textAlign="left"
                textContentType="postalCode"
              />
            </View>
            <View style={[styles.textContainer]}>
              <TextInput
                mode="outlined"
                label="Place"
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={[styles.textInput]}
                // keyboardType="default"
                maxLength={80}
                onChangeText={(text: string) => setPlace(text)}
                defaultValue={place}
                value={place}
                autoCorrect={false}
                // autoCompleteType="place"
                // returnKeyType="next"
                // textAlign="left"
                // textContentType="name"
              />
            </View>
            {console.log(user)}

            <View style={styles.savebtnContainer}>
              <Button
                dark
                loading={false}
                mode="contained"
                disabled={saveDisabled}
                onPress={saveDetails}
                style={styless.saveButton}
                theme={{
                  colors: {
                    primary: appColors.btncolor,
                  },
                }}>
                SAVE
              </Button>
            </View>
          </>
        </View>
      </View>
      <Snackbar
        visible={showSnack}
        duration={1000}
        onDismiss={onDismissSnackBar}
        theme={{
          colors: { surface: appColors.white, onSurface: appColors.error },
        }}>
        {message}
      </Snackbar>

      {renderPhotoBottomSheet()}
    </View>
  );
};

export default UserForm;
const styless = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DfDfDf',
  },
  logocontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: '30%',
    height: 52,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
