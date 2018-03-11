import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/Profile';
import ServiceRecords from '../pages/serviceRecords/ServiceRecords';
import Users from '../pages/users/Users';

const routes = [
  {
    type: 'path',
    path: '/',
    exact: true,
    component: Dashboard,
  },
  {
    type: 'path',
    path: '/profile',
    component: Profile,
  },
  {
    type: 'path',
    path: '/records',
    component: ServiceRecords,
  },
  {
    type: 'path',
    path: '/users',
    component: Users,
  },
  {
    type: 'redirect',
    to: '/',
  },
];

export default routes;
