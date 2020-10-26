import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
