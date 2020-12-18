"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var services_1 = require("../services/services");
var Cell_1 = require("./Cell");
var constants_1 = require("./constants");
var Board = (function () {
    function Board() {
        var _this = this;
        this.toString = function () {
            var cell_string = '';
            _this.boardStructure.forEach(function (item) {
                cell_string += item.toString() + ",";
            });
            cell_string = cell_string.slice(0, -1);
            var string_board = ("{\"Cells\": [" + cell_string + "]}")
                .replace(/(\r\n|\n|\r)/g, "");
            return string_board;
        };
        this.toJSON = function () {
            return JSON.parse(_this.toString());
        };
        this.strategy = new services_1.RecursiveBruteForceStrategy();
        this.isSolved = false;
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
    Board.prototype.getRow = function (row) {
        return this.boardStructure.filter(function (cell) {
            return cell.position.row == row;
        });
    };
    Board.prototype.getColumn = function (column) {
        return this.boardStructure.filter(function (cell) {
            return cell.position.column == column;
        });
    };
    Board.prototype.getCellSubgrid = function (position) {
        var cell = this.getCell(position.row, position.column);
        var sValues = cell.subgrid;
        var rowsInSubgrid = this.boardStructure.filter(function (cell) {
            return cell.position.row >= sValues.start_x_index &&
                cell.position.row < sValues.end_x_index;
        });
        return rowsInSubgrid.filter(function (cell) {
            return cell.position.column >= sValues.start_y_index &&
                cell.position.column < sValues.end_y_index;
        });
    };
    Board.prototype.getAllEmpty = function () {
        return this.boardStructure.filter(function (cell) {
            return cell.isSolved() == false;
        });
    };
    Board.prototype.getFirstEmpty = function () {
        return this.boardStructure.filter(function (cell) {
            return cell.isSolved() == false;
        })[0];
    };
    Board.prototype.getValueOfCells = function (cells) {
        return cells.map(function (cell) { return cell.value; });
    };
    Board.prototype.checkValid = function (cell, value) {
        var _this = this;
        this.setCell(value, cell);
        var valid = true;
        var rowCellValues = this.getValueOfCells(this.getRow(cell.position.row));
        var columnCellValues = this.getValueOfCells(this.getColumn(cell.position.column));
        var gridCellValues = this.getValueOfCells(this.getCellSubgrid(cell.position));
        var validityGroups = [
            rowCellValues,
            columnCellValues,
            gridCellValues
        ];
        validityGroups.forEach(function (group) {
            if (group.filter(function (i) { return i == value; }).length > 1) {
                valid = false;
                _this.setCell(constants_1.emptyCellValue, cell);
            }
        });
        return valid;
    };
    Board.prototype.setCell = function (value, cell) {
        var board_cell = this.getCell(cell.position.row, cell.position.column);
        var cellIndex = this.boardStructure.indexOf(board_cell);
        if (~cellIndex) {
            board_cell.value = value;
            this.boardStructure[cellIndex] = board_cell;
        }
        return board_cell;
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
    Board.prototype.validateAllCells = function () {
        var _this = this;
        function valid(cell, board) {
            var valid = true;
            var rowCellValues = board.getValueOfCells(board.getRow(cell.position.row));
            var columnCellValues = board.getValueOfCells(board.getColumn(cell.position.column));
            var gridCellValues = board.getValueOfCells(board.getCellSubgrid(cell.position));
            var validityGroups = [
                rowCellValues,
                columnCellValues,
                gridCellValues
            ];
            validityGroups.forEach(function (group) {
                var valueSet = new Set(group);
                if (valueSet.size != group.length) {
                    valid = false;
                }
            });
            return valid;
        }
        return this.boardStructure.every(function (cell) { return valid(cell, _this); });
    };
    Board.prototype.setSolved = function () {
        this.isSolved = true;
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=Board.js.map