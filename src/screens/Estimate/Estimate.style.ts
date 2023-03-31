import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.white
  },
  headingContainer: {
    flex: 0.27,
    // marginTop:-10,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor:colors.white
    // backgroundColor:'red'
  },
  heading: {
    fontSize: 20,
    fontWeight: '400',
  },
  itemsContainer: {
    flex: 1,
    // backgroundColor:'red',
  //  marginTop:-20,
    width: '100%',
    backgroundColor:colors.white
  },
  listContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '3%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  block: {
    width: '45%',
    height: 120,
    margin: 5,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    
    backgroundColor:colors.materialbackground
  },
  panelButtonContainer: {
    width: '100%',
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'white'
  },
  panelButtonView: {
    width: '90%',
    marginTop: 5,
    flex: 0.3,
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  panelButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBotSheetContainer: {
    width: '100%',
    padding: '3%',
  },
  itemBotSheetHeader: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  itemBotSheetContent: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  materialSpec: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height:65,
    borderRadius:8,
    // paddingHorizontal: 60,
    marginVertical: 8,
    backgroundColor:colors.backgroundcard
  },
  addMinusBtn: {
    flexDirection: 'row',
    
    borderRadius: 4,
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  alignMiddle: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  headerText: {
    flex: 1,
    // paddingLeft: '15%',
    
    
  },
  panelTextContainer: {
    // flex: 0.7,
    width: '100%',
  },
  textContainer: {
    width: '100%',
    
    
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  box:{

  },


  preText: {
    // paddingHorizontal: 8,
    // marginRight: 8,
    width: '100%',
    borderColor: '#BEBEBE',
    borderRadius:8,
    borderWidth:2,

  },
  textInput: {
    width: '90%',
    marginTop: 5,
    height: 60,
  },
  saveBtnContainer: {
    width: '90%',
    flex: 0.12,
    zIndex: 0,
    marginTop: 15,
  },
  estimateView: {
    flex: 1,
    padding: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  customerContainer: {
    flex: 0.1,
  },
  customerInfoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  customerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  customerFont: {
    fontSize: 16,
  },
  estimateData: {
    flex: 0.9,
    paddingVertical: 15,
  },
  dataHeader: {},
  dataList: {},
  slNo: {
    textAlignVertical: 'center',
  },
  count: {
    textAlignVertical: 'center',
  },
  boxcontainer:{
    width:'100%',
    alignItems:'center',
    justifyContent:"center",
    // backgroundColor:'red',
    // marginTop:-50,
    // position:'absolute'
  },
  popup:{
    width:60,
    height:60,
    borderRadius:50,
    backgroundColor:'#747883',
    alignItems:'center',
    justifyContent:"center"
  },
  txt:{
    fontSize:20,
    color:'#ffffff'
  }
});

export default styles;
