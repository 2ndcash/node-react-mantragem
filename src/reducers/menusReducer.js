import { SET_ROLES_MENU } from '../actions/index';

export default (state = [], action) => {
  switch (action.type) {
    case SET_ROLES_MENU:
      return action.payload;

    default:
      return state;
  }
};
