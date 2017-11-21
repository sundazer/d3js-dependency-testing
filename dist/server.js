"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const winston = require("winston");
class App {
    constructor(port) {
        this.express = express();
        this.middleware();
        this.routes();
        winston.info(`Listening on port ${port}`);
        this.server = this.express.listen(port);
    }
    middleware() {
        this.express.use(morgan('dev'));
        this.express.set('views', './views');
        this.express.set('view engine', 'pug');
        this.express.use(express.static(path.join(__dirname, 'views')));
    }
    routes() {
        this.express.get('/', (req, res) => {
            res.render('index', { title: 'D3js dependendy testing' });
        });
    }
}
exports.App = App;
