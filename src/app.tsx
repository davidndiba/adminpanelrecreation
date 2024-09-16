// // // 运行时配置

// import { history, request as umiRequest } from '@umijs/max';
// import { errorConfig } from './requestErrorConfig';
// import { Button, message } from 'antd';
// // // 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// // // 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
// // export async function getInitialState(): Promise<{ name: string }> {
// //   return { name: '@umijs/max' };
// // }

// // export const layout = () => {
// //   return {
// //     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
// //     menu: {
// //       locale: false,
// //     },
// //   };
// // };
// export async function getInitialState(): Promise<{
//   name: string;
//   fetchUserInfo: () => void;
//   currentUser?: any;
// }> {
//   const fetchUserInfo = async () => {
//     try {
//       const msg = await umiRequest(`/user/profile`);
//       console.log(msg);
//       return {
//         ...msg?.data,
//       };
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (history.location.pathname !== '/user/login') {
//     const currentUser = await fetchUserInfo();
//     return {
//       currentUser: {
//         ...currentUser,
//       },
//       fetchUserInfo,
//       name: currentUser?.display_name,
//     };
//   }

//   return { name: 'Admin Panel', fetchUserInfo };
// }

// const handleLogout = async () => {
//   try {
//     await umiRequest('/auth/logout', {
//       method: 'POST',
//     });
//     message.success('Logged out successfully');
//     history.push('/user/login');
//   } catch (error) {
//     message.error('Logout failed, please try again.');
//   }
// };

// export const layout = () => {
//   return {
//     layout: 'side',
//     headerRender: false,
//     // menuRender: false,
//     footerRender: false,
//     // menuHeaderRender: false,
//     fixedHeader: true, // Fixed header
//     fixSiderbar: true, // Fixed sidebar
//     siderWidth: 200,
    
//     // hideChildrenInMenu=true,
//     // hideInMenu=true,
//     // hideInBreadcrumb=true
//   };
// };
// export const request = {
//   ...errorConfig,
// };
import { history, request as umiRequest } from '@umijs/max';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { errorConfig } from './requestErrorConfig';

// Fetch user profile information
export async function getInitialState(): Promise<{
  name: string;
  fetchUserInfo: () => void;
  currentUser?: any;
}> {
  const fetchUserInfo = async () => {
    try {
      const response = await umiRequest(`/user/profile`);
      return {
        ...response?.data,
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
      name: currentUser?.display_name || 'Admin Panel',
    };
  }

  return { name: 'Admin Panel', fetchUserInfo };
}

// Handle logout function
const handleLogout = async () => {
  try {
    // Make a logout request to the server
    await umiRequest('/auth/logout', {
      method: 'POST',
    });
    message.success('Logged out successfully');
    // Redirect to the login page after successful logout
    history.push('/user/login');
  } catch (error) {
    message.error('Logout failed, please try again.');
  }
};
export const layout = ({ initialState }: any) => {
  return {
    layout: 'side',
    headerRender: false,
    footerRender: false,
    fixedHeader: true,
    fixSiderbar: true,
    siderWidth: 200,
    actionsRender: () => [
      <Button
        key="logout"
        icon={<LogoutOutlined />}
        type="text"
        onClick={handleLogout}
        style={{ color: '#f5222d', marginRight: 16 }} 
      >
        Logout
      </Button>,
    ],
    menu: {
      locale: false,
    },
  };
};

export const request = {
  ...errorConfig,
};
