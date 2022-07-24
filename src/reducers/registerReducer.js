import {
  NEXT_STEP,
  BACK_STEP,
  SET_TYPE,
  CLEAR_TYPE,
  SET_AGREE,
  END_AGREE,
  SET_EMAIL,
  VERIFY_COMPLETED,
  VERIFY_FAILED
} from '../actions/index';

const initialState = {
  show: false,
  step: 0,
  type: 0,
  agree: 1,
  email: null,
  verify: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPE:
      return {
        ...state,
        show: true,
        type: action.payload
      }
    case CLEAR_TYPE:
      return {
        ...state,
        show: false,
        step: 0,
        agree: 1,
      }
    case SET_AGREE:
      return {
        ...state,
        agree: state.agree + 1
      }
    case END_AGREE:
      return {
        ...state,
        agree: 3,
        show: false,
        step: 1
      }
    case NEXT_STEP:
      return {
        ...state,
        step: state.step + 1
      }
    case BACK_STEP:
      return {
        ...state,
        step: state.step - 1
      }
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    case VERIFY_COMPLETED:
      return {
        ...state,
        verify: true
      }
    case VERIFY_FAILED:
      return {
        ...state,
        verify: false,
        error: action.payload
      }
    default:
      return state;
  }
};
