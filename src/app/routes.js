import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/Profile';
import ServiceRecords from '../pages/serviceRecords/ServiceRecords';
import Users from '../pages/users/Users';

const routes = [
  {
    path: '/',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/records',
    component: ServiceRecords,
  },
  {
    path: '/users',
    component: Users,
  },
];

export default routes;
