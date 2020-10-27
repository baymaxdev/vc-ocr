import React, {useLayoutEffect, useState} from 'react';
import {View, Button, Text, Image, ActivityIndicator} from 'react-native';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';
import vision from '@react-native-firebase/ml-vision';
import {connect} from 'react-redux';
import {setData} from '../../store/actions';

const Home = ({navigation, data, setData}) => {
  const [processing, setProcessing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={onAdd} />,
    });
    console.log('store', data);
  });

  const onAdd = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setProcessing(true);
        const processed = await processDocument(response.uri);
        navigation.navigate('Detail', {
          uri: response.uri,
          data: processed,
        });

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }

      setProcessing(false);
    });
  };

  const processDocument = async localPath => {
    return await vision().cloudDocumentTextRecognizerProcessImage(localPath);
  };

  return (
    <View style={styles.container}>
      {processing && (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

// export default Home;

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = dispatch => ({
  setData: data => dispatch(setData(setData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
