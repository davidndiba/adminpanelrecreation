"use strict";
exports.__esModule = true;
exports.getUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.queryUsers = void 0;
var max_1 = require("@umijs/max");
var baseUrl = 'https://planner-dev-backend.microvision.co.ke/api/v1';
exports.queryUsers = function () { return max_1.request(baseUrl + "/users"); };
exports.addUser = function (data) {
    return max_1.request(baseUrl + "/auth/register", {
        method: 'POST',
        data: data
    });
};
exports.updateUser = function (userId, data) {
    return max_1.request(baseUrl + "/users/" + userId, {
        method: 'PUT',
        data: data
    });
};
exports.deleteUser = function (userId) {
    return max_1.request(baseUrl + "/users/" + userId, {
        method: 'DELETE'
    });
};
exports.getUser = function (userId) {
    return max_1.request(baseUrl + "/users/" + userId);
};
