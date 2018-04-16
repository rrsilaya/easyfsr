import Dashboard from '../pages/dashboard/DashboardContainer';
import Profile from '../pages/profile/ProfileContainer';
import ServiceRecords from '../pages/serviceRecords/ServiceRecordsContainer';
import FSRForm from '../pages/fsr/FSRFormContainer';
import Users from '../pages/users/UsersContainer';
import FacultySearch from '../pages/facultySearch/FacultySearchContainer';
import FsrExport from '../pages/fsrExport/FsrExportContainer';

const routes = [
  {
    type: 'route',
    path: '/',
    exact: true,
    restricted: true,
    component: Dashboard,
  },
  {
    type: 'redirect',
    from: '/',
    exact: true,
    to: '/records',
  },
  {
    type: 'route',
    path: '/profile/:userID',
    exact: true,
    component: Profile,
  },
  {
    type: 'route',
    path: '/records',
    exact: true,
    component: ServiceRecords,
  },
  {
    type: 'route',
    path: '/records/:fsrID',
    exact: true,
    component: FSRForm,
  },
  {
    type: 'route',
    path: '/records/:fsrID/preview',
    exact: true,
    component: FsrExport,
  },
  {
    type: 'route',
    path: '/users',
    component: Users,
    restricted: true,
  },
  {
    type: 'route',
    path: '/search',
    component: FacultySearch,
  },
];

export default routes;
