import { RecursiveBruteForceStrategy, AlternativeStrategy, Strategy } from "../services/services";
import { Cell,CellCoordinate } from "./Cell";
import { maxCellValue, maxRowValue, maxColumnValue, defaultStrategy, alternativeStrategy} from "./constants"

export type BoardStructure = Array<Cell>

export class Board {
    
    strategy: Strategy
    boardStructure: BoardStructure
    constructor(){
        // Set Default Strategy
        this.strategy = new RecursiveBruteForceStrategy()

         // Create empty board with default 9x9 grid
        this.boardStructure = [] as BoardStructure
        for(let i=0;i<maxRowValue;i++) {
            for(let j=0;j<maxColumnValue;j++){
                let position: CellCoordinate = {row: i, column: j};
                let cell = new Cell(position);
                this.boardStructure.push(cell);
            }     
        }
    }
    public setBoardStructure(boardStructure: BoardStructure): void {
        this.boardStructure.length = 0;
        this.boardStructure = boardStructure;
    }

    public getCell(row:number, column:number): Cell {
        return this.boardStructure.find(cell =>
            cell.position.row === row &&
            cell.position.column === column
        ) as Cell
    }

    public setStrategy(strategy: string) {
        if(strategy === defaultStrategy){
            this.strategy = new RecursiveBruteForceStrategy();
        }
        else if(strategy === alternativeStrategy){
            this.strategy = new AlternativeStrategy();
        }
    }

    public populateBoard(board_string: string): any{

        let newBoardStructure = [] as BoardStructure;
        let value_list = board_string.split('');

        if(value_list.length != maxCellValue) {
            throw new Error("String length is larger than max cells in a sudoku board")
        }
        

        let size = maxRowValue; 
        let arrayOfRows = [];
        for (let i=0; i<value_list.length; i+=size) {
            arrayOfRows.push(value_list.slice(i,i+size));
        }
        
        
        arrayOfRows.forEach((rowArray, rowNumber) => {
            rowArray.forEach((columnValue: string, columnNumber: number) => {
                let cell = this.getCell(rowNumber,columnNumber);
                cell.value = columnValue;
                newBoardStructure.push(
                    cell
                )
            });
        });

        this.setBoardStructure(newBoardStructure);
        return this.boardStructure;
    }

    public solve(): Board {
        return this.strategy.solve(this)
    }

    public toString = () : string => {

        let cell_string = '';
        this.boardStructure.forEach(
            function(item){
                cell_string += item.toString() + ",";
            }
        )
        // Remove ending seperator for valid json string
        cell_string = cell_string.slice(0, -1)

        let string_board = `{"Cells": [${cell_string}]}`
            .replace(/(\r\n|\n|\r)/g, "");

        return string_board
    }

    public toJSON = () : string => {
        return JSON.parse(this.toString())
    }
}