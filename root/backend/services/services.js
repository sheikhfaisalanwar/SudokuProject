"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeDefaultBoard = exports.AlternativeStrategy = exports.RecursiveBruteForceStrategy = void 0;
var Board_1 = require("../models/Board");
var RecursiveBruteForceStrategy = /** @class */ (function () {
    function RecursiveBruteForceStrategy() {
    }
    RecursiveBruteForceStrategy.prototype.solve = function (board) {
        return board;
    };
    return RecursiveBruteForceStrategy;
}());
exports.RecursiveBruteForceStrategy = RecursiveBruteForceStrategy;
var AlternativeStrategy = /** @class */ (function () {
    function AlternativeStrategy() {
    }
    AlternativeStrategy.prototype.solve = function (board) {
        return board;
    };
    return AlternativeStrategy;
}());
exports.AlternativeStrategy = AlternativeStrategy;
var serializeDefaultBoard = /** @class */ (function () {
    function serializeDefaultBoard(board) {
        this.board = board;
    }
    serializeDefaultBoard.prototype.setupBoard = function () {
        var newBoard = new Board_1.Board();
        newBoard.populateBoard(this.board);
        return newBoard.toJSON();
    };
    return serializeDefaultBoard;
}());
exports.serializeDefaultBoard = serializeDefaultBoard;
