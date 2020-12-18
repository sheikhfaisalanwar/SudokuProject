"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server/server");
require('dotenv').config({ path: '../../.env' });
var bodyParser = require("body-parser");
var base_1 = require("./middleware/base");
var HomeController_1 = require("./controllers/HomeController");
var DefaultBoardController_1 = require("./controllers/DefaultBoardController");
var CustomBoardController_1 = require("./controllers/CustomBoardController");
var app = new server_1.default({
    port: Number(process.env.SERVER_PORT),
    controllers: [
        new HomeController_1.default(),
        new DefaultBoardController_1.default(),
        new CustomBoardController_1.default()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        base_1.default
    ]
});
app.listen();
//# sourceMappingURL=app.js.map