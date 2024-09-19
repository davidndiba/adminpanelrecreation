"use strict";
// import { GoogleOutlined } from '@ant-design/icons';
// import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
// import { Button, Divider, message, Modal } from 'antd';
// import React, { useState } from 'react';
// import { history, request } from 'umi';
// import './login.less';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// const LoginPage: React.FC = () => {
//   const [isSignUpVisible, setIsSignUpVisible] = useState(false);
//   const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);
//   const handleFinish = async (values: any) => {
//     const { email, password } = values;
//     try {
//       const response = await request(`/auth/login`, {
//         method: 'POST',
//         data: { login: email, password },
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
//   const handleForgotPassword = async (email: string) => {
//     try {
//       const response = await request('/auth/forgot-password', {
//         method: 'POST',
//         data: { email },
//       });
//       if (response.success) {
//         message.success('Password reset link sent to your email!');
//         setIsResetPasswordVisible(false); // Close the reset password modal
//       } else {
//         message.error('Failed to send password reset link.');
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };
//   const handleSignUp = async (values: any) => {
//     try {
//       const response = await request('/auth/register', {
//         method: 'POST',
//         data: {
//           email: values.email,
//           display_name: values.displayName,
//           username: values.username,
//           password: values.password,
//           password_confirmation: values.passwordConfirmation,
//           timezone: 'UTC',
//           role: '9cffe655-dc69-4d80-b4b3-2dde5f0cfb85',
//         },
//       });
//       if (response.success) {
//         message.success('Sign-up successful! Please log in.');
//         setTimeout(() => setIsSignUpVisible(false), 300);
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };
//   return (
//     <div className="login-container">
//       <ProCard bordered className="login-card">
//         <div className="login-content">
//           <div className="login-left">
//             <img src="/logo.png" alt="Company Logo" className="login-logo" />
//             <h2 className="login-title">Planner Admin Dashboard</h2>
//           </div>
//           <div className="login-right">
//             <Button
//               type="primary"
//               icon={<GoogleOutlined />}
//               className="google-signin-button"
//               onClick={handleGoogleSignIn}
//             >
//               Sign in with Google
//             </Button>
//             <Divider plain>or</Divider>
//             <ProForm
//               onFinish={handleFinish}
//               layout="vertical"
//               submitter={{
//                 render: () => null, // Remove default submit and reset buttons
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
//               <ProForm.Item>
//                 <Button
//                   type="link"
//                   className="forgot-password-link"
//                   onClick={() => setIsResetPasswordVisible(true)}
//                 >
//                   Forgot Password?
//                 </Button>
//                 <Button
//                   type="link"
//                   className="signup-link"
//                   onClick={() => setIsSignUpVisible(true)}
//                 >
//                   Sign Up
//                 </Button>
//               </ProForm.Item>
//               <ProForm.Item>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="login-button"
//                 >
//                   Login
//                 </Button>
//               </ProForm.Item>
//             </ProForm>
//           </div>
//         </div>
//       </ProCard>
//       {/* Sign-Up Modal */}
//       <Modal
//         title="Sign Up"
//         visible={isSignUpVisible}
//         onCancel={() => setIsSignUpVisible(false)}
//         footer={null}
//         className="signup-modal"
//       >
//         <ProForm
//           onFinish={handleSignUp}
//           layout="vertical"
//           submitter={{
//             render: (props) => (
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'flex-end',
//                   gap: '10px',
//                 }}
//               >
//                 <Button
//                   type="default"
//                   onClick={() => props?.reset?.()} // Reset fields on button click
//                 >
//                   Reset
//                 </Button>
//                 <Button type="primary" htmlType="submit">
//                   Sign Up
//                 </Button>
//               </div>
//             ),
//           }}
//         >
//           <ProFormText
//             name="email"
//             label="Email"
//             placeholder="Enter your email"
//             rules={[{ required: true, message: 'Email is required' }]}
//           />
//           <ProFormText
//             name="displayName"
//             label="Display Name"
//             placeholder="Enter your display name"
//             rules={[{ required: true, message: 'Display Name is required' }]}
//           />
//           <ProFormText
//             name="username"
//             label="Username"
//             placeholder="Enter your username"
//             rules={[{ required: true, message: 'Username is required' }]}
//           />
//           <ProFormText.Password
//             name="password"
//             label="Password"
//             placeholder="Enter your password"
//             rules={[{ required: true, message: 'Password is required' }]}
//           />
//           <ProFormText.Password
//             name="passwordConfirmation"
//             label="Confirm Password"
//             placeholder="Confirm your password"
//             rules={[
//               { required: true, message: 'Password confirmation is required' },
//             ]}
//           />
//         </ProForm>
//       </Modal>
//       {/* Reset Password Modal */}
//       <Modal
//         title="Reset Password"
//         visible={isResetPasswordVisible}
//         onCancel={() => setIsResetPasswordVisible(false)}
//         footer={null}
//         className="reset-password-modal"
//       >
//         <ProForm
//           onFinish={(values) => handleForgotPassword(values.email)}
//           layout="vertical"
//           submitter={{
//             render: (props) => (
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'flex-end',
//                   gap: '10px',
//                 }}
//               >
//                 <Button
//                   type="default"
//                   onClick={() => props?.reset?.()} // Reset fields on button click
//                 >
//                   Reset
//                 </Button>
//                 <Button type="primary" htmlType="submit">
//                   Send Reset Link
//                 </Button>
//               </div>
//             ),
//           }}
//         >
//           <ProFormText
//             name="email"
//             label="Email"
//             placeholder="Enter your email"
//             rules={[{ required: true, message: 'Email is required' }]}
//           />
//         </ProForm>
//       </Modal>
//     </div>
//   );
// };
// export default LoginPage;
var icons_1 = require("@ant-design/icons");
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var react_1 = require("react");
var umi_1 = require("umi");
require("./login.less");
var LoginPage = function () {
    var _a = react_1.useState(false), isSignUpVisible = _a[0], setIsSignUpVisible = _a[1];
    var _b = react_1.useState(false), isResetPasswordVisible = _b[0], setIsResetPasswordVisible = _b[1];
    var handleFinish = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = values.email, password = values.password;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, umi_1.request("/auth/login", {
                            method: 'POST',
                            data: { login: email, password: password }
                        })];
                case 2:
                    response = _a.sent();
                    if (response.success) {
                        antd_1.message.success('Login successful!');
                        localStorage.setItem('planner_t', response.token);
                        umi_1.history.push('/');
                    }
                    else {
                        antd_1.message.error('Login failed. Please try again.');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    antd_1.message.error('An error occurred. Please try again.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleGoogleSignIn = function () {
        // Implement Google Sign-In logic here
    };
    var handleForgotPassword = function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/auth/forgot-password', {
                            method: 'POST',
                            data: { email: email }
                        })];
                case 1:
                    response = _a.sent();
                    if (response.success) {
                        antd_1.message.success('Password reset link sent to your email!');
                        setIsResetPasswordVisible(false); // Close the reset password modal
                    }
                    else {
                        antd_1.message.error('Failed to send password reset link.');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    antd_1.message.error('An error occurred. Please try again.');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleSignUp = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/auth/register', {
                            method: 'POST',
                            data: {
                                email: values.email,
                                display_name: values.displayName,
                                username: values.username,
                                password: values.password,
                                password_confirmation: values.passwordConfirmation,
                                timezone: 'UTC',
                                role: '9cffe655-dc69-4d80-b4b3-2dde5f0cfb85'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (response.success) {
                        antd_1.message.success('Sign-up successful! Please log in.');
                        setIsSignUpVisible(false); // Close the sign-up modal
                        setTimeout(function () {
                            // Reset form fields
                            var form = document.querySelector('.signup-modal .ant-form');
                            if (form)
                                form.reset();
                        }, 300);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    antd_1.message.error('An error occurred. Please try again.');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "login-container" },
        react_1["default"].createElement(pro_components_1.ProCard, { bordered: true, className: "login-card" },
            react_1["default"].createElement("div", { className: "login-content" },
                react_1["default"].createElement("div", { className: "login-left" },
                    react_1["default"].createElement("img", { src: "/logo.png", alt: "Company Logo", className: "login-logo" }),
                    react_1["default"].createElement("h2", { className: "login-title" }, "Planner Admin Dashboard")),
                react_1["default"].createElement("div", { className: "login-right" },
                    react_1["default"].createElement(antd_1.Button, { type: "primary", icon: react_1["default"].createElement(icons_1.GoogleOutlined, null), className: "google-signin-button", onClick: handleGoogleSignIn }, "Sign in with Google"),
                    react_1["default"].createElement(antd_1.Divider, { plain: true }, "or"),
                    react_1["default"].createElement(pro_components_1.ProForm, { onFinish: handleFinish, layout: "vertical", submitter: {
                            render: function () { return null; }
                        } },
                        react_1["default"].createElement(pro_components_1.ProFormText, { name: "email", label: "Email", placeholder: "Enter your email", rules: [{ required: true, message: 'Email is required' }] }),
                        react_1["default"].createElement(pro_components_1.ProFormText.Password, { name: "password", label: "Password", placeholder: "Enter your password", rules: [{ required: true, message: 'Password is required' }] }),
                        react_1["default"].createElement(pro_components_1.ProForm.Item, null,
                            react_1["default"].createElement(antd_1.Button, { type: "link", className: "forgot-password-link", onClick: function () { return setIsResetPasswordVisible(true); } }, "Forgot Password?"),
                            react_1["default"].createElement(antd_1.Button, { type: "link", className: "signup-link", onClick: function () { return setIsSignUpVisible(true); } }, "Sign Up")),
                        react_1["default"].createElement(pro_components_1.ProForm.Item, null,
                            react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit", className: "login-button" }, "Login")))))),
        react_1["default"].createElement(antd_1.Modal, { title: "Sign Up", visible: isSignUpVisible, onCancel: function () { return setIsSignUpVisible(false); }, footer: null, className: "signup-modal" },
            react_1["default"].createElement(pro_components_1.ProForm, { onFinish: handleSignUp, layout: "vertical", submitter: {
                    render: function (props) { return (react_1["default"].createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '10px'
                        } },
                        react_1["default"].createElement(antd_1.Button, { type: "default", onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.reset) === null || _a === void 0 ? void 0 : _a.call(props); } }, "Reset"),
                        react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Sign Up"))); }
                } },
                react_1["default"].createElement(pro_components_1.ProFormText, { name: "email", label: "Email", placeholder: "Enter your email", rules: [{ required: true, message: 'Email is required' }] }),
                react_1["default"].createElement(pro_components_1.ProFormText, { name: "displayName", label: "Display Name", placeholder: "Enter your display name", rules: [{ required: true, message: 'Display Name is required' }] }),
                react_1["default"].createElement(pro_components_1.ProFormText, { name: "username", label: "Username", placeholder: "Enter your username", rules: [{ required: true, message: 'Username is required' }] }),
                react_1["default"].createElement(pro_components_1.ProFormText.Password, { name: "password", label: "Password", placeholder: "Enter your password", rules: [{ required: true, message: 'Password is required' }] }),
                react_1["default"].createElement(pro_components_1.ProFormText.Password, { name: "passwordConfirmation", label: "Confirm Password", placeholder: "Confirm your password", rules: [
                        { required: true, message: 'Password confirmation is required' },
                    ] }))),
        react_1["default"].createElement(antd_1.Modal, { title: "Reset Password", visible: isResetPasswordVisible, onCancel: function () { return setIsResetPasswordVisible(false); }, footer: null, className: "reset-password-modal" },
            react_1["default"].createElement(pro_components_1.ProForm, { onFinish: function (values) { return handleForgotPassword(values.email); }, layout: "vertical", submitter: {
                    render: function (props) { return (react_1["default"].createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '10px'
                        } },
                        react_1["default"].createElement(antd_1.Button, { type: "default", onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.reset) === null || _a === void 0 ? void 0 : _a.call(props); } }, "Reset"),
                        react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Send Reset Link"))); }
                } },
                react_1["default"].createElement(pro_components_1.ProFormText, { name: "email", label: "Email", placeholder: "Enter your email", rules: [{ required: true, message: 'Email is required' }] })))));
};
exports["default"] = LoginPage;
