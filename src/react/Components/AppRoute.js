import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppState } from '../Context';

function AppRoutes({
  component: Component, path, isPrivate, ...rest
}) {
  const { auth } = useAppState();
  return (
    <Route
      path={path}
      render={(props) => (isPrivate && !auth.user.token ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      ))}
      {...rest}
    />
  );
}

AppRoutes.propTypes = {
  component: PropTypes.any,
  path: PropTypes.any,
  isPrivate: PropTypes.any,
};

export default AppRoutes;
