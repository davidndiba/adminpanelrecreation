import { LogoutOutlined } from '@ant-design/icons';
import { history, request as umiRequest } from '@umijs/max';
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
    await umiRequest('/auth/logout', {
      method: 'POST',
    });
    message.success('Logged out successfully');

    history.push('/user/login');
  } catch (error) {
    message.error('Logout failed, please try again.');
  }
};
export const layout = ({}: any) => {
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
