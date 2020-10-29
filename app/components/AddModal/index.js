import React, {useContext, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {ThemeContext} from '../../context';
import styles from './styles';

const AddModal = ({visible, onClose}) => {
  const theme = useContext(ThemeContext);
  const [text, setText] = useState('');

  const onCancel = () => {
    onClose(null);
  };

  const onSave = () => {
    onClose(text);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        console.log('close');
      }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <Text style={styles.addTextLabel}>Add text:</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Please add new block."
            value={text}
            onChangeText={setText}
          />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={{...styles.cancelButton, borderColor: theme.mainColor}}
              onPress={onCancel}>
              <Text style={{...styles.cancelText, color: theme.mainColor}}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.saveButton,
                borderColor: theme.mainColor,
                backgroundColor: theme.mainColor,
              }}
              onPress={onSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddModal;
