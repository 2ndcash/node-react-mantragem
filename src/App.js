import React from 'react'
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

const App = ({ route }) => {
  return (<>
    {renderRoutes(route.routes)}
  </>)
};

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any)
};

App.defaultProps = {
  route: null
};

export default {
  component: App
};
