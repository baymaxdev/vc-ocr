import {
  ADD_BLOCK,
  EDIT_BLOCK,
  REMOVE_DATA,
  SET_DATA,
  SET_PROCESSING,
} from '../types';

export const initialState = {
  data: [],
  processing: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_DATA:
      return {...state, data: [...state.data, action.data]};
    case SET_PROCESSING:
      return {...state, processing: action.processing};
    case REMOVE_DATA:
      return {...state, data: [...state.data.splice(action.index, 1)]};
    case ADD_BLOCK:
      return {...state, data: [...state.data.splice(action.index, 1)]};
    case EDIT_BLOCK:
      const {text, blockIndex, dataIndex} = action;
      const {blocks} = state.data[dataIndex];
      const newBlock = {
        ...blocks[blockIndex],
        editedText: text,
      };
      blocks.splice(blockIndex, 1, newBlock);

      const {data} = state;
      const editedData = {
        ...data[dataIndex],
        blocks,
        updatedAt: Date.now(),
      };
      data.splice(dataIndex, 1, editedData);
      return {...state, data: [...data]};
    default:
      return state;
  }
};

export default reducer;
