import Server from './server/server'
require('dotenv').config({path: '../../.env'})
import * as bodyParser from 'body-parser'
import baseMiddleware from './middleware/base'


import HomeController from './controllers/HomeController'
import DefaultBoardController from './controllers/DefaultBoardController'
import CustomBoardController from "./controllers/CustomBoardController";

const app = new Server({
    port: Number(process.env.SERVER_PORT),
    controllers: [
        new HomeController(),
        new DefaultBoardController(),
        new CustomBoardController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        baseMiddleware
    ]
})

app.listen()