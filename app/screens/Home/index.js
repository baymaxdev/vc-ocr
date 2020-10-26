import React, {useLayoutEffect, useState} from 'react';
import {View, StyleSheet, Button, Text, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import vision from '@react-native-firebase/ml-vision';

const Home = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('Hello world');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={onAdd} />,
    });
  });

  const onAdd = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage({
          uri: response.uri,
        });
        processDocument(response.uri).then(() =>
          console.log('Finished processing file.'),
        );

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  async function processDocument(localPath) {
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(
      localPath,
    );

    console.log('Found text in document: ', processed.text);
    setText(processed.text);

    processed.blocks.forEach(block => {
      console.log('Bounding box: ', block.boundingBox);
    });
  }

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default Home;
