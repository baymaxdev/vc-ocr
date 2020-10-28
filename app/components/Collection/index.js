import React from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';

const Collection = ({data, num, renderItem}) => {
  const composeData = () => {
    const objArr = data.map((item, index) => ({
      item,
      index,
    }));
    objArr.sort((a, b) => b.item.updatedAt > a.item.updatedAt);

    const len = Math.ceil(data.length / num);
    const totalArr = [];
    for (let i = 0; i < len; i++) {
      const arr = [];
      for (let j = 0; j < num; j++) {
        arr.push({
          item: objArr[i * num + j] ? objArr[i * num + j].item : undefined,
          index: objArr[i * num + j] ? objArr[i * num + j].index : undefined,
        });
      }
      totalArr.push(arr);
    }
    return totalArr;
  };

  const renderRow = ({item}) => (
    <View style={styles.rowContainer}>
      {item.map((im, ix) => (
        <View style={styles.itemContainer} key={ix.toString()}>
          {im.item && renderItem(im)}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={composeData()}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Collection;
