import express from 'express';
import * as bodyParser from 'body-parser';
import Route from './apiRouter';

export default class App {
    public app = express()
    private route = new Route()

    constructor () {
        this.app.use(bodyParser.json()); // to support JSON-encoded bodies
        this.route.Route(this.app)
    }
}