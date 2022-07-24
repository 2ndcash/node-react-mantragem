import { REQUEST_SUCCESS, REQUEST_ERROR, REQUEST_ERROR_NOTFOUND, REQUEST_CLEAR_ERROR, REQUEST_STARTED, REQUEST_STOPPED, REQUEST_SUCCESS_GOTO } from '../actions/index';

const initialState = {
  total: 0,
  pending: false,
  error: false,
  success: false,
  message: null,
  code: null,
  goto: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        error: false,
        message: null
      }
    case REQUEST_SUCCESS_GOTO:
      return {
        ...state,
        pending: false,
        success: true,
        error: false,
        message: null,
        goto: action.payload.goto || ''
      }
    case REQUEST_ERROR:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        message: action.payload || ''
      }
    case REQUEST_ERROR_NOTFOUND:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        message: action.payload.message || '',
        code: 'Not found',
        goto: action.payload.goto || ''
      }
    case REQUEST_CLEAR_ERROR:
      return {
        ...state,
        pending: false,
        success: false,
        error: false,
        message: null,
        code: null,
        goto: null
      }
    case REQUEST_STARTED:
      return {
        ...state,
        pending: true,
        success: false,
        error: false,
        message: action.payload || null,
      }
    case REQUEST_STOPPED:
      return {
        ...state,
        pending: false,
        success: false,
        error: false,
        message: null
      }
    default:
      return state;
  }
};
