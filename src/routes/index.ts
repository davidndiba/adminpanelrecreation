// const routes: any[] = [
//   {
//     path: '/',
//     redirect: '/access',
//   },
//   {
//     name: '',
//     path: '/home',
//     component: './Home',
//     // layout:false,
//   },
//   // {
//   //   name: 'Login Page',
//   //   path: '/loginPage',
//   //   component: './LoginPage',
//   //   // layout:false,
//   // },
//   {
//     name: 'User',
//     layout: false,
//     routes: [
//       {
//         name: 'Login',
//         path: '/user/login',
//         component: './User/Login',
//       },
//     ],
//   },
//   {
//     name: 'Access Control',
//     path: '/access',
//     component: './Access',
//   },
//   {
//     name: 'Activity Logs',
//     path: '/activity',
//     component: './Activity',
//   },
//   {
//     name: 'System Settings',
//     path: '/systemSettings',
//     component: './SystemSettings',
//   },
//   {
//     name: 'Maintenance',
//     path: '/maintenance',
//     component: './Maintenance',
//   },
// ];

// export default routes;
const routes: any[] = [
  {
    path: '/',
    redirect: '/access',
  },
  {
    name: '',
    path: '/home',
    component: './Home',
  },
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
  // Main "System Settings" menu with submenus
  {
    name: 'System Settings',
    path: '/system-settings',
    icon: 'setting',
    // component: './SystemSettings', // main component for System Settings
    routes: [
      {
        name: 'General Settings',
        path: '/system-settings/generalsettings',
        component: './SystemSettings/GeneralSettings', // Component for General Settings
      },
      {
        name: 'Email Settings',
        path: '/system-settings/emailsettings',
        component: './SystemSettings/EmailSettings', // Component for Email Settings
      },
      {
        name: 'Security Settings',
        path: '/system-settings/securitysettings',
        component: './SystemSettings/SecuritySettings', // Component for Security Settings
      },
    ],
  },
  {
    name: 'Maintenance',
    path: '/maintenance',
    component: './Maintenance',
  },
];

export default routes;
