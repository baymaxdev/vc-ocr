import React, {useContext, useLayoutEffect} from 'react';
import {View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Collection from '../../components/Collection';
import {TouchableOpacity} from 'react-native';
import NoImage from '../../assets/no-image.png';
import {ThemeContext} from '../../context';

const Home = ({navigation, data, getOCRText, removeData}) => {
  const theme = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onAdd}>
          <Text style={{...styles.addButton, color: theme.headerTintColor}}>
            Add
          </Text>
        </TouchableOpacity>
      ),
    });
    // removeData(0);
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
        getOCRText(response.uri, 'data:image/jpeg;base64,' + response.data);
      }
    });
  };

  const onPressImage = index => () => {
    navigation.navigate('Detail', {
      dataIndex: index,
    });
  };

  const renderImage = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={onPressImage(index)}>
        <Image
          style={styles.imageContainer}
          source={{uri: item.uri}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {data.data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={NoImage} style={styles.noImage} />
          <Text style={{...styles.noImageText, color: theme.mainColor}}>
            No images yet.
          </Text>
        </View>
      ) : (
        <Collection data={data.data} num={2} renderItem={renderImage} />
      )}
      {data.processing && (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="" />
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
