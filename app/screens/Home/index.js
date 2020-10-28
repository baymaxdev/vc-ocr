import React, {useEffect, useLayoutEffect} from 'react';
import {View, Button, Text, Image, ActivityIndicator} from 'react-native';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Collection from '../../components/Collection';
import {TouchableOpacity} from 'react-native';

const Home = ({navigation, data, getOCRText, removeData}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={onAdd} />,
    });
    // removeData(0);
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

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
        getOCRText(response.uri);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const onPressImage = item => () => {
    navigation.navigate('Detail', item);
  };

  const renderImage = item => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={onPressImage(item)}>
      <Image style={styles.imageContainer} source={{uri: item.uri}} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Collection data={data.data} num={3} renderItem={renderImage} />
      {data.processing && (
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

const mapDispatchToProps = {
  getOCRText: actions.getOCRText,
  removeData: actions.removeData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
