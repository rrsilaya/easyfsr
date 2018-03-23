import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/Profile';
import ServiceRecords from '../pages/serviceRecords/ServiceRecords';
import FormSample from '../pages/serviceRecords/FormSample';
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
    path: '/formSample',
    component: FormSample,
  },
  {
    to: '/search',
    component: FacultySearch,
  },
];

export default routes;
