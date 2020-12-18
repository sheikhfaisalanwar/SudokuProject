"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeBoard = exports.AlternativeStrategy = exports.RecursiveBruteForceStrategy = void 0;
var Board_1 = require("../models/Board");
var constants_1 = require("../models/constants");
var RecursiveBruteForceStrategy = (function () {
    function RecursiveBruteForceStrategy() {
    }
    RecursiveBruteForceStrategy.prototype.solve = function (board) {
        var emptyCell = board.getFirstEmpty();
        if (emptyCell == null) {
            board.setSolved();
            return true;
        }
        for (var i = 1; i <= 9; i++) {
            if (board.checkValid(emptyCell, String(i))) {
                var cell = board.setCell(String(i), emptyCell);
                if (this.solve(board)) {
                    return true;
                }
                board.setCell(constants_1.emptyCellValue, cell);
            }
        }
        return false;
    };
    RecursiveBruteForceStrategy.prototype.validateSolved = function (board) {
        return board.validateAllCells();
    };
    return RecursiveBruteForceStrategy;
}());
exports.RecursiveBruteForceStrategy = RecursiveBruteForceStrategy;
var AlternativeStrategy = (function () {
    function AlternativeStrategy() {
    }
    AlternativeStrategy.prototype.solve = function (board) {
        return [board, false];
    };
    AlternativeStrategy.prototype.validateSolved = function (board) {
        return board.validateAllCells();
    };
    return AlternativeStrategy;
}());
exports.AlternativeStrategy = AlternativeStrategy;
var serializeBoard = (function () {
    function serializeBoard(board_rep) {
        if (board_rep === void 0) { board_rep = constants_1.defaultPuzzle; }
        this.board_rep = board_rep;
        this.newBoard = new Board_1.Board();
    }
    serializeBoard.prototype.setupBoard = function () {
        this.newBoard.populateBoard(this.board_rep);
        return this.newBoard.toJSON();
    };
    serializeBoard.prototype.returnSolved = function () {
        var solved = this.newBoard.solve();
        if (this.newBoard.solve()) {
            return this.newBoard.toJSON();
        }
    };
    return serializeBoard;
}());
exports.serializeBoard = serializeBoard;
//# sourceMappingURL=services.js.map