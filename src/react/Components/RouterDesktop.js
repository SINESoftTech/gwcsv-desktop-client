import {HashRouter, Switch} from 'react-router-dom'
import routes from '../Config/routes'
import {AuthProvider} from '../Context';
import AppRoute from './AppRoute';

const RouterDesktop = (props) => {
  return (
    <AuthProvider>
      <HashRouter>
        <Switch>
          {routes.map(route => (
            <AppRoute key={route.key} path={route.path} component={route.component} isPrivate={route.isPrivate} exect={true}/>
          ))}
        </Switch>
      </HashRouter>
    </AuthProvider>
  )

}

export default RouterDesktop