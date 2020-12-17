import { Board, BoardStructure } from "../models/Board";
import { defaultPuzzle } from "../models/constants";

export interface SolutionService{
    isSolved(): boolean
    solve(): boolean
}

export interface Strategy {
 solve(data: Board): Board;
}

export class RecursiveBruteForceStrategy implements Strategy{
 public solve(board: Board) : Board{
     return board
 }
}

export class AlternativeStrategy implements Strategy{
    public solve(board: Board) : Board{
        return board
    }
}

export class serializeDefaultBoard {
    
    constructor(public board: string){
        
    }

    public setupBoard(): string{
        let newBoard = new Board()
        newBoard.populateBoard(this.board)
        return newBoard.toJSON()
    }

}

