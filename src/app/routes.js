import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/ProfileContainer';
import ServiceRecords from '../pages/serviceRecords/ServiceRecords';
import Users from '../pages/users/UsersContainer';
import FacultySearch from '../pages/facultySearch/FacultySearch';

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
  {
    type: 'path',
    to: '/search',
    component: FacultySearch,
  },
  {
    type: 'path',
    to: '/',
  },
];

export default routes;
