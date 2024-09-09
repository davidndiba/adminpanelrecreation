import { RequestConfig, history } from '@umijs/max';
import { message, notification } from 'antd';
// import pathToRegexp from 'path-to-regexp';

export const requestConfig: RequestConfig = {
  errorConfig: {
    errorHandler: (error: any) => {
      console.log(error);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        const currentPath = history.location.pathname + history.location.search;
        window.location.href = `/user/login?redirect=${encodeURIComponent(
          currentPath,
        )}`;
      }

      if (error?.response) {
        notification.open({
          placement: 'bottomRight',
          message: `${
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.response?.data?.errors
              ?.map((el: any) => el?.msg)
              ?.join(', ••• ') ||
            error?.message
          }`,
          type: 'error',
        });
      } else if (error?.request) {
        message.error('No response! Please try again!');
      } else {
        message.error('Request error, please retry!');
      }
    },
  },
  requestInterceptors: [
    (config: any) => {
      if (config.login === undefined) {
        const token = localStorage.getItem('planner_t');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          config.headers.Accept = `application/json`;
        }

        const url = API + config?.url;
        return {
          ...config,
          url: url,
        };
      }
    },
  ],
  responseInterceptors: [
    (res: any) => {
      const { data, status, statusText } = res;

      if (status === 401 && history.location.pathname !== '/user/login') {
        history.push('/user/login');
      }

      if (status >= 400 && status < 422) {
        notification.error({
          message: ` ${statusText} ( ${status} )`,
          description: data?.error_description || message,
          placement: 'bottomRight',
        });
        return {
          status: true,
          code: status,
          message,
          data,
        };
      }

      if ((data && status === 200) || status === 201) {
        return {
          status: true,
          code: status,
          data,
        };
      }

      return res;
    },
  ],
};
