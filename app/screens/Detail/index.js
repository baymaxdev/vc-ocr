import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import EditModal from '../../components/EditModal';
import {getNumberOfLines} from '../../utils';
import * as actions from '../../store/actions';
import styles from './styles';
import {connect} from 'react-redux';
import {ThemeContext} from '../../context';
import AddModal from '../../components/AddModal';

const Detail = ({navigation, route, data, addBlock, editBlock}) => {
  const {dataIndex} = route.params;
  const {uri, blocks} = data.data[dataIndex];
  const imgWidth = Dimensions.get('screen').width;
  const [imgHeight, setImgHeight] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [show, setShow] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [drawStart, setDrawStart] = useState({x: 0, y: 0});
  const [drawEnd, setDrawEnd] = useState({x: 0, y: 0});

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
      headerRight: () => (
        <TouchableOpacity onPress={onAddBlock}>
          <Text style={{...styles.addButton, color: theme.headerTintColor}}>
            {addMode ? 'Cancel' : 'Add'}
          </Text>
        </TouchableOpacity>
      ),
    });
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

  const boundingBoxStyle = (
    {boundingBox, text, editedText, isAdded},
    index,
  ) => {
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
          backgroundColor: theme.selectedColor,
        }
      : isAdded
      ? {
          ...style,
          ...styles.textSelected,
          backgroundColor: theme.addedColor,
        }
      : editedText
      ? {
          ...style,
          ...styles.textSelected,
          backgroundColor: theme.editedColor,
        }
      : style;
  };

  const textStyle = (index, block) =>
    selected === index
      ? {
          ...styles.text,
          ...styles.textSelected,
          backgroundColor: theme.selectedColor,
        }
      : block.isAdded
      ? {
          ...styles.text,
          ...styles.textSelected,
          backgroundColor: theme.addedColor,
        }
      : block.editedText
      ? {
          ...styles.text,
          ...styles.textSelected,
          backgroundColor: theme.editedColor,
        }
      : styles.text;

  const addModeStyle = () => ({
    position: 'absolute',
    backgroundColor: theme.addedColor,
    left: drawStart.x,
    top: drawStart.y,
    width: drawEnd.x - drawStart.x,
    height: drawEnd.y - drawStart.y,
  });

  const onBack = () => {
    navigation.goBack();
  };

  const onAddBlock = () => {
    if (addMode) {
      setAddMode(false);
    } else {
      setAddMode(true);
      setDrawStart({x: 0, y: 0});
      setDrawEnd({x: 0, y: 0});
    }
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

  const onCloseAddModal = text => {
    setAddModalVisible(false);
    setAddMode(false);
    if (text) {
      const newBlock = {
        boundingBox: [
          drawStart.x / ratio,
          drawStart.y / ratio,
          drawEnd.x / ratio,
          drawEnd.y / ratio,
        ],
        text,
        isAdded: true,
      };
      addBlock(newBlock, dataIndex);
    }
  };

  const onDrawStart = event => {
    const pos = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    };
    setDrawStart(pos);
    setDrawEnd(pos);
  };

  const onDrawMove = event => {
    const pos = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    };
    setDrawEnd(pos);
  };

  const onDrawEnd = event => {
    const pos = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    };
    setDrawEnd(pos);
    setAddModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView horizontal={false} scrollEnabled={!addMode}>
          <Image source={{uri}} style={{width: imgWidth, height: imgHeight}} />
          {!addMode && (
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
          )}
          {addMode && (
            <View
              style={styles.drawContainer}
              onTouchStart={onDrawStart}
              onTouchMove={onDrawMove}
              onTouchEnd={onDrawEnd}>
              <View style={addModeStyle()} />
            </View>
          )}
        </ScrollView>
      </View>
      {!addMode && (
        <View style={styles.textContainer}>
          <View style={styles.textTitleContainer}>
            <Text style={{...styles.textTitle, color: theme.mainColor}}>
              Recognized Text Blocks
            </Text>
            <TouchableOpacity
              style={{
                ...styles.addButton2,
                backgroundColor: theme.mainColor,
                shadowColor: theme.mainColor,
              }}
              onPress={onAddBlock}>
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
                  <Text style={textStyle(index, block)}>
                    {block.editedText || block.text}
                  </Text>
                  {show[index] && (
                    <Text
                      style={{
                        ...textStyle(index, block),
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
      )}

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

      <AddModal visible={addModalVisible} onClose={onCloseAddModal} />
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
