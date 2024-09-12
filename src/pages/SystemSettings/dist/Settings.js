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
var react_1 = require("react");
var antd_1 = require("antd");
var umi_1 = require("umi");
var Title = antd_1.Typography.Title;
var Option = antd_1.Select.Option;
var Settings = function () {
    var form = antd_1.Form.useForm()[0];
    var _a = react_1.useState([]), serverOptions = _a[0], setServerOptions = _a[1];
    react_1.useEffect(function () {
        var fetchServerOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, umi_1.request('/mail-config')];
                    case 1:
                        response = _a.sent();
                        if (response.success) {
                            setServerOptions([{ value: 'smtp', label: 'SMTP' }, { value: 'sendmail', label: 'Sendmail' }]);
                        }
                        else {
                            antd_1.message.error(response.message || 'Failed to fetch server options');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        antd_1.message.error('Failed to fetch server options');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchServerOptions();
    }, []);
    var handleUpdateConfig = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, umi_1.request('/mail-config/update', {
                            method: 'POST',
                            data: values
                        })];
                case 1:
                    _a.sent();
                    antd_1.message.success('Email configuration updated successfully');
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    antd_1.message.error('Failed to update email configuration');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(antd_1.Row, { justify: "center", align: "middle", style: { minHeight: '60vh' } },
        react_1["default"].createElement(antd_1.Col, { xs: 24, sm: 20, md: 16, lg: 12 },
            react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", onFinish: handleUpdateConfig, style: { padding: '16px', background: '#fff', borderRadius: '8px' } },
                react_1["default"].createElement(Title, { level: 4 }, "Email Configuration"),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Mailer", name: "mailer", rules: [{ required: true, message: 'Please select the mailer!' }] },
                    react_1["default"].createElement(antd_1.Select, { style: { width: '100%' } }, serverOptions.map(function (option) { return (react_1["default"].createElement(Option, { key: option.value, value: option.value }, option.label)); })))))));
};
exports["default"] = Settings;
