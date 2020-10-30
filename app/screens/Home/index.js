import React, {useContext, useLayoutEffect, useState} from 'react';
import {View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Collection from '../../components/Collection';
import {TouchableOpacity} from 'react-native';
import {ThemeContext} from '../../context';
import NoImage from '../../assets/no-image.png';
import Check from '../../assets/check.png';

const Home = ({navigation, data, getOCRText, removeData}) => {
  const theme = useContext(ThemeContext);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        deleteMode ? null : (
          <TouchableOpacity onPress={onAdd} disabled={data.processing}>
            <Text style={{...styles.addButton, color: theme.headerTintColor}}>
              Add
            </Text>
          </TouchableOpacity>
        ),
    });
  });

  const onAdd = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      tintColor: theme.mainColor,
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
    if (deleteMode) {
      setSelectedImages({
        ...selectedImages,
        [index]: !selectedImages[index],
      });
    } else {
      navigation.navigate('Detail', {
        dataIndex: index,
      });
    }
  };

  const onLongPressImage = index => () => {
    if (!deleteMode) {
      setDeleteMode(true);
      setSelectedImages({[index]: true});
    }
  };

  const onCancelRemove = () => {
    setDeleteMode(false);
    setSelectedImages({});
  };

  const onRemove = () => {
    const indexes = Object.keys(selectedImages).filter(
      key => selectedImages[key],
    );
    removeData(indexes);
    setDeleteMode(false);
    setSelectedImages({});
  };

  const renderImage = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={onPressImage(index)}
        onLongPress={onLongPressImage(index)}>
        <Image
          style={styles.image}
          source={{uri: item.uri}}
          resizeMode="contain"
        />
        {selectedImages[index] && (
          <View style={styles.imageOverlay}>
            <Image
              style={{...styles.check, tintColor: theme.mainColor}}
              source={Check}
            />
          </View>
        )}
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
        <View style={styles.collectionContainer}>
          {deleteMode && (
            <View style={styles.deleteContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={onCancelRemove}>
                <Text
                  style={{...styles.deleteButtonText, color: theme.mainColor}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
                <Text
                  style={{...styles.deleteButtonText, color: theme.mainColor}}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Collection data={data.data} num={2} renderItem={renderImage} />
        </View>
      )}
      {data.processing && (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color={theme.mainColor} />
          <Text style={{...styles.noImageText, color: theme.mainColor}}>
            Processing...
          </Text>
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
