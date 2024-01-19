import React, { useState, useCallback, useRef, useEffect, useMemo, RefObject } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, Keyboard, ImageBackground } from 'react-native';
import { TextInput, useTheme, Button } from 'react-native-paper';
import { Text } from 'react-native-paper';
import colors from '../../assets/colors';
import styless from './Profile.style';
import { useGetUsersQuery } from '../../store/slices/IdentityApiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUserId } from '../../store/selectors';
import { useSelector } from 'react-redux';
// import { Button } from 'react-native';
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
import RNFetchBlob from 'rn-fetch-blob';

const Profile = () => {
  const userId = useSelector(selectUserId);
  // const { data: userdet } = useGetNearUsersQuery(userId);
  const [base64String, setBase64String] = useState('');
  const [isBotSheetActive, setIsBotSheetActive] = useState(false);
  const [userPhone, setUserPhone] = useState('')
  const [image, setImage] = useState<Image | null>(null);
  const bottomSheet = useRef<BottomSheet>(null);
  const photoBottomSheet = useRef<BottomSheet>(null);
  const { data: users, isFetching, isError } = useGetUsersQuery(userId);

  if (isFetching) {
    return null;
  }
  console.log(users, 'getUsersiooio');
  console.log(image, 'ImageUpload');

  const onTextChange = () => {
    
    setUserPhone(users?.pincode);
  };

  const [mode, setMode] = useState('');

  AsyncStorage.getItem('user').then(value => {
    setMode(value || '');
  });
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
   
    AsyncStorage.setItem('userimgs',JSON.stringify(image));

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
        
        // convertToBase64(image.path);
        
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
        if ('path' in image) setImage(image.uri);
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
    setUserPhone(users?.pincode);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);
  // let base64code = ""

  // const convertToBase64 = async (image) => {
  //   const fileReader = new FileReader();

  //   fileReader.onload = () => {
  //     setBase64String(fileReader.result);
  //     console.log("setBase64String",base64String);
  //   };

  //   fileReader.onerror = (error) => {
  //     console.log('Error converting image to Base64:', error);
  //   };

  //   fetch(image)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       fileReader.readAsDataURL(blob);
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching image:', error);
  //     });
  // };

  // const convertToBase64 = (image) => {
  //   console.log('===============================================================',image);
  //   console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',image?.path);

    // RNFS.readFile(imagePath, 'base64')
    //   .then((base64String) => {
    //     console.log('Base64 string:', base64String);
    //     // Use the base64String for further processing or API upload
    //   })
    //   .catch((error) => {
    //     console.log('Error converting image to Base64:', error);
    //   });
  // };

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
      <View style={styles.profilecontainer}>
        <View style={styles.profile}>
        {console.log(image,"WWEEWW%^%^%^$%^%^")}
        {image ? (
          <ImageBackground
                source={{
                  uri: image?.path,
                }}
                style={[
                  styles.imgContainer,
                  {
                    borderColor: appColors.white,
                    backgroundColor: appColors.dimwhite,
                  },
                ]}
              /> 
        ) 
        : 
        <ImageBackground
                source={
                  require('../../assets/img/Vectorshop.png')
                }
                style={[
                  styles.imgContainer,
                  {
                    borderColor: appColors.white,
                    backgroundColor: appColors.dimwhite,
                  },
                ]}
              /> 
        }
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
        {console.log("ZZZZZZ",userPhone,users?.pincode)}
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
          keyboardType="numeric"
          maxLength={6}
          // defaultValue={users?.pincode}
          value={JSON.stringify(users?.pincode)}
          autoCorrect={false}
          // returnKeyType="next"
          textAlign="left"
          onChangeText={onTextChange}
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
        />
        {/* <Text>{users?.userPhone}</Text> */}
      </View>

      <View style={styles.savebtn}>
        <TouchableOpacity style={styles.save}
        onPress={saveDetails}>
          <Text style={styles.savetxt}> Save </Text>
        </TouchableOpacity>
      </View>
      {renderPhotoBottomSheet()}
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  textInput: {
    width: '70%',
    marginVertical: 3,
    zIndex: -1,
  },
  viewcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red"
  },
  listContainer: {
    flexWrap: 'wrap',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    justifyContent: 'center',
    backgroundColor: '#DADADA',
  },

  profilecontainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    width: 140,
    height: 140,
    borderWidth: 3.5,
    borderColor: colors.profileborder,
    borderRadius: 70,
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
  imgContainer: {
    width: 140,
    borderWidth: 4,
    borderRadius: 120,
    height: 140,
    bottom: -3.5,
    alignSelf: 'center',
    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
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
  panelTitle: {
    // height: 30,
    fontWeight: '700',
    fontSize: 22,
  },
  panelSubtitle: {
    color: 'gray',
    height: 30,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 29,
  },
  panelButtonContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelButtonView: {
    width: '90%',
    marginBottom: 20,
  },
  panelButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
