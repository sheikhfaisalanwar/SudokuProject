import * as express from 'express'
import { Request, Response } from 'express'
import { ControllerBase } from './BaseController'
import { defaultPuzzle, defaultStrategy } from '../models/constants'
import { serializeBoard } from '../services/services'

class DefaultBoardController implements ControllerBase {
    public get = '/getDefaultBoard'
    public solve = '/solveDefaultBoard'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.get, this.getDefaultBoard);
        this.router.get(this.solve, this.solveDefaultBoard);
    }

    getDefaultBoard = (req: Request, res: Response) => {
        try{
            let base = new serializeBoard();
            res.json(base.setupBoard())
        } catch(e){
            throw Error(e)
        }
    }

    solveDefaultBoard = (req: Request, res: Response) => {
        try{
            let base = new serializeBoard();
            base.setupBoard();
            res.json(base.returnSolved());
        } catch(e){
            throw Error(e)
        }
    }
}

export default DefaultBoardController