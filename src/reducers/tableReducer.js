import {
  SET_DATA_ALL_CARD,
  SET_DATA_CARD,
  SET_DATA_ALL_MORE_FORM,
  SET_DATA_MORE_FORM
} from '../actions/index';

const initialState = {
  cards: [],
  card: null,
  moreforms: [],
  moreform: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_ALL_CARD:
      return {
        ...state,
        cards: action.payload
      };
    case SET_DATA_CARD: {
      return {
        ...state,
        card: action.payload
      }
    }
    case SET_DATA_ALL_MORE_FORM: {
      return {
        ...state,
        moreforms: action.payload
      }
    }
    case SET_DATA_MORE_FORM: {
      return {
        ...state,
        moreform: action.payload
      }
    }
    default:
      return state;
  }
};
