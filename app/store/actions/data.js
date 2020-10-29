import {
  ADD_BLOCK,
  EDIT_BLOCK,
  REMOVE_DATA,
  SET_DATA,
  SET_PROCESSING,
} from '../types';
import vision from '@react-native-firebase/ml-vision';

export const setData = data => ({
  type: SET_DATA,
  data,
});

export const setProcessing = processing => ({
  type: SET_PROCESSING,
  processing,
});

export const removeData = indexes => ({
  type: REMOVE_DATA,
  indexes,
});

export const addBlock = (block, dataIndex) => ({
  type: ADD_BLOCK,
  block,
  dataIndex,
});

export const editBlock = (text, blockIndex, dataIndex) => ({
  type: EDIT_BLOCK,
  text,
  blockIndex,
  dataIndex,
});

export const getOCRText = (localPath, uri) => {
  return async dispatch => {
    dispatch(setProcessing(true));
    try {
      const processed = await vision().cloudDocumentTextRecognizerProcessImage(
        localPath,
      );
      dispatch(
        setData({
          uri,
          blocks: processed.blocks,
          text: processed.text,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setProcessing(false));
    }
  };
};
