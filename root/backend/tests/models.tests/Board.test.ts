import { Board } from "../../models/Board"
import {
    defaultStrategy,
    alternativeStrategy,
    maxCellValue,
    defaultPuzzle,
    emptyCellValue,
    maxSubgridLength
} from "../../models/constants"
import { expect } from 'chai';
import {CellCoordinate} from "../../models/Cell";


describe('Board tests', () => {
    let board = new Board()
    let row = 2
    let column = 2
    let position: CellCoordinate = {row: 2, column: 2};
    // Expected limits for subgrid retrieval
    let expected_start_x_index: number = 0;
    let expected_start_y_index: number = 0;
    let expected_end_x_index: number = 3;
    let expected_end_y_index: number = 3;
    let validSolutionForCell = '2';
    let inValidSolutionForCell = '3'


    it('Check default constructor values', () => {
        //Check if Array
        expect(board.boardStructure).to.be.instanceOf(Array);
        //Check max length is of specified value
        expect(board.boardStructure).to.have.lengthOf(maxCellValue);
        //Check default strategy class instance
        expect(board.strategy.constructor.name).to.be.equal(defaultStrategy);
        //Check if array consists of cell object
        expect(board.boardStructure[0].constructor.name).to.be.equal('Cell');
    })

    it('Check Cell Object retrieval', () =>  {
        let cell = board.getCell(row,column)
        expect(cell.constructor.name).to.be.equal('Cell');
        expect(cell.position.row).to.be.equal(row);
        expect(cell.position.column).to.be.equal(column);
    })

    it('Check row retrieval',() => {
        let rowArray = board.getRow(row);
        expect(rowArray).to.instanceOf(Array);
        expect(rowArray).to.satisfy(function(rows) {
            return rows.every(function(r) {
                return r.position.row === row;
            });
        });
    })

    it('Check column retrieval',() => {
        let columnArray = board.getColumn(column);
        expect(columnArray).to.instanceOf(Array);
        expect(columnArray).to.satisfy(function(columns) {
            return columns.every(function(c) {
                return c.position.column === column;
            });
        });
    })

    it('Check subgrid retrieval', () => {
        let cellSubgrid = board.getCellSubgrid(position);
        expect(cellSubgrid).to.instanceOf(Array);
        expect(cellSubgrid.length).to.equal(maxSubgridLength);
        expect(cellSubgrid).to.satisfy(function(cells) {
            return cells.every(function(c) {
                return (
                    c.position.row >= expected_start_x_index &&
                    c.position.row < expected_end_x_index &&
                    c.position.column >= expected_start_y_index &&
                    c.position.column < expected_end_y_index
                )
            });
        });
    })

    it('Check empty cell retrieval', () =>  {
        let emptyCells = board.getAllEmpty()
        expect(emptyCells).to.instanceOf(Array);
        expect(emptyCells).to.satisfy(function(rows) {
            return rows.every(function(r) {
                return r.value === '0';
            });
        });
        let first_empty = board.getFirstEmpty();
        expect(first_empty.value).to.be.equal(emptyCellValue);
    })

    it('Check set strategy', () =>  {
        board.setStrategy(alternativeStrategy);
        expect(board.strategy.constructor.name).to.be.equal(alternativeStrategy);
    })

    it('Check set populate board', () =>{
        let v = board.populateBoard(defaultPuzzle);
        let firstValue = defaultPuzzle.split('')[0];
        expect(v).to.be.instanceOf(Array);
        // Max length should be less than 81
        expect(v.length).to.be.equal(maxCellValue);
        // First value of default puzzle
        expect(firstValue).to.be.equal('8');
        //Check if the value of the first cell is equal to first value in default puzzle
        expect(v[0].constructor.name).to.be.equal('Cell');
        expect(v[0].value).to.be.equal(firstValue);
    })

    it('Check set cell', () =>{
        let newBoard = new Board();
        newBoard.populateBoard(defaultPuzzle);
        let first_empty = newBoard.getFirstEmpty();
        expect(first_empty.value).to.be.equal(emptyCellValue);

        let c = newBoard.setCell(inValidSolutionForCell, first_empty);
        expect(c.value).to.be.equal(inValidSolutionForCell);
    })

    it('Check valid cell', () => {
        let newBoard = new Board();
        newBoard.populateBoard(defaultPuzzle);
        let first_empty = newBoard.getFirstEmpty();
        expect(first_empty.value).to.be.equal(emptyCellValue);

        let c = newBoard.setCell(inValidSolutionForCell, first_empty);
        expect(c.value).to.be.equal(inValidSolutionForCell);

        expect(newBoard.checkValid(c,inValidSolutionForCell)).to.be.false;

        c = newBoard.setCell(validSolutionForCell, c);
        expect(c.value).to.be.equal(validSolutionForCell);

        expect(newBoard.checkValid(c,validSolutionForCell)).to.be.true;

    })


    it('Check if board.toString() and board.toJSON is valid JSON', function () {
        expect(board.toJSON).to.not.throw(Error);
    });

})