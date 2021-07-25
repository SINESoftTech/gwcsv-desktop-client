import {BrowserRouter, Switch} from 'react-router-dom'
import routes from '../Config/routes'
import {AppContextProvider} from '../Context';
import AppRoute from './AppRoute';

const RouterDesktop = (props) => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          {routes.map(route => (
            <AppRoute key={route.key} path={route.path} component={route.component} isPrivate={route.isPrivate} exect={true}/>
          ))}
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  )

}

export default RouterDesktop