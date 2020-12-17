"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var services_1 = require("../services/services");
var Cell_1 = require("./Cell");
var constants_1 = require("./constants");
var Board = /** @class */ (function () {
    function Board() {
        var _this = this;
        this.toString = function () {
            var cell_string = '';
            _this.boardStructure.forEach(function (item) {
                cell_string += item.toString() + ",";
            });
            // Remove ending seperator for valid json string
            cell_string = cell_string.slice(0, -1);
            var string_board = ("{\"Cells\": [" + cell_string + "]}")
                .replace(/(\r\n|\n|\r)/g, "");
            return string_board;
        };
        this.toJSON = function () {
            return JSON.parse(_this.toString());
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
        this.boardStructure = boardStructure;
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
        this.setBoardStructure(newBoardStructure);
        return this.boardStructure;
    };
    Board.prototype.solve = function () {
        return this.strategy.solve(this);
    };
    return Board;
}());
exports.Board = Board;
