import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import {useAppState} from '../Context';

const AppRoutes = ({component: Component, path, isPrivate, ...rest}) => {
  const {auth} = useAppState();
  console.log('auth in approutes', auth)
  console.log('isTokenNotExists', !auth.token)
  console.log('isPrivate', isPrivate)
  console.log('path', path)
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !auth.token ? (
          <Redirect to='/login'/>
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;