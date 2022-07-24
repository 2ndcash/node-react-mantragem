import { combineReducers } from 'redux';
import configReducer from './configReducer';
import requestsReducer from './requestsReducer';
import productsReducer from './productsReducer';
import tokenReducer from './tokenReducer';
import menusReducer from './menusReducer';
import usersReducer from './usersReducer';
import registerReducer from './registerReducer';
import dashboardReducer from './dashboardReducer';
import masterModalReducer from './masterModalReducer';
import tableReducer from './tableReducer';

export default combineReducers({
  request: requestsReducer,
  config: configReducer,
  products: productsReducer,
  token: tokenReducer,
  menus: menusReducer,
  user: usersReducer,
  register: registerReducer,
  dashboard: dashboardReducer,
  masterModal: masterModalReducer,
  table: tableReducer
});
