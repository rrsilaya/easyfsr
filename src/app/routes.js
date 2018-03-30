import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/Profile';
import ServiceRecords from '../pages/serviceRecords/ServiceRecords';
import FSRForm from '../pages/fsr/FSRFormContainer';
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
    path: '/fsrForm',
    component: FSRForm,
  },
  {
    to: '/search',
    component: FacultySearch,
  },
];

export default routes;
