"use strict";
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
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var react_1 = require("react");
var umi_1 = require("umi");
var ResetPasswordPage = function () {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(null), token = _b[0], setToken = _b[1];
    var _c = react_1.useState(null), email = _c[0], setEmail = _c[1];
    var location = umi_1.useLocation();
    react_1.useEffect(function () {
        // Extract token and email from the URL query params
        var urlParams = new URLSearchParams(location.search);
        var token = urlParams.get('token');
        var email = urlParams.get('email');
        if (token && email) {
            setToken(token);
            setEmail(email);
            setLoading(false);
        }
        else {
            antd_1.message.error('Invalid or missing token.');
            umi_1.history.push('/login');
        }
    }, [location.search]);
    var handleResetPassword = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var password, confirmPassword, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = values.password, confirmPassword = values.confirmPassword;
                    if (password !== confirmPassword) {
                        antd_1.message.error('Passwords do not match.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, umi_1.request('/auth/reset-password', {
                            method: 'POST',
                            data: { email: email, token: token, password: password }
                        })];
                case 2:
                    response = _a.sent();
                    if (response.success) {
                        antd_1.message.success('Password reset successful. Please log in.');
                        umi_1.history.push('/login');
                    }
                    else {
                        antd_1.message.error('Password reset failed. Please try again.');
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
    return (react_1["default"].createElement("div", { className: "reset-password-container" },
        react_1["default"].createElement(antd_1.PageHeader, { title: "Reset Password" }),
        react_1["default"].createElement(pro_components_1.ProForm, { onFinish: handleResetPassword, layout: "vertical", submitter: {
                render: function (props) { return (react_1["default"].createElement("div", { style: {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '10px'
                    } },
                    react_1["default"].createElement(antd_1.Button, { type: "default", onClick: function () { var _a; return (_a = props === null || props === void 0 ? void 0 : props.reset) === null || _a === void 0 ? void 0 : _a.call(props); } }, "Reset"),
                    react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit", loading: loading }, "Reset Password"))); }
            } },
            react_1["default"].createElement(pro_components_1.ProFormText.Password, { name: "password", label: "New Password", placeholder: "Enter your new password", rules: [{ required: true, message: 'New password is required' }] }),
            react_1["default"].createElement(pro_components_1.ProFormText.Password, { name: "confirmPassword", label: "Confirm New Password", placeholder: "Confirm your new password", rules: [{ required: true, message: 'Password confirmation is required' }] }))));
};
exports["default"] = ResetPasswordPage;
