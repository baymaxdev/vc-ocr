import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';

const Collection = ({data, num, renderItem}) => {
  const composeData = () => {
    const len = Math.ceil(data.length / num);
    const totalArr = [];
    for (let i = 0; i < len; i++) {
      const arr = [];
      for (let j = 0; j < num; j++) {
        arr.push(data[i * num + j]);
      }
      totalArr.push(arr);
    }
    return totalArr;
  };

  const renderRow = ({item}) => (
    <View style={styles.rowContainer}>
      {item.map((im, ix) => (
        <View style={styles.itemContainer} key={ix.toString()}>
          {im && renderItem(im)}
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
