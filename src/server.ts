import * as express from 'express';
import * as morgan from 'morgan';

export default class App {
    private express: express.Application;

    constructor(port: number) {
        this.express = express();
        this.middleware();
        this.routes();

        // Start the server
        this.express.listen(port);
    }

    private middleware(): void {
        // Dev logger
        this.express.use(morgan('dev'));
    }

    private routes(): void {
        this.express.get('/', (req, res, next) => {
            res.json({
                message: 'Works'
            });
        });
    }

}
