import {
  SET_ALL_CUSTOMER,
  SET_TOTAL_CUSTOMER,
  SET_TOTAL_SENDMAIL
} from '../actions';

const initialState = {
  customers: [],
  total_customer: 0,
  total_sendmail: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_CUSTOMER:
      return {
        ...state,
        customers: action.payload
      }
    case SET_TOTAL_CUSTOMER:
      return {
        ...state,
        total_customer: action.payload
      }
    case SET_TOTAL_SENDMAIL:
      return {
        ...state,
        total_sendmail: action.payload
      }
    default:
      return state;
  }
};
