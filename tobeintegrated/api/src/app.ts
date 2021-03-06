import express from 'express';
import * as bodyParser from 'body-parser';
import Route from './apiRouter';
import cors from 'cors';

export default class App {
    public app = express()
    private route = new Route()

    constructor () {
        this.app.use(cors())
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.route.Route(this.app)
    }
}