"use strict";
exports.__esModule = true;
exports.Board = void 0;
var services_1 = require("../services/services");
var Cell_1 = require("./Cell");
var constants_1 = require("./constants");
var Board = /** @class */ (function () {
    function Board() {
        var _this = this;
        this.toString = function () {
            var string_board = "\"{\n            \"Cells\": \"[\n                " + _this.boardStructure.forEach(function (item) {
                item.toString();
            }) + "\n            ]\"\n        }\"";
            return string_board;
        };
        // Set Default Strategy
        this.strategy = new services_1.RecursiveBruteForceStrategy();
        // Create empty board with default 9x9 grid
        this.boardStructure = [];
        for (var i = 0; i < constants_1.maxRowValue; i++) {
            for (var j = 0; j < constants_1.maxColumnValue; j++) {
                var position = { row: i, column: j };
                var cell = new Cell_1.Cell(position);
                this.boardStructure.push(cell);
            }
        }
    }
    Board.prototype.setBoardStructure = function (boardStructure) {
        this.boardStructure.length = 0;
    };
    Board.prototype.getCell = function (row, column) {
        return this.boardStructure.find(function (cell) {
            return cell.position.row === row &&
                cell.position.column === column;
        });
    };
    Board.prototype.setStrategy = function (strategy) {
        if (strategy === constants_1.defaultStrategy) {
            this.strategy = new services_1.RecursiveBruteForceStrategy();
        }
        else if (strategy === constants_1.alternativeStrategy) {
            this.strategy = new services_1.AlternativeStrategy();
        }
    };
    Board.prototype.populateBoard = function (board_string) {
        var _this = this;
        var newBoardStructure = [];
        var value_list = board_string.split('');
        if (value_list.length != constants_1.maxCellValue) {
            throw new Error("String length is larger than max cells in a sudoku board");
        }
        var size = constants_1.maxRowValue;
        var arrayOfRows = [];
        for (var i = 0; i < value_list.length; i += size) {
            arrayOfRows.push(value_list.slice(i, i + size));
        }
        arrayOfRows.forEach(function (rowArray, rowNumber) {
            rowArray.forEach(function (columnValue, columnNumber) {
                var cell = _this.getCell(rowNumber, columnNumber);
                cell.value = columnValue;
                newBoardStructure.push(cell);
            });
        });
        return newBoardStructure;
        // this.boardStructure = newBoardStructure
    };
    Board.prototype.solve = function () {
        return this.strategy.solve(this);
    };
    return Board;
}());
exports.Board = Board;
