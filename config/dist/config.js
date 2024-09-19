"use strict";
exports.__esModule = true;
var max_1 = require("@umijs/max");
var routes_1 = require("../src/routes");
exports["default"] = max_1.defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: 'Admin Panel',
        locale: false
    },
    // headScripts: [{ src: '/scripts/loading.js', async: true }],
    routes: routes_1["default"],
    npmClient: 'yarn',
    locale: {
        "default": 'en-US',
        antd: true,
        baseNavigator: false
    }
});
