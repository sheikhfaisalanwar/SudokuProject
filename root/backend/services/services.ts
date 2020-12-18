import { Board, BoardStructure } from "../models/Board";
import {defaultPuzzle, emptyCellValue, possibleSudokuValues} from "../models/constants";

export interface Strategy {
 solve(data: Board): any;
 validateSolved(data: Board): boolean;
}

export class RecursiveBruteForceStrategy implements Strategy{
     public solve(board: Board) : any{
         let emptyCell = board.getFirstEmpty()
         if(emptyCell == null){
            board.setSolved();
            return true;
         }
         for(let i=1;i<=9;i++){
             if(board.checkValid(emptyCell, String(i))){
                 let cell = board.setCell(String(i), emptyCell)
                 if(this.solve(board)) {
                     return true
                 }
                 board.setCell(emptyCellValue, cell);
             }
         }
         return false
     }

     public validateSolved(board: Board): boolean {
         return board.validateAllCells();
     }

}

export class AlternativeStrategy implements Strategy{
    public solve(board: Board) : [Board, boolean]{
        return [board, false];
    }
    public validateSolved(board: Board): boolean {
        return board.validateAllCells();
    }
}



export class serializeBoard {
    newBoard: Board;
    constructor(public board_rep: string = defaultPuzzle){
        this.newBoard = new Board();
    }

    public setupBoard(): string{
        this.newBoard.populateBoard(this.board_rep)
        return this.newBoard.toJSON()
    }
    public returnSolved(): string{
        let solved = this.newBoard.solve();
        if(this.newBoard.solve()){
            return this.newBoard.toJSON();
    }


    }
}

