import React from 'react'
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

const User = ({ route }) => {
  return (<>
    {renderRoutes(route.routes)}
  </>)
};

User.propTypes = {
  route: PropTypes.objectOf(PropTypes.any)
};

User.defaultProps = {
  route: null
};

export default {
  component: User
};
