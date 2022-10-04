import Login from '../../views/LoginPage';
import PageNotFound from '../../views/NotFoundPage';
import HomePage from '../../views/HomePage';
import IdentifiedEvidenceDetailPage from '../../views/IdentifiedEvidenceDetailPage'

const routes = [
  {
    key: 'main',
    path: '/main',
    component: HomePage,
    isPrivate: true,
  },
  {
    key: 'login',
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    key: 'identified',
    path: '/identified-evidence-detail',
    component: IdentifiedEvidenceDetailPage,
    isPrivate: true,
  },
  {
    key: 'root',
    path: '/',
    component: HomePage,
    isPrivate: true,
  },
  {
    key: 'other',
    path: '/*',
    component: PageNotFound,
    isPrivate: false,
  },

];

export default routes;
