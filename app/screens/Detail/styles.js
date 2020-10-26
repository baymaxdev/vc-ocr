import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
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
  textContainer: {
    flex: 1,
    // backgroundColor: 'white',
  },
  textTitleContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
  },
  textAdd: {
    fontSize: 20,
    color: 'blue',
  },
  textItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  textItem: {
    flex: 1,
  },
  textSelected: {
    color: 'white',
    backgroundColor: '#FF8888',
  },
  text: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    overflow: 'hidden',
  },
  textItemEdit: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    height: 40,
    borderRadius: 5,
  },
  textItemEditText: {
    color: 'green',
    fontSize: 16,
  },
});
