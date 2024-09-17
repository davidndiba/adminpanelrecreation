
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
    // component: './Maintenance',
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
];

export default routes;
