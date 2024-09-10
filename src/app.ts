// // 运行时配置

import { history, request as umiRequest } from '@umijs/max';
import { errorConfig } from './requestErrorConfig';
// // 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// // 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
// export async function getInitialState(): Promise<{ name: string }> {
//   return { name: '@umijs/max' };
// }

// export const layout = () => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };
export async function getInitialState(): Promise<{
  name: string;
  fetchUserInfo: () => void;
  currentUser?: any;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await umiRequest(`/user/profile`);
      console.log(msg);
      return {
        ...msg?.data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      currentUser: {
        ...currentUser,
      },
      fetchUserInfo,
      name: currentUser?.display_name,
    };
  }

  return { name: 'Planner', fetchUserInfo };
}
export const layout = () => {
  return {
    layout: 'side',
    headerRender: false,
    // menuRender: false,
    footerRender: false,
    // menuHeaderRender: false,
    fixedHeader: true, // Fixed header
    fixSiderbar: true, // Fixed sidebar
    siderWidth: 200,
    // hideChildrenInMenu=true,
    // hideInMenu=true,
    // hideInBreadcrumb=true
  };
};
export const request = {
  ...errorConfig,
};
