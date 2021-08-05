import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAppState} from '../Context';

const AppRoutes = ({component: Component, path, isPrivate, ...rest}) => {
  const {auth} = useAppState();
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !auth.user.token ? (
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
