import { Func } from "mocha"
import { CellCoordinate, SubGrid } from "../models/Cell"

const fs = require('fs')

export function computeSubgrid(position:CellCoordinate) : SubGrid{

    return <SubGrid>{
        start_x_index:Math.floor(position.row/3) * 3,
        start_y_index:Math.floor(position.column/3) * 3,
        end_x_index:(Math.floor(position.row/3) *3) + 3,
        end_y_index:(Math.floor(position.column/3) * 3) + 3
    }


}

export function checkIfDuplicateExists(w){
    return new Set(w).size !== w.length
}