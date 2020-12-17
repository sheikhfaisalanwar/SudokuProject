import { Func } from "mocha"
import { CellCoordinate, SubGrid } from "../models/Cell"

const fs = require('fs')

export function computeSubgrid(position:CellCoordinate) : SubGrid{

    let subgrid = <SubGrid>{ 
        start_x_index:Math.floor(position.row/3) * 3,
        start_y_index:Math.floor(position.column/3) * 3,
        end_x_index:(Math.floor(position.row/3) *3) + 3,
        end_y_index:(Math.floor(position.column/3) * 3) + 3
    }
    return subgrid

}

export function readJson() {
    fs.readFile("..")
}
