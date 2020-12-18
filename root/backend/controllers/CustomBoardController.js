"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var services_1 = require("../services/services");
var CustomBoardController = (function () {
    function CustomBoardController() {
        this.get = '/getCustomBoard/:puzzle';
        this.solve = '/solveCustomBoard/:puzzle';
        this.router = express.Router();
        this.getCustomBoard = function (req, res) {
            try {
                var base = new services_1.serializeBoard(req.query.puzzle);
                res.json(base.setupBoard());
            }
            catch (e) {
                throw Error(e);
            }
        };
        this.solveCustomBoard = function (req, res) {
            try {
                var base = new services_1.serializeBoard(req.query.puzzle);
                base.setupBoard();
                res.json(base.returnSolved());
            }
            catch (e) {
                throw Error(e);
            }
        };
        this.initRoutes();
    }
    CustomBoardController.prototype.initRoutes = function () {
        this.router.post(this.get, this.getCustomBoard);
        this.router.post(this.solve, this.solveCustomBoard);
    };
    return CustomBoardController;
}());
exports.default = CustomBoardController;
//# sourceMappingURL=CustomBoardController.js.map