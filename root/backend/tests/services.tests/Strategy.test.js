"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("../../models/Board");
var constants_1 = require("../../models/constants");
var services_1 = require("../../services/services");
var chai_1 = require("chai");
describe('Strategy tests', function () {
    var defBoard = new Board_1.Board();
    defBoard.populateBoard(constants_1.defaultPuzzle);
    var strategy = new services_1.RecursiveBruteForceStrategy();
    var solved;
    it("Check default solution", function () {
        solved = strategy.solve(defBoard);
        chai_1.expect(solved).to.be.true;
        chai_1.expect(defBoard.validateAllCells()).to.be.true;
    });
});
