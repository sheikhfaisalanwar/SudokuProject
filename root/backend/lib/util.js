"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJson = exports.computeSubgrid = void 0;
var fs = require('fs');
function computeSubgrid(position) {
    var subgrid = {
        start_x_index: Math.floor(position.row / 3) * 3,
        start_y_index: Math.floor(position.column / 3) * 3,
        end_x_index: (Math.floor(position.row / 3) * 3) + 3,
        end_y_index: (Math.floor(position.column / 3) * 3) + 3
    };
    return subgrid;
}
exports.computeSubgrid = computeSubgrid;
function readJson() {
    fs.readFile("..");
}
exports.readJson = readJson;
