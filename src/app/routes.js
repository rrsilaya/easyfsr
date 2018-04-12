import Dashboard from '../pages/dashboard/DashboardContainer';
import Profile from '../pages/profile/ProfileContainer';
import ServiceRecords from '../pages/serviceRecords/ServiceRecordsContainer';
import FSRForm from '../pages/fsr/FSRFormContainer';
import Users from '../pages/users/UsersContainer';
import FacultySearch from '../pages/facultySearch/FacultySearchContainer';
import FsrExport from '../pages/fsrExport/FsrExportContainer';

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
    exact: true,
    component: FSRForm,
  },
  {
    path: '/records/:fsrID/preview',
    exact: true,
    component: FsrExport,
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
