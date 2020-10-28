import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    padding: 10,
  },
  addButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: 'red',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
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
  emptyContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImage: {
    width: 200,
    height: 200,
  },
  noImageText: {
    fontSize: 20,
    marginTop: 20,
  },
});
