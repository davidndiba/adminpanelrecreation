// import {
//   GridContent,
//   ProCard,
//   ProForm,
//   ProFormText,
// } from '@ant-design/pro-components';
// import { message } from 'antd';
// import React from 'react';
// import { history, request } from 'umi';
// import './login.less';

// const LoginPage: React.FC = () => {
//   const handleFinish = async (values: any) => {
//     const { email, password } = values;
//     try {
//       const response = await request(`/auth/login`, {
//         method: 'POST',
//         data: { email, password },
//       });

//       if (response.success) {
//         message.success('Login successful!');
//         // Store token or user info in localStorage or state
//         localStorage.setItem('planner_t', response.token);
//         // Redirect to the settings or home page
//         history.push('/');
//       } else {
//         message.error('Login failed. Please try again.');
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <GridContent className="login-container">
//       <ProCard bordered>
//         <ProForm title="Login" onFinish={handleFinish} layout="vertical">
//           <ProFormText
//             name="email"
//             label="Email"
//             placeholder="Enter your username"
//             rules={[{ required: true, message: 'Username is required' }]}
//           />
//           <ProFormText.Password
//             name="password"
//             label="Password"
//             placeholder="Enter your password"
//             rules={[{ required: true, message: 'Password is required' }]}
//           />
//           <ProForm.Item>
//             <button type="submit" className="login-button">
//               Login
//             </button>
//           </ProForm.Item>
//         </ProForm>
//       </ProCard>
//     </GridContent>
//   );
// };

// export default LoginPage;
// import {
//   GridContent,
//   ProCard,
//   ProForm,
//   ProFormText,
//   ProFormItem,
// } from '@ant-design/pro-components';
// import { message, Button, Divider } from 'antd';
// import React from 'react';
// import { history, request } from 'umi';
// import './login.less'; // Assuming your custom styles are in this file

// const LoginPage: React.FC = () => {
//   const handleFinish = async (values: any) => {
//     const { email, password } = values;
//     try {
//       const response = await request(`/auth/login`, {
//         method: 'POST',
//         data: { email, password },
//       });

//       if (response.success) {
//         message.success('Login successful!');
//         localStorage.setItem('planner_t', response.token);
//         history.push('/');
//       } else {
//         message.error('Login failed. Please try again.');
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };

//   const handleGoogleSignIn = () => {
//     // Implement Google Sign-In logic here
//   };

//   const handleForgotPassword = async () => {
//     try {
//       const response = await request('/forgot-password', {
//         method: 'POST',
//         data: { email: '' }, // You can capture the email from a modal or input field
//       });

//       if (response.success) {
//         message.success('Password reset link sent to your email!');
//       } else {
//         message.error('Failed to send password reset link.');
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };

//   const handleResetPassword = async () => {
//     try {
//       const response = await request('/reset-password', {
//         method: 'POST',
//         data: { email: '' }, // Capture the email or token from user input
//       });

//       if (response.success) {
//         message.success('Password has been reset successfully!');
//       } else {
//         message.error('Failed to reset password.');
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <GridContent className="login-container">
//       <ProCard bordered className="login-card">
//         <div className="login-content">
//           <div className="login-left">
//             <img src="/logo.png" alt="Company Logo" className="login-logo" />
//             <h2>Planner Admin Dashboard</h2>
//           </div>
//           <div className="login-right">
//             <Button
//               type="primary"
//               className="google-signin-button"
//               onClick={handleGoogleSignIn}
//             >
//               Sign in with Google
//             </Button>
//             <Divider plain>or</Divider>
//             <ProForm title="Login" onFinish={handleFinish} layout="vertical">
//               <ProFormText
//                 name="email"
//                 label="Email"
//                 placeholder="Enter your email"
//                 rules={[{ required: true, message: 'Email is required' }]}
//               />
//               <ProFormText.Password
//                 name="password"
//                 label="Password"
//                 placeholder="Enter your password"
//                 rules={[{ required: true, message: 'Password is required' }]}
//               />
//               <ProFormItem>
//                 <Button
//                   type="link"
//                   className="forgot-password-link"
//                   onClick={handleForgotPassword}
//                 >
//                   Forgot Password?
//                 </Button>
//                 <Button
//                   type="link"
//                   className="reset-password-link"
//                   onClick={handleResetPassword}
//                 >
//                   Reset Password
//                 </Button>
//               </ProFormItem>
//               <ProForm.Item>
//                 <button type="submit" className="login-button">
//                   Login
//                 </button>
//               </ProForm.Item>
//             </ProForm>
//           </div>
//         </div>
//       </ProCard>
//     </GridContent>
//   );
// };

// export default LoginPage;
// import {
//   GridContent,
//   ProCard,
//   ProForm,
//   ProFormText,
//   ProFormItem,
// } from '@ant-design/pro-components';
// import { message, Button, Divider } from 'antd';
// import React from 'react';
// import { history, request } from 'umi';
// import './login.less';

// const LoginPage: React.FC = () => {
//   const handleFinish = async (values: any) => {
//     const { email, password } = values;
//     try {
//       const response = await request(`/auth/login`, {
//         method: 'POST',
//         data: { email, password },
//       });

//       if (response.success) {
//         message.success('Login successful!');
//         localStorage.setItem('planner_t', response.token);
//         history.push('/');
//       } else {
//         message.error('Login failed. Please try again.');
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };

//   const handleGoogleSignIn = () => {
//     // Implement Google Sign-In logic here
//   };

//   const handleForgotPassword = async () => {
//     try {
//       const response = await request('/forgot-password', {
//         method: 'POST',
//         data: { email: '' }, // You can capture the email from a modal or input field
//       });

//       if (response.success) {
//         message.success('Password reset link sent to your email!');
//       } else {
//         message.error('Failed to send password reset link.');
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };

//   const handleResetPassword = async () => {
//     try {
//       const response = await request('/reset-password', {
//         method: 'POST',
//         data: { email: '' }, // Capture the email or token from user input
//       });

//       if (response.success) {
//         message.success('Password has been reset successfully!');
//       } else {
//         message.error('Failed to reset password.');
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <GridContent className="login-container">
//       <ProCard bordered className="login-card">
//         <div className="login-content">
//           <div className="login-left">
//             <img src="/logo.png" alt="Company Logo" className="login-logo" />
//             <h2 className="login-title">Planner Admin Dashboard</h2>
//           </div>
//           <div className="login-right">
//             <Button
//               type="primary"
//               className="google-signin-button"
//               onClick={handleGoogleSignIn}
//             >
//               Sign in with Google
//             </Button>
//             <Divider plain>or</Divider>
//             <ProForm
//               title="Login"
//               onFinish={handleFinish}
//               layout="vertical"
//               submitter={{
//                 render: (_, dom) => null, // Remove default submit and reset buttons
//               }}
//             >
//               <ProFormText
//                 name="email"
//                 label="Email"
//                 placeholder="Enter your email"
//                 rules={[{ required: true, message: 'Email is required' }]}
//               />
//               <ProFormText.Password
//                 name="password"
//                 label="Password"
//                 placeholder="Enter your password"
//                 rules={[{ required: true, message: 'Password is required' }]}
//               />
//               <ProFormItem>
//                 <Button
//                   type="link"
//                   className="forgot-password-link"
//                   onClick={handleForgotPassword}
//                 >
//                   Forgot Password?
//                 </Button>
//                 <Button
//                   type="link"
//                   className="reset-password-link"
//                   onClick={handleResetPassword}
//                 >
//                   Reset Password
//                 </Button>
//               </ProFormItem>
//               <ProForm.Item>
//                 <button type="submit" className="login-button">
//                   Login
//                 </button>
//               </ProForm.Item>
//             </ProForm>
//           </div>
//         </div>
//       </ProCard>
//     </GridContent>
//   );
// };

// export default LoginPage;
import { GoogleOutlined } from '@ant-design/icons';
import {
  GridContent,
  ProCard,
  ProForm,
  ProFormItem,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, message } from 'antd';
import React from 'react';
import { history, request } from 'umi';
import './login.less';

const LoginPage: React.FC = () => {
  const handleFinish = async (values: any) => {
    const { email, password } = values;
    try {
      const response = await request(`/auth/login`, {
        method: 'POST',
        data: { login:email, password },
      });

      if (response.success) {
        message.success('Login successful!');
        localStorage.setItem('planner_t', response.token);
        history.push('/');
      } else {
        message.error('Login failed. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
  };

  const handleForgotPassword = async () => {
    try {
      const response = await request('/forgot-password', {
        method: 'POST',
        data: { email: '' }, // You can capture the email from a modal or input field
      });

      if (response.success) {
        message.success('Password reset link sent to your email!');
      } else {
        message.error('Failed to send password reset link.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await request('/reset-password', {
        method: 'POST',
        data: { email: '' }, // Capture the email or token from user input
      });

      if (response.success) {
        message.success('Password has been reset successfully!');
      } else {
        message.error('Failed to reset password.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  return (
    <GridContent className="login-container">
      <ProCard bordered className="login-card">
        <div className="login-content">
          <div className="login-left">
            <img src="/logo.png" alt="Company Logo" className="login-logo" />
            <h2 className="login-title">Planner Admin Dashboard</h2>
          </div>
          <div className="login-right">
            <Button
              type="primary"
              icon={<GoogleOutlined />} // Adding Google icon
              className="google-signin-button"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
            <Divider plain>or</Divider>
            <ProForm
              title="Login"
              onFinish={handleFinish}
              layout="vertical"
              submitter={{
                render: () => null, // Remove default submit and reset buttons
              }}
            >
              <ProFormText
                name="email"
                label="Email"
                placeholder="Enter your email"
                rules={[{ required: true, message: 'Email is required' }]}
              />
              <ProFormText.Password
                name="password"
                label="Password"
                placeholder="Enter your password"
                rules={[{ required: true, message: 'Password is required' }]}
              />
              <ProFormItem>
                <Button
                  type="link"
                  className="forgot-password-link"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </Button>
                <Button
                  type="link"
                  className="reset-password-link"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              </ProFormItem>
              <ProForm.Item>
                <button type="submit" className="login-button">
                  Login
                </button>
              </ProForm.Item>
            </ProForm>
          </div>
        </div>
      </ProCard>
    </GridContent>
  );
};

export default LoginPage;
