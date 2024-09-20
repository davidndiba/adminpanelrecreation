
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
      {
        name: 'Logout',
        path: '/user/logout',
        component: './User/Login/Logout',
      },
      
    ],
  },
  {
    name: 'Profile',
    path: '/users/:id',
    component: './Access/Components/users/Profile', 
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
    path: '/system-settings',
    icon: 'setting',
    routes: [
      {
        name: 'General Settings',
        path: '/system-settings/generalsettings',
        component: './SystemSettings/GeneralSettings', 
      },
      {
        name: 'Email Settings',
        path: '/system-settings/emailsettings',
        component: './SystemSettings/EmailSettings', 
      },
      {
        name: 'Security Settings',
        path: '/system-settings/securitysettings',
        component: './SystemSettings/SecuritySettings', 
      },
    ],
  },
  {
    name: 'Maintenance',
    path: '/maintenance',
    routes:[
      {
        name: 'System Backup',
        path: '/maintenance/systembackup',
        component: './Maintenance/SystemBackup',
      },
      {
        name: 'System Information',
        path: '/maintenance/systeminformation',
        component: './Maintenance/SystemInformation',
      },
    ]
  },

  // {
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   component: './UserSide/Dashboard',
  // },
  // {
  //   name: 'Planner',
  //   path: '/planner',
  //   component: './UserSide/Planner',
  // },
  // {
  //   name: 'Data Sheet',
  //   path: '/datasheet',
  //   component: './UserSide/DataSheet',
  // },
  // {
  //   name: 'Mapping',
  //   path: '/mapping',
  //   routes:[
  //     {
  //       name: 'Manage Job Types',
  //       path: '/mapping/managejobtypes',
  //       component: './UserSide/Mapping/ManageJobTypes', 
  //     },
  //     {
  //       name: 'Job Areas',
  //       path: '/mapping/jobareas',
  //       component: './UserSide/Mapping/JobAreas', 
  //     },
  //     {
  //       name: 'Lines & Tanks',
  //       path: '/mapping/linesandtanks',
  //       component: './UserSide/Mapping/LinesAndTanks',
  //     },
  //   ]
  // },
  // {
  //   name: 'Users',
  //   path: '/users',
  //   component: './UserSide/Users',
  // },
];

export default routes;
