"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = require("../../models/Cell");
var constants_1 = require("../../models/constants");
var chai_1 = require("chai");
describe('Cell tests', function () {
    var position = { row: 2, column: 2 };
    //Expected subgrid values from the 2,2 arbitraty position we specified
    var expected_start_x_index = 0;
    var expected_start_y_index = 0;
    var expected_end_x_index = 3;
    var expected_end_y_index = 3;
    var cell = new Cell_1.Cell(position);
    it('Check default Cell value', function () {
        chai_1.expect(cell.value).to.equal(constants_1.emptyCellValue);
    });
    it('Check subgrid calculated property', function () {
        var subgrid = cell.subgrid;
        chai_1.expect(subgrid.start_x_index).to.equal(expected_start_x_index);
        chai_1.expect(subgrid.start_y_index).to.equal(expected_start_y_index);
        chai_1.expect(subgrid.end_x_index).to.equal(expected_end_x_index);
        chai_1.expect(subgrid.end_y_index).to.equal(expected_end_y_index);
    });
    it('Check if cell is solved property', function () {
        chai_1.expect(cell.isSolved()).to.be.false;
        cell.value = '2';
        chai_1.expect(cell.isSolved()).to.be.true;
    });
    it('Check if cell.toString() and cell.toJSON is valid JSON', function () {
        chai_1.expect(cell.toJSON).to.not.throw(Error);
    });
});
