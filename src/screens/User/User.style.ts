import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#ffffff"
  },

  userBannerContainer: {
    flex: 0.5,
    width: '100%',
    overflow: 'hidden',
    top:80,
    zIndex:1
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

  icon: {
    opacity: 0.5,
  },

  editPic: {
    position: 'absolute',
    bottom: 15,
    left: '55%',
    width: 24,
    height: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formContainer: {
    flex: 0.7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    width: '100%',
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  preText: {
    paddingHorizontal: 8,
    marginRight: 8,
  },

  textInput: {
    width: '70%',
  },

  radioContainer: {
    width: '70%',
    display: 'flex',
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioCmp: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  radioChip: {
    marginLeft: '12%',
    borderWidth: 1,
  },
  categorybtnContainer: {
    width: '90%',
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  categoryButton: {
    width: '100%',
    height: 50,
  },
  savebtnContainer: {
    width: '100%',
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: '100%',
    height: 52,
    borderRadius:30,
    
  },
  listContainer: {
    flexWrap: 'wrap',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    justifyContent: 'center',
    backgroundColor:'#DADADA' 
  },
  dataListChip: {
    margin: 2,
    borderWidth: 1,
  },
  itemsListContainer: {
    width: '100%',
    height: 20,
    marginBottom: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    fontSize: 12,
    paddingHorizontal: 4,
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
    lineHeight:29
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
