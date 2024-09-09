const routes: any[] = [
  {
    path: '/',
    redirect: '/access',
  },
  {
    name: '',
    path: '/home',
    component: './Home',
    // layout:false,
  },
  // {
  //   name: 'Login Page',
  //   path: '/loginPage',
  //   component: './LoginPage',
  //   // layout:false,
  // },
  {
    name: 'User',
    layout: false,
    routes: [
      {
        name: 'Login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
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
