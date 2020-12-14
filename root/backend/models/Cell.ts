import{SolutionService} from "../services/services"
import{possibleSudokuValues} from "../models/constants"                                                           

export type SubGrid = {
    start_x_index: number
    start_y_index: number
    end_x_index: number
    end_y_index: number

}

export type CellCoordinate = {
    row: number
    column: number
}

export class Cell implements SolutionService{
    
    constructor(
        public position:CellCoordinate, 
        public value: string
        )  {}
    
    get subgrid(): SubGrid {
        let subgrid = <SubGrid>{ 
            start_x_index:Math.floor(this.position.row/3) * 3,
            start_y_index:Math.floor(this.position.column/3) * 3,
            end_x_index:(Math.floor(this.position.row/3) *3) + 3,
            end_y_index:(Math.floor(this.position.column/3) * 3) + 3
        }
        return subgrid
    }    
    
    isSolved(): boolean {
        throw new Error("Method not implemented.");
    }

    solve(): boolean {
        throw new Error("Method not implemented.");
    }

    
}