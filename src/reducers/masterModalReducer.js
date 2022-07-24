import {
  MASTER_MODAL_OPEN,
  MASTER_MODAL_CLOSE,
  MASTER_MODAL_DATA
} from '../actions';

const initialState = {
  show: false,
  data: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MASTER_MODAL_OPEN:
      return {
        ...state,
        show: true,
      }
    case MASTER_MODAL_CLOSE:
      return {
        ...state,
        show: false,
      }
    case MASTER_MODAL_DATA:
      return{
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};
