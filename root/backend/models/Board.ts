import { RecursiveBruteForceStrategy, AlternativeStrategy, Strategy } from "../services/services";
import { Cell,CellCoordinate } from "./Cell";
import {
    maxCellValue,
    maxRowValue,
    maxColumnValue,
    defaultStrategy,
    alternativeStrategy,
    emptyCellValue
} from "./constants"
import {checkIfDuplicateExists} from "../lib/util";

export type BoardStructure = Array<Cell>;

export class Board {
    
    strategy: Strategy;
    boardStructure: BoardStructure;
    isSolved: boolean;
    constructor(){
        // Set Default Strategy
        this.strategy = new RecursiveBruteForceStrategy();
        this.isSolved = false
         // Create empty board with default 9x9 grid
        this.boardStructure = [] as BoardStructure;
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
        ) as Cell;
    }

    public getRow(row:number): Array<Cell> {
        return this.boardStructure.filter(cell =>
            cell.position.row == row
        );
    }

    public getColumn(column:number): Array<Cell> {
        return this.boardStructure.filter(cell =>
            cell.position.column == column
        );
    }

    public getCellSubgrid(position: CellCoordinate): Array<Cell>{
        let cell = this.getCell(position.row, position.column)
        let sValues = cell.subgrid
        let rowsInSubgrid = this.boardStructure.filter(cell =>
            cell.position.row >= sValues.start_x_index &&
            cell.position.row < sValues.end_x_index
        );
        return rowsInSubgrid.filter(cell =>
            cell.position.column >= sValues.start_y_index &&
            cell.position.column < sValues.end_y_index
        );
    }

    public getAllEmpty(): BoardStructure {
        return this.boardStructure.filter(cell =>
            cell.isSolved() == false
        ) as BoardStructure;
    }

    public getFirstEmpty(): Cell {
        return this.boardStructure.filter(cell =>
            cell.isSolved() == false
        )[0];
    }

    public getValueOfCells(cells: Array<Cell>): Array<String> {
        return cells.map(cell => cell.value);
    }

    public checkValid(cell: Cell, value: string): boolean {
        this.setCell(value, cell);
        let valid = true;
        let rowCellValues = this.getValueOfCells(
            this.getRow(cell.position.row)
        )
        let columnCellValues = this.getValueOfCells(
            this.getColumn(cell.position.column)
        )
        let gridCellValues = this.getValueOfCells(this.getCellSubgrid(cell.position))

        let validityGroups = [
            rowCellValues,
            columnCellValues,
            gridCellValues
        ];


        //Check if the each group already contains possible value
        //if yes set to valid to false
        validityGroups.forEach(group => {
            if (group.filter(i => {return i==value}).length > 1) {
                valid = false;
                this.setCell(emptyCellValue, cell);
            }
        })
        return valid;
    }

    public setCell(value: string, cell: Cell): Cell {
        let board_cell = this.getCell(
            cell.position.row, cell.position.column);
        let cellIndex = this.boardStructure.indexOf(board_cell);
        //Check if the current cell in the board was found
        if(~cellIndex){
            board_cell.value = value;
            this.boardStructure[cellIndex] = board_cell;
        }
        return board_cell;

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
        //Split string into character arrays for each board value
        let value_list = board_string.split('');

        if(value_list.length != maxCellValue) {
            throw new Error("String length is larger than max cells in a sudoku board")
        }
        
        //Chunk Array to rows of nine
        let size = maxRowValue; 
        let arrayOfRows = [];
        for (let i=0; i<value_list.length; i+=size) {
            arrayOfRows.push(value_list.slice(i,i+size));
        }
        
        // Iterate the 2d structure with nested for loop and populate
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

    public solve(): any{
        return this.strategy.solve(this)
    }

    public validateAllCells(): boolean{
        function valid(cell, board){
            let valid = true;
            let rowCellValues = board.getValueOfCells(
                board.getRow(cell.position.row)
            )
            let columnCellValues = board.getValueOfCells(
                board.getColumn(cell.position.column)
            )
            let gridCellValues = board.getValueOfCells(board.getCellSubgrid(cell.position))

            let validityGroups = [
                rowCellValues,
                columnCellValues,
                gridCellValues
            ];
            validityGroups.forEach(group =>{
                let valueSet = new Set(group);
                if(valueSet.size!=group.length){
                    valid =false;
                }

            })
            return valid;
        }

        return this.boardStructure.every(cell => valid(cell,this))


    }

    public setSolved(): void{
        this.isSolved = true;
    }

    public toString = () : string => {

        let cell_string = '';
        this.boardStructure.forEach(
            function(item){
                cell_string += item.toString() + ",";
            }
        )
        // Remove ending separator for valid json string
        cell_string = cell_string.slice(0, -1)

        let string_board = `{"Cells": [${cell_string}]}`
            .replace(/(\r\n|\n|\r)/g, "");

        return string_board
    }

    public toJSON = () : string => {
        return JSON.parse(this.toString())
    }
}