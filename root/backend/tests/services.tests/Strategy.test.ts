import { Board } from "../../models/Board"
import {
    defaultStrategy,
    alternativeStrategy,
    maxCellValue,
    defaultPuzzle,
    emptyCellValue,
    maxSubgridLength
} from "../../models/constants"
import { RecursiveBruteForceStrategy } from "../../services/services";
import { expect } from 'chai';
import {CellCoordinate} from "../../models/Cell";


describe('Strategy tests', () => {
    let defBoard = new Board();
    defBoard.populateBoard(defaultPuzzle);
    let strategy = new RecursiveBruteForceStrategy();
    let solved: boolean

    it("Check default solution", () =>{
        solved = strategy.solve(defBoard);
        expect(solved).to.be.true;
        expect(defBoard.validateAllCells()).to.be.true;
    })
})