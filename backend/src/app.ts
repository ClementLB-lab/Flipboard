import express from 'express';
import BackRouter from './backRouter';

const rootDir = __dirname + "/../"

export default class App {
    public app = express()
    private backRouter = new BackRouter()

    constructor() {

        this.app.use(express.urlencoded({ extended: true }))

        // EJS engine
        this.app.engine('html', require('ejs').renderFile);
        this.app.set('view engine', 'html');

        // Path
        this.app.use("/styles", express.static(rootDir + "/styles"))


        this.backRouter.Route(this.app)
    }
}
