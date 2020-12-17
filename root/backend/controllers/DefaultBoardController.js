"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var constants_1 = require("../models/constants");
var services_1 = require("../services/services");
var DefaultBoardController = /** @class */ (function () {
    function DefaultBoardController() {
        this.get = '/getDefaultBoard';
        this.solve = '/solveDefaultBoard';
        this.router = express.Router();
        this.getDefaultBoard = function (req, res) {
            try {
                var base = new services_1.serializeDefaultBoard(constants_1.defaultPuzzle);
                res.json(base.setupBoard());
            }
            catch (e) {
                throw Error(e);
            }
        };
        this.solveDeFaultBoard = function (req, res) {
            try {
                var base = new services_1.serializeDefaultBoard(constants_1.defaultPuzzle);
                res.json(base.setupBoard());
            }
            catch (e) {
                throw Error(e);
            }
        };
        this.initRoutes();
    }
    DefaultBoardController.prototype.initRoutes = function () {
        this.router.get(this.get, this.getDefaultBoard);
        this.router.post(this.solve, this.solveDeFaultBoard);
    };
    return DefaultBoardController;
}());
exports.default = DefaultBoardController;
