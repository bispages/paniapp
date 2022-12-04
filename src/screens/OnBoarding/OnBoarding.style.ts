import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: { 
    // paddingBottom: 10 
  },
  imageContainer: { 
    flex: 0.7, 
    justifyContent: 'center' 
  },
  image: { width:350, height:150 },
  textContainer: { flex: 0.3, alignItems: 'center', padding: 10 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
    lineHeight:33.6
  },
  description: {
    fontSize: 18,
    fontWeight: '300',
    color: '#000000',
    textAlign: 'center',
    lineHeight:21.6
  },
  square: {
    backgroundColor: '#ffffff',
    // borderRadius: 80,
    // position: 'absolute',
  },
  circleContainer: { position: 'absolute', bottom: 20, flexDirection: 'row' },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 8,
    margin: 10,
    backgroundColor: '#74879C',
  },
  buttonCircleContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonCircle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
