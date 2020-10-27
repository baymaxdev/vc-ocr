import {SET_DATA} from '../types';

export const initialState = {
  data: {},
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_DATA:
      return {...initialState, data: action.data};
    default:
      return state;
  }
};

export default reducer;
