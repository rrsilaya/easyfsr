import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/ProfileContainer';
import ServiceRecords from '../pages/serviceRecords/ServiceRecords';
import Users from '../pages/users/UsersContainer';
import FacultySearch from '../pages/facultySearch/FacultySearchContainer';

const routes = [
  {
    path: '/',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/profile/:userID',
    exact: true,
    component: Profile,
  },
  {
    path: '/records',
    component: ServiceRecords,
  },
  {
    path: '/users',
    component: Users,
    restricted: true,
  },
  {
    path: '/search',
    component: FacultySearch,
  },
];

export default routes;
