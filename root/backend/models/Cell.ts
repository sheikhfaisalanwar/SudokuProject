import{possibleSudokuValues, emptyCellValue} from "../models/constants"
import{computeSubgrid} from "../lib/util"                                                           

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

export class Cell {
    
    constructor(
        public position:CellCoordinate, 
        public value: string = emptyCellValue
        )  {}
    
    get subgrid(): SubGrid {
        return computeSubgrid(this.position)
    }    
    
    public isSolved(): boolean {
        return this.value != emptyCellValue;
    }

    public toString = () : string => {
        return `{
            "position" : "${this.position.row},${this.position.column}",
            "value" :  "${this.value}"  
        }`.replace(/(\r\n|\n|\r)/g, "");
    }

    public toJSON = () : string => {
        return JSON.parse(this.toString())
    }
}