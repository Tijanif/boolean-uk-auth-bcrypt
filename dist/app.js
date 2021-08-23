"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./resources/users/router"));
const router_2 = __importDefault(require("./auth/router"));
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// App initialisation
const app = express_1.default();
// App MiddleWare
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(cookieParser());
// Routes
// login
app.use(router_2.default);
app.use('/users', router_1.default);
app.all('*', (req, res) => {
    res.json({ msg: 'I am up and runnig!' });
});
module.exports = app;
//# sourceMappingURL=app.js.map