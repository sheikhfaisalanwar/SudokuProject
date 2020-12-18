
import * as express from 'express'
import { Request, Response } from 'express'
import { ControllerBase } from './BaseController'


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


