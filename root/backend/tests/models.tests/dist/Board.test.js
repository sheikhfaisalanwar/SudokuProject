"use strict";
exports.__esModule = true;
var Board_1 = require("../../models/Board");
var constants_1 = require("../../models/constants");
var chai_1 = require("chai");
describe('Board tests', function () {
    var board = new Board_1.Board();
    var row = 2;
    var column = 2;
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
        var cell = board.getCell(2, 2);
        chai_1.expect(cell.constructor.name).to.be.equal('Cell');
        chai_1.expect(cell.position.row).to.be.equal(2);
        chai_1.expect(cell.position.column).to.be.equal(2);
    });
    it('Check set strategy', function () {
        board.setStrategy(constants_1.alternativeStrategy);
        chai_1.expect(board.strategy.constructor.name).to.be.equal(constants_1.alternativeStrategy);
    });
    it('Check set populate board', function () {
        var v = board.populateBoard(constants_1.defaultPuzzle);
        var firstValue = constants_1.defaultPuzzle.split('')[0];
        chai_1.expect(v).to.be.instanceOf(Array);
        chai_1.expect(v.length).to.be.equal(constants_1.maxCellValue);
        chai_1.expect(firstValue).to.be.equal('8');
        chai_1.expect(v[0].constructor.name).to.be.equal('Cell');
        chai_1.expect(v[0].value).to.be.equal(firstValue);
    });
});
