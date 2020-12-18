"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var services_1 = require("../services/services");
var DefaultBoardController = (function () {
    function DefaultBoardController() {
        this.get = '/getDefaultBoard';
        this.solve = '/solveDefaultBoard';
        this.router = express.Router();
        this.getDefaultBoard = function (req, res) {
            try {
                var base = new services_1.serializeBoard();
                res.json(base.setupBoard());
            }
            catch (e) {
                throw Error(e);
            }
        };
        this.solveDefaultBoard = function (req, res) {
            try {
                var base = new services_1.serializeBoard();
                base.setupBoard();
                res.json(base.returnSolved());
            }
            catch (e) {
                throw Error(e);
            }
        };
        this.initRoutes();
    }
    DefaultBoardController.prototype.initRoutes = function () {
        this.router.get(this.get, this.getDefaultBoard);
        this.router.get(this.solve, this.solveDefaultBoard);
    };
    return DefaultBoardController;
}());
exports.default = DefaultBoardController;
//# sourceMappingURL=DefaultBoardController.js.map