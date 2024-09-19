"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.request = exports.layout = exports.getInitialState = void 0;
var max_1 = require("@umijs/max");
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var requestErrorConfig_1 = require("./requestErrorConfig");
// Fetch user profile informatio
function getInitialState() {
    return __awaiter(this, void 0, Promise, function () {
        var fetchUserInfo, currentUser;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetchUserInfo = function () { return __awaiter(_this, void 0, void 0, function () {
                        var response, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, max_1.request("/user/profile")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, __assign({}, response === null || response === void 0 ? void 0 : response.data)];
                                case 2:
                                    error_1 = _a.sent();
                                    console.log(error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!(max_1.history.location.pathname !== '/user/login')) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchUserInfo()];
                case 1:
                    currentUser = _a.sent();
                    return [2 /*return*/, {
                            currentUser: __assign({}, currentUser),
                            fetchUserInfo: fetchUserInfo,
                            name: (currentUser === null || currentUser === void 0 ? void 0 : currentUser.display_name) || 'Admin Panel'
                        }];
                case 2: return [2 /*return*/, { name: 'Admin Panel', fetchUserInfo: fetchUserInfo }];
            }
        });
    });
}
exports.getInitialState = getInitialState;
// Handle logout function
var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, max_1.request('/auth/logout', {
                        method: 'POST'
                    })];
            case 1:
                _a.sent();
                antd_1.message.success('Logged out successfully');
                max_1.history.push('/user/login');
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                antd_1.message.error('Logout failed, please try again.');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.layout = function (_a) {
    var initialState = _a.initialState;
    return {
        layout: 'side',
        headerRender: false,
        footerRender: false,
        fixedHeader: true,
        fixSiderbar: true,
        siderWidth: 200,
        actionsRender: function () { return [
            React.createElement(antd_1.Button, { key: "logout", icon: React.createElement(icons_1.LogoutOutlined, null), type: "text", onClick: handleLogout, style: { color: '#f5222d', marginRight: 16 } }, "Logout"),
        ]; },
        menu: {
            locale: false
        }
    };
};
exports.request = __assign({}, requestErrorConfig_1.errorConfig);
