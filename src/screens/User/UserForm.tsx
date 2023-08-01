import React, { useEffect, useState, useRef, useCallback, useMemo, RefObject } from 'react';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  Alert,
  TouchableOpacity,
  NativeEventEmitter,
} from 'react-native';
import { TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation } from '@react-navigation/native';
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
import { useUpdateUserProfileMutation, useGetPlacesQuery } from '../../store/slices/IdentityApiSlice';
import { selectUserId } from '../../store/selectors';
import { StackNavigationProp } from '@react-navigation/stack';
// import RNFS from 'react-native-fs'
import RNFS from 'react-native-fs';
// import { professionList } from '../../utils/professionList';
// import { categoryList } from '../../utils/categoryList';

// type routeParams = {
//   route: { params: { userPhone: string } };
// };

const UserForm = ({ route: { params = null } }: routeParams) => {
  const { item } = params;
console.log("PINCODE",item)
  const userId = useSelector(selectUserId);
  const [base64Image, setBase64Image] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [userName, setUserName] = useState('');
  const [pincode, setPincode] = useState();
  const [place, setPlace] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState(''); 
  const [openmode, setOpenmode] = useState(false);
  const [search, setSearch] = useState('');
  const [userType, setUserType] = useState(USERTYPE.USER);
  const [image, setImage] = useState<Image | null>(null);
  // const [selectedItems, setSelectedItems] = useState<ItemList[]>([]);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [usderadd, setUsderadd] = useState('');
  // const [dataList, setDataList] = useState(professionList);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [isBotSheetActive, setIsBotSheetActive] = useState(false);
  const bottomSheet = useRef<BottomSheet>(null);
  const photoBottomSheet = useRef<BottomSheet>(null);
  const windowWidth = useWindowDimensions().width;
  const { appColors } = useTheme();
  const dispatchAction = useDispatch();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [updateUserProfile, { isLoading: updateUserProfileLoader }] = useUpdateUserProfileMutation();
  const { data: locationdet, error } = useGetPlacesQuery(search);
  // {console.log("1112233",locationdet)}
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

 const onFocuss = () => {
  setOpenmode(true);
  }

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
  // AsyncStorage.getItem('useradddet').then(value => {
  //   setUsderadd(JSON.parse(value) || '');
  // });

  const searchFilter = (text) => {

    setSearch(text);
    
     }

  useEffect(()=> {

    console.log(locationdet,"locationdet");
    console.log(error,"error")
  },[locationdet, error])

  useEffect(() => {
    
    // setPincode(item ? item?.pincode : '');
    // setPlace(item ? item?.placeName : '');
    // setLatitude(item ? item?.latitude : ''); 
    // setLongitude(item ? item?.longitude : '');
    // Keyboard events.
    AsyncStorage.getItem('useradddet').then(value => {
      setUsderadd(JSON.parse(value) || '');
    });
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
console.log(pincode,"PINCODEITEM")
//   setPincode(item ? item?.pin : '');
  
// },[]);


  useEffect(() => {
    
    // if (pincode.length >= 6) Keyboard.dismiss();
  
    setSaveDisabled(!(userName && pincode));

    
   
  }, [userName, pincode]);
  // }, [userName, pincode, selectedItems]);

  const selectaction = (item) => {
    setPincode(item?.pincode);
    setPlace(item?.placeName);
    setLatitude(item?.latitude); 
    setLongitude(item?.longitude);
    setOpenmode(false);
    // navigation.navigate('userform', {item});
   }

  console.log("QQQQWWWW",userType)
  
  const saveDetails = async () => {
    const userDetails = {
      // userPhone,
      userName,
      userId,
      pincode,
      userType,
      image,
      place,
      longitude,
      latitude,
      // category: selectedItems,
      category: [],
    };
    await updateUserProfile(userDetails);
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
  //             {item.userName}
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
        if ('path' in image) 
          setImage(image);
        //   RNFS.readFile(response.uri, 'base64')
        //   .then((base64String) => setBase64Image(`data:${response.type};base64,${base64String}`))
        //   .catch((error) => console.log('Error reading image file:', error.message));
        // setBase64Image(base64String);
        
        // setImage(image)
        // setBase64Image(RNFS.readFile(image?.path,'base64'));
       
      })
      .catch(err => console.log(err));
  };

  console.log("wwww",base64Image);
  console.log("mmmm",image);

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
                  primary: appColors.btncolor,
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
                  primary: appColors.btncolor,
                },
              }}>
               FROM GALLERY
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
                  primary: appColors.btncolor,
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
      {
        openmode === true ? 
        <View style={styles.opencontainer}>
          
        <TextInput 
        // style={{ backgroundColor:'#fff',borderWidth:1, margin:8,
        //  paddingHorizontal:12, borderRadius:8, borderColor:'#BEBEBE', fontSize:16, 
        // lineHeight:26,color:"#424242",fontWeight:'500', caretColor:'red'}}
       
                theme={{
                  colors: {
                    primary: "#BEBEBE",
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={[styles.textInput2]}
        value={search}
        placeholder='Search Place or Pincode'
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}/>
          
          {
            locationdet?.map((item,key)=> {
              return (
                <TouchableOpacity
    style={{height:60, backgroundColor:'rgba(243, 243, 243, 0.8)', paddingHorizontal:15,
    borderRadius:8, margin:8, display:'flex', flexDirection:'row',justifyContent:'space-between'}}
    onPress={()=>selectaction(item)}>
     
      <View style={{ display:'flex', flexDirection:'column', height:60,
      justifyContent:'center'}}>
      <Text style={{fontSize:16,lineHeight:24,color:"#424242",fontWeight:'500'}}>
      {item?.placeName}
      </Text>
    <Text style={{fontSize:16,lineHeight:24,color:"#424242",fontWeight:'500'}}>
      {item?.district}
    </Text>
    </View>
    <View style={{height:60, display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:16,lineHeight:26,color:"#424242",fontWeight:'500'}}>
      {item?.pincode}
    </Text>
    </View>

    </TouchableOpacity> 

              )

            })
          }
           

          {/* <TouchableOpacity>
          <Text>sdfghj</Text>
          </TouchableOpacity> */}

        </View>
        :
        ('')
      }
      <View style={[styles.container, { backgroundColor: appColors.userpagetopback }]}>
        {/* <View style={styless.logocontainer}> */}

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
                  transform: [{ translateY: -windowWidth * 0.02 }],
                },
              ]}
            />
            <View style={[styles.textContainer]}>
              <TextInput
                mode="outlined"
                label="Name"
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
                onChangeText={(text: string) => setUserName(text)}
                defaultValue={userName}
                value={userName}
                autoCorrect={false}
                autoComplete="name"
                // returnKeyType="next"
                textAlign="left"
                textContentType="name"
              />
            </View>

            <View style={[styles.textContainer]}>
              <TextInput
                mode="outlined"
                label="Pincode"
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={[styles.textInput]}
                // keyboardType="none"
                maxLength={40}
                onFocus={onFocuss}
                onChangeText={(text: string) => setPincode(text)}
                // onChangeText={(text: string) => setPlace(usderadd)}
                defaultValue={pincode}
                value={JSON.stringify(pincode)}
               
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
                
                maxLength={40}
                onFocus={onFocuss}
                onChangeText={(text: string) => setPlace(text)}
                // onChangeText={(text: string) => setPlace(usderadd)}
                defaultValue={place}
                value={ place }
                
              />
            </View>
          

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
        // duration={1000}
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
  textInputtouch: {
    width: '70%',
    height: 50,
    borderWidth: 1,
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'red',
  },
  imgContainer: {
    width: 140,
    borderWidth: 4,
    borderRadius: 120,
    height: 140,
    bottom: 30,
    alignSelf: 'center',
    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
