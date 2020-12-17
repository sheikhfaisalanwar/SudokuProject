import * as express from 'express'
import { Request, Response } from 'express'
import { ControllerBase } from './BaseController'
import { defaultPuzzle, defaultStrategy } from '../models/constants'
import { serializeDefaultBoard } from '../services/services'

class DefaultBoardController implements ControllerBase {
    public get = '/getDefaultBoard'
    public solve = '/solveDefaultBoard'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.get, this.getDefaultBoard)
        this.router.post(this.solve, this.solveDeFaultBoard)
    }

    getDefaultBoard = (req: Request, res: Response) => {
        try{
            let base = new serializeDefaultBoard(defaultPuzzle);
            res.json(base.setupBoard())
        } catch(e){
            throw Error(e)
        }
    }

    solveDeFaultBoard = (req: Request, res: Response) => {
        try{
            let base = new serializeDefaultBoard(defaultPuzzle);
            res.json(base.setupBoard())
        } catch(e){
            throw Error(e)
        }
    }
}

export default DefaultBoardController