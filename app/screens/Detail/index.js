import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import EditModal from '../../components/EditModal';
import {getNumberOfLines} from '../../utils';
import * as actions from '../../store/actions';
import styles from './styles';
import {connect} from 'react-redux';
import {ThemeContext} from '../../context';

const Detail = ({navigation, route, data, addBlock, editBlock}) => {
  const {dataIndex} = route.params;
  const {uri, blocks} = data.data[dataIndex];
  const imgWidth = Dimensions.get('screen').width;
  const [imgHeight, setImgHeight] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState([]);

  const theme = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={onBack}>
          <Text style={{...styles.backButton, color: theme.headerTintColor}}>
            Back
          </Text>
        </TouchableOpacity>
      ),
    });
    // removeData(0);
  });

  useEffect(() => {
    Image.getSize(uri, (w, h) => {
      setImgHeight((h * imgWidth) / w);
      setRatio(imgWidth / w);
    });
  }, [imgWidth, uri]);

  useEffect(() => {
    setShow(Array(blocks.length).fill(false));
  }, [blocks]);

  const boundingBoxStyle = ({boundingBox, text, editedText}, index) => {
    const width = (boundingBox[2] - boundingBox[0]) * ratio;
    const height = (boundingBox[3] - boundingBox[1]) * ratio;
    const numberOfLines = getNumberOfLines(text);
    const style = {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      left: boundingBox[0] * ratio,
      top: boundingBox[1] * ratio,
      width,
      // height,
      fontSize: (height / numberOfLines) * 0.7,
      lineHeight: height / numberOfLines,
      letterSpacing: -0.5,
    };

    return selected === index
      ? {
          ...style,
          ...styles.textSelected,
        }
      : editedText
      ? {
          ...style,
          ...styles.textEdited,
          backgroundColor: theme.editedColor,
        }
      : style;
  };

  const textStyle = (index, editedText) =>
    selected === index
      ? {
          ...styles.text,
          ...styles.textSelected,
        }
      : editedText
      ? {
          ...styles.text,
          ...styles.textEdited,
          backgroundColor: theme.editedColor,
        }
      : styles.text;

  const onBack = () => {
    navigation.goBack();
  };

  const onPressText = index => () => {
    setSelected(index);
  };

  const onPressEdit = index => () => {
    setSelected(index);
    setModalVisible(true);
  };

  const onPressShow = index => () => {
    const value = show[index];
    const newShow = [...show];
    newShow.splice(index, 1, !value);
    setShow(newShow);
  };

  const onCloseModal = text => {
    setModalVisible(false);
    if (text) {
      editBlock(text, selected, dataIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView horizontal={false}>
          <Image source={{uri}} style={{width: imgWidth, height: imgHeight}} />
          <View style={styles.boxContainer}>
            {blocks.map((block, index) => (
              <TouchableOpacity
                onPress={onPressText(index)}
                key={index.toString()}>
                <Text style={boundingBoxStyle(block, index)}>
                  {block.editedText || block.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textTitleContainer}>
          <Text style={{...styles.textTitle, color: theme.mainColor}}>
            Recognized Text Blocks
          </Text>
          <TouchableOpacity
            style={{
              ...styles.addButton,
              backgroundColor: theme.mainColor,
              shadowColor: theme.mainColor,
            }}>
            <Text style={styles.textAdd}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={false}>
          {blocks.map((block, index) => (
            <View style={styles.textItemContainer} key={index.toString()}>
              <TouchableOpacity
                style={styles.textItem}
                disabled={selected === index}
                onPress={onPressText(index)}>
                <Text style={textStyle(index, block.editedText)}>
                  {block.editedText || block.text}
                </Text>
                {show[index] && (
                  <Text
                    style={{
                      ...textStyle(index, block.editedText),
                      ...styles.textOriginal,
                    }}>
                    {block.text}
                  </Text>
                )}
                {block.editedText && (
                  <TouchableOpacity
                    style={styles.showButton}
                    onPress={onPressShow(index)}>
                    <Text
                      style={{
                        ...styles.showButtonText,
                        color: theme.mainColor,
                      }}>
                      {show[index] ? 'Show less' : 'Show original'}
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
              {selected === index && (
                <TouchableOpacity
                  style={styles.textItemEdit}
                  onPress={onPressEdit(index)}>
                  <Text
                    style={{
                      ...styles.textItemEditText,
                      color: theme.mainColor,
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <EditModal
        visible={modalVisible}
        original={blocks[selected] ? blocks[selected].text : ''}
        defaultText={
          blocks[selected]
            ? blocks[selected].editedText || blocks[selected].text
            : ''
        }
        onClose={onCloseModal}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = {
  addBlock: actions.addBlock,
  editBlock: actions.editBlock,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
