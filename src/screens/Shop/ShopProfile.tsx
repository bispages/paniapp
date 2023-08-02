import React, {useState, useCallback, useRef, useEffect, useMemo, RefObject } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, Keyboard, ImageBackground} from 'react-native';
// import { Text } from 'react-native-paper';
import { TextInput, useTheme, Text, Button } from 'react-native-paper';
import colors from '../../assets/colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import styless from '../Profile/Profile.style';
import { StackNavigationProp } from '@react-navigation/stack';
import { selectUserId } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { useGetUsersQuery, useUpdateUserProfileMutation } from '../../store/slices/IdentityApiSlice';
import { selectUser } from '../../store/selectors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  // PROFESSIONNUMBER,
  USERTYPE,
  USERFORM_BOTSHEET_SNAPMAX,
  USERFORM_BOTSHEET_SNAPMID,
  USERFORM_BOTSHEET_SNAPMIN,
} from '../../utils/constants';

const ShopProfile = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const userId = useSelector(selectUserId);
  const [isBotSheetActive, setIsBotSheetActive] = useState(false);
  const [image, setImage] = useState<Image | null>(null);
  const bottomSheet = useRef<BottomSheet>(null);
  const photoBottomSheet = useRef<BottomSheet>(null);
 
  // const { data: users } = useUpdateUserProfileMutation();
  const { data: users } = useGetUsersQuery(userId);
  console.log(users,"getUsersiooio");
  // const { appColors } = useTheme();
  const user = useSelector(selectUser);

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
  const saveDetails = async () => {
    const userDetails = {
      // userPhone,
      userName,
      userId,
      pincode,
      userType,
      image,
      place,
      // category: selectedItems,
      category: [],
    };
    await updateUserProfile(userDetails);
    AsyncStorage.setItem('user', JSON.stringify(userDetails)).then(() => {
      dispatchAction(saveUser(userDetails));
    });
  };
  const showBotSheet = useCallback((sheet: RefObject<BottomSheet>) => {
    keyboardDidHide();
    console.log('Hai');
    sheet.current?.snapToIndex(1);
  }, []);
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
  const closeBotSheet = useCallback((sheet: RefObject<BottomSheet>) => sheet.current?.close(), []);

  // console.log(JSON.stringify(mode?.userId),"12345678hjjgh");
  const { appColors } = useTheme();

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
              SELECT FROM GALLERY
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
      {/* <View style={styles.headcontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          
        </TouchableOpacity>
        <Text style={styles.profiletxt}>Shop Profile</Text>
      </View> */}
      <View style={styles.profilecontainer}>
      
        <View style={styles.profile}>
         
        {user?.image?.path ? (
              <Avatar.Image source={{ uri: user?.image?.path }} size={200} />
              
                // <ImageBackground
                //       source={{
                //         uri: image?.path,
                //       }}
                //       style={[
                //         styles.imgContainer,
                //         {
                //           borderColor: appColors.white,
                //           backgroundColor: appColors.dimwhite,
                //         },
                //       ]}
                //     /> 
              
            ) : (
              // <Avatar.Icon size={200} icon="account-circle" /> 
              <ImageBackground
                source={
                  require('../../assets/img/mdi_shop.png')
                  
                }
               
                    style={{resizeMode:'contain',width:140, height:140}}
                  
              
              /> 

            
            )}
        </View>
        <View style={styles.viewcontainer}>
        <Pressable
            disabled={isBotSheetActive}
            onPress={() => showBotSheet(photoBottomSheet)}
            style={[styles.editPic, { backgroundColor: appColors.secondary }]}>
            <Icon name="camera-plus" color={appColors.primary} size={14} />
          </Pressable>
          <Text style={styles.profiletag}>Add Profile Picture</Text>
        </View>
   
        
      </View>
      <View style={styles.details}>
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
              
                // defaultValue={userName}
                value={users?.userName}
                autoCorrect={false}
                autoComplete="name"
                // returnKeyType="next"
                textAlign="left"
                textContentType="name"
              />
           
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
               
                keyboardType="default"
                maxLength={40}
              
                // defaultValue={userName}
                value={users?.place}
                autoCorrect={false}
                autoComplete="name"
                // returnKeyType="next"
                textAlign="left"
                textContentType="name"
              />
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
               
                keyboardType="default"
                maxLength={6}
              
                defaultValue={Number}
                value={JSON.stringify(users?.pincode)}
                autoCorrect={false}
                autoComplete="name"
                // returnKeyType="next"
                textAlign="left"
                textContentType="name"
              />
              <TextInput
                mode="outlined"
                label="User Phone"
                theme={{
                  colors: {
                    primary: appColors.secondary,
                    text: appColors.primary,
                    background: appColors.white,
                  },
                }}
                style={styles.textInput}
               
                keyboardType="numeric"
                maxLength={10}
              
                value={JSON.stringify(users?.userPhone)}
               
                autoCorrect={false}
                // autoComplete="phone"
                returnKeyType="next"
                textAlign="left"
                textContentType="phone"
              />
       
      </View>

      <View style={styles.savebtn}>
        <TouchableOpacity style={styles.save}>
          <Text style={styles.savetxt}> Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShopProfile;
const styles = StyleSheet.create({
  profilecontainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    width: '70%',
    marginVertical:3
  },
  profiletxt: {
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 36,
    color: colors.title,
    marginHorizontal: 30,
  },
  imgback: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
  },
  profile: {
    width: 140,
    height: 140,
    borderWidth: 3.5,
    marginTop: 20,
    borderColor: colors.profileborder,
    borderRadius: 10,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  viewcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  editPic: {
    // position: 'absolute',
    bottom: 3,
    marginHorizontal: 2,
    // left: '55%',
    width: 24,
    height: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profiletag: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: -0.2,
    color: 'rgba(0,0,0,0.7)',
    marginVertical: 20,
  },
  headcontainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
    // backgroundColor:'red',
    marginTop:-50
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputdetails: {
    width: 319,
    height: 50,
    borderWidth: 2,
    borderColor: colors.inputborder,
    borderRadius: 7,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  savebtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  save: {
    width: 109,
    height: 60,
    color: colors.white,
    borderRadius: 30,
    backgroundColor: colors.btncolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savetxt: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '400',
    fontFamily: 'Gotham Rounded',
  },
});
