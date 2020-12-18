"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("../../models/Board");
var constants_1 = require("../../models/constants");
var chai_1 = require("chai");
describe('Board tests', function () {
    var board = new Board_1.Board();
    var row = 2;
    var column = 2;
    var position = { row: 2, column: 2 };
    // Expected limits for subgrid retrieval
    var expected_start_x_index = 0;
    var expected_start_y_index = 0;
    var expected_end_x_index = 3;
    var expected_end_y_index = 3;
    var validSolutionForCell = '2';
    var inValidSolutionForCell = '3';
    it('Check default constructor values', function () {
        //Check if Array
        chai_1.expect(board.boardStructure).to.be.instanceOf(Array);
        //Check max length is of specified value
        chai_1.expect(board.boardStructure).to.have.lengthOf(constants_1.maxCellValue);
        //Check default strategy class instance
        chai_1.expect(board.strategy.constructor.name).to.be.equal(constants_1.defaultStrategy);
        //Check if array consists of cell object
        chai_1.expect(board.boardStructure[0].constructor.name).to.be.equal('Cell');
    });
    it('Check Cell Object retrieval', function () {
        var cell = board.getCell(row, column);
        chai_1.expect(cell.constructor.name).to.be.equal('Cell');
        chai_1.expect(cell.position.row).to.be.equal(row);
        chai_1.expect(cell.position.column).to.be.equal(column);
    });
    it('Check row retrieval', function () {
        var rowArray = board.getRow(row);
        chai_1.expect(rowArray).to.instanceOf(Array);
        chai_1.expect(rowArray).to.satisfy(function (rows) {
            return rows.every(function (r) {
                return r.position.row === row;
            });
        });
    });
    it('Check column retrieval', function () {
        var columnArray = board.getColumn(column);
        chai_1.expect(columnArray).to.instanceOf(Array);
        chai_1.expect(columnArray).to.satisfy(function (columns) {
            return columns.every(function (c) {
                return c.position.column === column;
            });
        });
    });
    it('Check subgrid retrieval', function () {
        var cellSubgrid = board.getCellSubgrid(position);
        chai_1.expect(cellSubgrid).to.instanceOf(Array);
        chai_1.expect(cellSubgrid.length).to.equal(constants_1.maxSubgridLength);
        chai_1.expect(cellSubgrid).to.satisfy(function (cells) {
            return cells.every(function (c) {
                return (c.position.row >= expected_start_x_index &&
                    c.position.row < expected_end_x_index &&
                    c.position.column >= expected_start_y_index &&
                    c.position.column < expected_end_y_index);
            });
        });
    });
    it('Check empty cell retrieval', function () {
        var emptyCells = board.getAllEmpty();
        chai_1.expect(emptyCells).to.instanceOf(Array);
        chai_1.expect(emptyCells).to.satisfy(function (rows) {
            return rows.every(function (r) {
                return r.value === '0';
            });
        });
        var first_empty = board.getFirstEmpty();
        chai_1.expect(first_empty.value).to.be.equal(constants_1.emptyCellValue);
    });
    it('Check set strategy', function () {
        board.setStrategy(constants_1.alternativeStrategy);
        chai_1.expect(board.strategy.constructor.name).to.be.equal(constants_1.alternativeStrategy);
    });
    it('Check set populate board', function () {
        var v = board.populateBoard(constants_1.defaultPuzzle);
        var firstValue = constants_1.defaultPuzzle.split('')[0];
        chai_1.expect(v).to.be.instanceOf(Array);
        // Max length should be less than 81
        chai_1.expect(v.length).to.be.equal(constants_1.maxCellValue);
        // First value of default puzzle
        chai_1.expect(firstValue).to.be.equal('8');
        //Check if the value of the first cell is equal to first value in default puzzle
        chai_1.expect(v[0].constructor.name).to.be.equal('Cell');
        chai_1.expect(v[0].value).to.be.equal(firstValue);
    });
    it('Check set cell', function () {
        var newBoard = new Board_1.Board();
        newBoard.populateBoard(constants_1.defaultPuzzle);
        var first_empty = newBoard.getFirstEmpty();
        chai_1.expect(first_empty.value).to.be.equal(constants_1.emptyCellValue);
        var c = newBoard.setCell(inValidSolutionForCell, first_empty);
        chai_1.expect(c.value).to.be.equal(inValidSolutionForCell);
    });
    it('Check valid cell', function () {
        var newBoard = new Board_1.Board();
        newBoard.populateBoard(constants_1.defaultPuzzle);
        var first_empty = newBoard.getFirstEmpty();
        chai_1.expect(first_empty.value).to.be.equal(constants_1.emptyCellValue);
        var c = newBoard.setCell(inValidSolutionForCell, first_empty);
        chai_1.expect(c.value).to.be.equal(inValidSolutionForCell);
        chai_1.expect(newBoard.checkValid(c, inValidSolutionForCell)).to.be.false;
        c = newBoard.setCell(validSolutionForCell, c);
        chai_1.expect(c.value).to.be.equal(validSolutionForCell);
        chai_1.expect(newBoard.checkValid(c, validSolutionForCell)).to.be.true;
    });
    it('Check if board.toString() and board.toJSON is valid JSON', function () {
        chai_1.expect(board.toJSON).to.not.throw(Error);
    });
});
