import React, {useEffect, useState} from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import EditModal from '../../components/EditModal';
import {getNumberOfLines} from '../../utils';
import styles from './styles';

const Detail = ({route}) => {
  const {uri, data} = route.params;
  const imgWidth = Dimensions.get('screen').width;
  const [imgHeight, setImgHeight] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Image.getSize(uri, (w, h) => {
      setImgHeight((h * imgWidth) / w);
      setRatio(imgWidth / w);
    });
  }, [imgWidth, uri]);

  const boundingBoxStyle = ({boundingBox, text}) => {
    const width = (boundingBox[2] - boundingBox[0]) * ratio;
    const height = (boundingBox[3] - boundingBox[1]) * ratio;
    const numberOfLines = getNumberOfLines(text);
    return {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      left: boundingBox[0] * ratio,
      top: boundingBox[1] * ratio,
      width,
      height,
      fontSize: (height / numberOfLines) * 0.8,
      lineHeight: height / numberOfLines,
      letterSpacing: -0.5,
    };
  };

  const onPressText = index => () => {
    setSelected(index);
  };

  const onPressEdit = index => () => {
    setSelected(index);
    setModalVisible(true);
  };

  const onCloseModal = text => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView horizontal={false}>
          <Image source={{uri}} style={{width: imgWidth, height: imgHeight}} />
          <View style={styles.boxContainer}>
            {data.blocks.map((block, index) => (
              <TouchableOpacity onPress={onPressText(index)}>
                <Text
                  key={index.toString()}
                  style={
                    selected === index
                      ? {...boundingBoxStyle(block), ...styles.textSelected}
                      : boundingBoxStyle(block)
                  }>
                  {block.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textTitleContainer}>
          <Text style={styles.textTitle}>Recognized Text Blocks</Text>
          <TouchableOpacity>
            <Text style={styles.textAdd}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={false}>
          {data.blocks.map((block, index) => (
            <View style={styles.textItemContainer}>
              <TouchableOpacity
                key={index.toString()}
                style={styles.textItem}
                disabled={selected === index}
                onPress={onPressText(index)}>
                <Text
                  style={
                    selected === index
                      ? {
                          ...styles.text,
                          ...styles.textSelected,
                        }
                      : styles.text
                  }>
                  {block.text}
                </Text>
              </TouchableOpacity>
              {selected === index && (
                <TouchableOpacity
                  style={styles.textItemEdit}
                  onPress={onPressEdit(index)}>
                  <Text style={styles.textItemEditText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <EditModal
        visible={modalVisible}
        original={data.blocks[selected].text}
        defaultText={data.blocks[selected].text}
        onClose={onCloseModal}
      />
    </View>
  );
};

export default Detail;
