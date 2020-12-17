import { Board } from "../../models/Board"
import {defaultStrategy, alternativeStrategy, maxCellValue, defaultPuzzle} from "../../models/constants"
import { expect } from 'chai';


describe('Board tests', () => {
    let board = new Board()
    let row = 2
    let column = 2

    it('Check default constructor values', () => {
        //Check if Array
        expect(board.boardStructure).to.be.instanceOf(Array)
        //Check max length is of specified value
        expect(board.boardStructure).to.have.lengthOf(maxCellValue)
        //Check default strategy class instance
        expect(board.strategy.constructor.name).to.be.equal(defaultStrategy)
        //Check if array consists of cell object
        expect(board.boardStructure[0].constructor.name).to.be.equal('Cell')
    })

    it('Check Cell Object retrieval', () =>  {
        let cell = board.getCell(row,column)
        expect(cell.constructor.name).to.be.equal('Cell')
        expect(cell.position.row).to.be.equal(row)
        expect(cell.position.column).to.be.equal(column)
    })

    it('Check set strategy', () =>  {
        board.setStrategy(alternativeStrategy)
        expect(board.strategy.constructor.name).to.be.equal(alternativeStrategy)
    })

    it('Check set populate board', () =>{
        let v = board.populateBoard(defaultPuzzle)
        let firstValue = defaultPuzzle.split('')[0]
        expect(v).to.be.instanceOf(Array)
        // Max length should be less than 81
        expect(v.length).to.be.equal(maxCellValue)
        // First value of default puzzle
        expect(firstValue).to.be.equal('8')
        //Check if the value of the first cell is equal to first value in default puzzle
        expect(v[0].constructor.name).to.be.equal('Cell')
        expect(v[0].value).to.be.equal(firstValue)
    })

    it('Check if board.toString() and board.toJSON is valid JSON', function () {

        expect(board.toJSON).to.not.throw(Error)
    });

})