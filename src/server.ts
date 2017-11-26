import * as express from 'express';
import * as fs from 'fs';
import { Server } from 'http';
import * as morgan from 'morgan';
import * as path from 'path';
import * as winston from 'winston';

export class App {
    public server: Server;
    private express: express.Application;

    constructor(port: number) {
        this.express = express();
        this.middleware();
        this.routes();

        // Start the server
        winston.info(`Listening on port ${port}`);
        this.server = this.express.listen(port);
    }

    private middleware(): void {
        // Dev logger
        this.express.use(morgan('dev'));
        // Pug templating
        this.express.set('views', './views');
        this.express.set('view engine', 'pug');
        this.express.use(express.static(path.join('dist', 'views')));
    }

    private routes(): void {
        this.express.get('/', (req, res) => {
            res.render('index', { title: 'D3js dependency testing' });
        });

        this.express.get('/data', (req, res) => {
            fs.readFile(path.join('data', 'data.json'), 'utf-8', (err, data) => {
                if (err) {
                    winston.error(`Error reading file: ${err}`);
                    return res.status(500).json('{}');
                }
                res.json(JSON.parse(data));
            });
        });
    }

}
