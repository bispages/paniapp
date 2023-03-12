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
  imageContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  image: { width: 350, height: 150 },
  textContainer: { flex: 0.3, alignItems: 'center', padding: 10 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 33.6,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 21.6,
  },
  circleContainer: { position: 'absolute', bottom: 20, flexDirection: 'row' },
  circle: {
    height: 8,
    width: 8,
    borderRadius: 8,
    margin: 10,
    backgroundColor: '#74879C',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: 160,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#6B7887',
  },
  buttonCircle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStarted: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
