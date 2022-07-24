import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { MainLayout } from '../components/layout'

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Mantragem - Page not found</title>
        <link rel="stylesheet" href="https://colorlib.com/etc/404/colorlib-error-404-10/css/style.css" />
      </Helmet>
    );
  };

  return (<>
    {head()}
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <a href="/">Go To Homepage</a>
      </div>
    </div>
  </>);
};

NotFoundPage.propTypes = {
  staticContext: PropTypes.objectOf(PropTypes.any)
};

NotFoundPage.defaultProps = {
  staticContext: {}
};

export default {
  component: NotFoundPage
};
