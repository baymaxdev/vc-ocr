import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import styles from './styles';

const EditModal = ({visible, original, defaultText, onClose}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(defaultText);
  }, [defaultText]);

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
          <Text style={styles.originalLabel}>Original:</Text>
          <Text style={styles.original}>{original}</Text>
          <Text style={styles.editLabel}>Edit here:</Text>
          <TextInput
            style={styles.edit}
            multiline
            defaultValue={defaultText}
            placeholder="Edit original text if there's something incorrect."
            value={text}
            onChangeText={setText}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditModal;
