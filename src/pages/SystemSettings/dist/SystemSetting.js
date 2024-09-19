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
var Title = antd_1.Typography.Title;
var Option = antd_1.Select.Option;
var SystemSetting = function () {
    // State management for settings
    var _a = react_1.useState(true), isActive = _a[0], setIsActive = _a[1];
    var _b = react_1.useState(''), timezone = _b[0], setTimezone = _b[1];
    var _c = react_1.useState([]), availableTimezones = _c[0], setAvailableTimezones = _c[1];
    var _d = react_1.useState(false), isModalVisible = _d[0], setIsModalVisible = _d[1];
    var _e = react_1.useState(''), newSetting = _e[0], setNewSetting = _e[1];
    var _f = react_1.useState(true), emailNotifications = _f[0], setEmailNotifications = _f[1];
    var _g = react_1.useState('en'), selectedLanguage = _g[0], setSelectedLanguage = _g[1];
    react_1.useEffect(function () {
        // Fetch the current timezone of the site
        var fetchCurrentTimezone = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/timezones')];
                    case 1:
                        response = _b.sent();
                        setTimezone(((_a = response.data) === null || _a === void 0 ? void 0 : _a.timezone) || 'UTC'); // Adjust based on actual API response
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        antd_1.message.error('Failed to fetch current timezone');
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // Fetch the list of available timezones
        var fetchAvailableTimezones = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/available-timezones')];
                    case 1:
                        response = _a.sent();
                        if (Array.isArray(response.data)) {
                            setAvailableTimezones(response.data);
                        }
                        else {
                            throw new Error('Invalid response format');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        antd_1.message.error('Failed to fetch available timezones');
                        console.error(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchCurrentTimezone();
        fetchAvailableTimezones();
    }, []);
    var handleSwitchChange = function (checked) {
        setIsActive(checked);
    };
    var handleEmailNotificationsChange = function (checked) {
        setEmailNotifications(checked);
    };
    var handleLanguageChange = function (value) {
        setSelectedLanguage(value);
    };
    var handleTimezoneChange = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setTimezone(value);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, umi_1.request('/timezones/update', {
                            method: 'POST',
                            data: { timezone: value }
                        })];
                case 2:
                    _a.sent();
                    antd_1.message.success('Timezone updated successfully');
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    antd_1.message.error('Failed to update timezone');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var showModal = function () {
        setIsModalVisible(true);
    };
    var handleOk = function () {
        // Implement save settings logic here
        setIsModalVisible(false);
        antd_1.message.success('Settings saved successfully');
    };
    var handleCancel = function () {
        setIsModalVisible(false);
    };
    return (React.createElement(pro_components_1.ProCard, { title: "", bordered: true },
        React.createElement("div", { style: { padding: '16px' } },
            React.createElement(Title, { level: 4, style: { marginBottom: '16px' } }, "System Settings"),
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null,
                            "System is currently ",
                            isActive ? 'Active' : 'Offline'),
                        React.createElement(antd_1.Switch, { checked: isActive, onChange: handleSwitchChange }))),
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null,
                            "Current timezone:",
                            React.createElement(antd_1.Select, { value: timezone, onChange: handleTimezoneChange, style: { width: 200, marginLeft: 10 } }, availableTimezones.length > 0 ? (availableTimezones.map(function (tz) { return (React.createElement(Option, { key: tz, value: tz }, tz)); })) : (React.createElement(Option, { value: "" }, "No timezones available")))))),
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null, "Additional Setting"),
                        React.createElement(antd_1.Button, { type: "primary", onClick: showModal }, "Change Setting"))),
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null, "Email Notifications"),
                        React.createElement(antd_1.Switch, { checked: emailNotifications, onChange: handleEmailNotificationsChange }))),
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null, "Change Password"),
                        React.createElement(antd_1.Button, { type: "primary", onClick: function () {
                                return antd_1.message.info('Password change dialog to be implemented');
                            } }, "Change Password"))),
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null, "API Settings"),
                        React.createElement(antd_1.Button, { type: "primary", onClick: function () {
                                return antd_1.message.info('API settings dialog to be implemented');
                            } }, "Configure API"))),
                React.createElement(pro_components_1.ProCard, { bordered: true },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        } },
                        React.createElement("div", null, "Language Preference"),
                        React.createElement(antd_1.Select, { value: selectedLanguage, onChange: handleLanguageChange, style: { width: 200 } },
                            React.createElement(Option, { value: "en" }, "English"),
                            React.createElement(Option, { value: "es" }, "Spanish"),
                            React.createElement(Option, { value: "fr" }, "French")))))),
        React.createElement(antd_1.Modal, { title: "Change Setting", visible: isModalVisible, onOk: handleOk, onCancel: handleCancel },
            React.createElement(antd_1.Form, { layout: "vertical" },
                React.createElement(antd_1.Form.Item, { label: "New Setting" },
                    React.createElement(antd_1.Input, { value: newSetting, onChange: function (e) { return setNewSetting(e.target.value); } }))))));
};
exports["default"] = SystemSetting;
