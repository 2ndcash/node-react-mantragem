import {
  // SET_USER_INFO,
  FETCH_USER_PROFILE,
  SET_USER_ID,
  ADD_INTEREST,
  REMOVE_INTEREST,
  FETCH_ALL_ORDER
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    // case SET_USER_INFO:
    //   return action.payload;
    case FETCH_USER_PROFILE:
      return action.payload
    case SET_USER_ID:
      return {
        ...state,
        user_id: action.payload
      }
    case ADD_INTEREST:
      return {
        ...state,
        interests: [...state.interests || [], action.payload]
      }
    case REMOVE_INTEREST:
      return {
        ...state,
        interests: state.interests.filter(val => val !== action.payload)
      }
    case FETCH_ALL_ORDER:
      return {
        ...state,
        orders: action.payload
      }
    default:
      return state;
  }
};
