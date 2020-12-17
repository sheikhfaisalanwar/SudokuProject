"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
var constants_1 = require("../models/constants");
var util_1 = require("../lib/util");
var Cell = /** @class */ (function () {
    function Cell(position, value) {
        var _this = this;
        if (value === void 0) { value = constants_1.emptyCellValue; }
        this.position = position;
        this.value = value;
        this.toString = function () {
            return ("{\n            \"position\" : \"" + _this.position.row + "," + _this.position.column + "\",\n            \"value\" :  \"" + _this.value + "\"  \n        }").replace(/(\r\n|\n|\r)/g, "");
            // return `{"(${this.position.row},${this.position.column})" : "${this.value}"}`
            //     .replace(/(\r\n|\n|\r)/g, "");
        };
        this.toJSON = function () {
            return JSON.parse(_this.toString());
        };
    }
    Object.defineProperty(Cell.prototype, "subgrid", {
        get: function () {
            var subgrid = util_1.computeSubgrid(this.position);
            return subgrid;
        },
        enumerable: false,
        configurable: true
    });
    Cell.prototype.isSolved = function () {
        if (this.value == constants_1.emptyCellValue) {
            return false;
        }
        return true;
    };
    Cell.prototype.solve = function () {
        return false;
    };
    return Cell;
}());
exports.Cell = Cell;
