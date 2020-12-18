import * as express from 'express'
import { Request, Response } from 'express'
import { ControllerBase } from './BaseController'
import { serializeBoard } from '../services/services'

class CustomBoardController implements ControllerBase {
    public get = '/getCustomBoard/:puzzle'
    public solve = '/solveCustomBoard/:puzzle'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post(this.get, this.getCustomBoard);
        this.router.post(this.solve, this.solveCustomBoard);
    }

    getCustomBoard = (req: Request, res: Response) => {
        try{
            let base = new serializeBoard(req.params['puzzle'] as string);
            res.json(base.setupBoard())
        } catch(e){
            throw Error(e)
        }
    }

    solveCustomBoard = (req: Request, res: Response) => {
        try{
            let base = new serializeBoard(req.params['puzzle'] as string);
            base.setupBoard();
            res.json(base.returnSolved());
        } catch(e){
            throw Error(e)
        }
    }
}

export default CustomBoardController