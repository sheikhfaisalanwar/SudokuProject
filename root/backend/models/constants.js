"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistanceFile = exports.alternativeStrategy = exports.defaultStrategy = exports.maxSubgridLength = exports.maxColumnValue = exports.maxRowValue = exports.maxCellValue = exports.emptyCellValue = exports.defaultPuzzle = exports.possibleSudokuValues = void 0;
exports.possibleSudokuValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
exports.defaultPuzzle = '856014730090000000240000160062059300031802450005340920024000073000000010018630294';
exports.emptyCellValue = '0';
exports.maxCellValue = 81;
exports.maxRowValue = 9;
exports.maxColumnValue = 9;
exports.maxSubgridLength = 9;
exports.defaultStrategy = 'RecursiveBruteForceStrategy';
exports.alternativeStrategy = 'AlternativeStrategy';
exports.persistanceFile = "../persistance/state.json";
//# sourceMappingURL=constants.js.map