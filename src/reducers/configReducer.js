import { SET_BASE_URL } from '../actions/index';

const initialState = {
  baseURL: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BASE_URL:
      return {
        ...state,
        baseURL: action.payload
      }

    default:
      return state;
  }
};
