import { FETCH_PRODUCTS, UNAUTHORIZED } from '../actions/index';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    case UNAUTHORIZED:
      return action.payload
    default:
      return state;
  }
};
