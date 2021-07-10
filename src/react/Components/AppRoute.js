import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import {useAuthState} from '../Context';

const AppRoutes = ({component: Component, path, isPrivate, ...rest}) => {
  const userDetails = useAuthState();
  console.log('userDetails in approutes', userDetails)
  console.log('isTokenNotExists', !userDetails.token)
  console.log('isPrivate', isPrivate)
  console.log('path', path)
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !userDetails.token ? (
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