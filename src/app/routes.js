import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/ProfileContainer';
import ServiceRecords from '../pages/serviceRecords/ServiceRecords';
import FSRForm from '../pages/fsr/FSRFormContainer';
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
    exact: true,
    component: ServiceRecords,
  },
  {
    path: '/records/:fsrID',
    component: FSRForm,
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
