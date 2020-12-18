"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var HomeController = (function () {
    function HomeController() {
        this.path = '/';
        this.router = express.Router();
        this.index = function (req, res) {
            res.json({ "test": "test" });
        };
        this.initRoutes();
    }
    HomeController.prototype.initRoutes = function () {
        this.router.get('/', this.index);
    };
    return HomeController;
}());
exports.default = HomeController;
//# sourceMappingURL=HomeController.js.map