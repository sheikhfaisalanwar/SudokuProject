
import * as express from 'express'
import { Request, Response } from 'express'
import { ControllerBase } from './BaseController'
import { defaultPuzzle, defaultStrategy } from '../models/constants'
import { serializeDefaultBoard } from '../services/services'


class HomeController implements ControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.index)
    }

    index = (req: Request, res: Response) => {
        res.json({"test": "test"})
    }
}

export default HomeController


