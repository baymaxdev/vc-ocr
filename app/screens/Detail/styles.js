import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  boxContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    flex: 1,
  },
  textTitleContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.3,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton2: {
    padding: 10,
    marginLeft: 10,
    height: 40,
    borderRadius: 5,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
  },
  textAdd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.2,
  },
  textItem: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  textSelected: {
    color: 'white',
  },
  text: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    overflow: 'hidden',
  },
  textOriginal: {
    backgroundColor: 'green',
  },
  showButton: {
    padding: 10,
    backgroundColor: 'white',
  },
  showButtonText: {
    color: 'green',
    fontSize: 12,
  },
  textItemEdit: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    height: 40,
    borderRadius: 5,
  },
  textItemEditText: {
    fontSize: 16,
  },
});
