import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Detail = ({route}) => {
  const {uri, data} = route.params;
  const imgWidth = Dimensions.get('screen').width;
  const [imgHeight, setImgHeight] = useState(0);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    Image.getSize(uri, (w, h) => {
      setImgHeight((h * imgWidth) / w);
      setRatio(imgWidth / w);
    });
  }, [imgWidth, uri]);

  const boundingBoxStyle = ({boundingBox, text}) => {
    const width = (boundingBox[2] - boundingBox[0]) * ratio;
    const height = (boundingBox[3] - boundingBox[1]) * ratio;
    const numberOfLines = text.split(/\r\n|\r|\n/).length;
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
    console.log(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView horizontal={false}>
          <Image source={{uri}} style={{width: imgWidth, height: imgHeight}} />
          <View style={styles.boxContainer}>
            {data.blocks.map((block, index) => (
              <Text key={index.toString()} style={boundingBoxStyle(block)}>
                {block.text}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Recognized Text Blocks</Text>
        <ScrollView horizontal={false}>
          {data.blocks.map((block, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={styles.textItem}
              onPress={onPressText(index)}>
              <Text style={styles.text}>{block.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  boxContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  textTitle: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  textItem: {
    backgroundColor: 'grey',
    margin: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default Detail;
