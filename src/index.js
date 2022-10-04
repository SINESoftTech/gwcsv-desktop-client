import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import routes from './react/Config/routes';
import { AppContextProvider } from './react/Context';
import AppRoute from './react/Components/AppRoute';
// import reportWebVitals from './reportWebVitals';
// import RouterDesktop from './react/Components/RouterDesktop';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.key}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
              exect
            />
          ))}
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
