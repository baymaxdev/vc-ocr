import {REMOVE_DATA, SET_DATA, SET_PROCESSING} from '../types';

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
    default:
      return state;
  }
};

export default reducer;
