"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfDuplicateExists = exports.computeSubgrid = void 0;
var fs = require('fs');
function computeSubgrid(position) {
    return {
        start_x_index: Math.floor(position.row / 3) * 3,
        start_y_index: Math.floor(position.column / 3) * 3,
        end_x_index: (Math.floor(position.row / 3) * 3) + 3,
        end_y_index: (Math.floor(position.column / 3) * 3) + 3
    };
}
exports.computeSubgrid = computeSubgrid;
function checkIfDuplicateExists(w) {
    return new Set(w).size !== w.length;
}
exports.checkIfDuplicateExists = checkIfDuplicateExists;
//# sourceMappingURL=util.js.map