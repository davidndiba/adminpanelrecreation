import { defineConfig } from '@umijs/max';
// import logo from './../plannerv2/src/assets/Microvision LOgo.png';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
 locale:{default:"en-US", baseNavigator: false},
  layout: {
    title: 'Admin Panel',
    layout: 'side',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    siderWidth: 200,
    // logo: logo,
  },
  routes: [
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
  ],
  npmClient: 'yarn',
});
