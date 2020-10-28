import {REMOVE_DATA, SET_DATA, SET_PROCESSING} from '../types';
import vision from '@react-native-firebase/ml-vision';

export const setData = data => ({
  type: SET_DATA,
  data,
});

export const setProcessing = processing => ({
  type: SET_PROCESSING,
  processing,
});

export const removeData = index => ({
  type: REMOVE_DATA,
  index,
});

export const getOCRText = localPath => {
  return async dispatch => {
    dispatch(setProcessing(true));
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(
      localPath,
    );
    dispatch(
      setData({
        uri: localPath,
        blocks: processed.blocks,
        text: processed.text,
      }),
    );
    dispatch(setProcessing(false));
  };
};
