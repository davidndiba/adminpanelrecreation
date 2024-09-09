const routes: any[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '',
    path: '/home',
    component: './Home',
    // layout:false,
  },
  {
    name: 'Login Page',
    path: '/loginPage',
    component: './LoginPage',
    // layout:false,
  },
  {
    name: 'Access Control',
    path: '/access',
    component: './Access',
  },
  {
    name: 'Activity Logs',
    path: '/activity',
    component: './Activity',
  },
  {
    name: 'System Settings',
    path: '/systemSettings',
    component: './SystemSettings',
  },
  {
    name: 'Maintenance',
    path: '/maintenance',
    component: './Maintenance',
  },
];

export default routes;
