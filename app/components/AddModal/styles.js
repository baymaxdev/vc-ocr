import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#f9fafb',
    width: 300,
    borderRadius: 10,
    padding: 20,
  },
  addTextLabel: {
    fontSize: 16,
    marginTop: 20,
    color: 'grey',
  },
  textInput: {
    marginTop: 10,
    fontSize: 16,
    borderRadius: 1,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    backgroundColor: 'white',
    padding: 10,
    height: 100,
  },
  buttons: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 0.45,
    backgroundColor: 'white',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    overflow: 'hidden',
  },
  saveButton: {
    flex: 0.45,
    backgroundColor: 'green',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cancelText: {
    fontSize: 16,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
