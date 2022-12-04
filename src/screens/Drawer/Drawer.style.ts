import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 22,
    // marginTop: 3,
    fontWeight: 'bold',
    lineHeight:24,
    color:"#424242"

  },
  caption: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight:22,
    color:"#717171"
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    // borderTopColor: '#f4f4f4',
    // borderTopWidth: 1,
    
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
