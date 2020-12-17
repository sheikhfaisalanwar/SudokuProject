import { Cell, CellCoordinate, SubGrid } from "../../models/Cell"
import {emptyCellValue} from "../../models/constants"
import { expect } from 'chai';


describe('Cell tests', () => {

    let position: CellCoordinate = {row: 2, column: 2};
    //Expected subgrid values from the 2,2 arbitraty position we specified
    let expected_start_x_index: number = 0;
    let expected_start_y_index: number = 0;
    let expected_end_x_index: number = 3;
    let expected_end_y_index: number = 3
    let cell = new Cell(position);

    it('Check default Cell value', () => {
        expect(cell.value).to.equal(emptyCellValue)
    })

    it('Check subgrid calculated property', () => {
        
        let subgrid: SubGrid = cell.subgrid
        expect(subgrid.start_x_index).to.equal(expected_start_x_index)
        expect(subgrid.start_y_index).to.equal(expected_start_y_index)
        expect(subgrid.end_x_index).to.equal(expected_end_x_index)
        expect(subgrid.end_y_index).to.equal(expected_end_y_index)
    })

    it('Check if cell is solved property', () => {
        expect(cell.isSolved()).to.be.false
        cell.value = '2'
        expect(cell.isSolved()).to.be.true
    })

    it('Check if cell.toString() and cell.toJSON is valid JSON', function () {
        expect(cell.toJSON).to.not.throw(Error)
    });
})