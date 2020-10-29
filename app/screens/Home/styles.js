import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  addButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  collectionContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  deleteContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.5,
  },
  image: {
    flex: 1,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  check: {
    position: 'absolute',
    width: 30,
    height: 30,
    bottom: 10,
    right: 10,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
