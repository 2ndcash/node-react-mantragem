import { SET_TOKEN } from '../actions/index';

export default (state = "", action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;

    default:
      return state;
  }
};
