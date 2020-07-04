import express from 'express';
import BackRouter from './backRouter';
import BackApiRouter from './backapiRouter';
import cookieSession from 'cookie-session'

const rootDir = __dirname + "/../"

export default class App {
    public app = express()
    private backRouter = new BackRouter()
    private backApiRouter = new BackApiRouter()

    constructor() {

        this.app.use(express.urlencoded({ extended: false }))

        // Session cookie
        this.app.use(cookieSession({
            name: 'session',
            keys: ["ImNotSureWhatAKeyIsAbout"],
        }));

        console.log(__filename)
        // EJS engine
        this.app.engine('html', require('ejs').renderFile);
        this.app.set('views', rootDir + "/views");
        this.app.set('view engine', 'html');

        this.app.use("/images", express.static(rootDir + "/images"))
        this.app.use("/styles", express.static(rootDir + "/styles"))
        this.app.use("/scripts", express.static(rootDir + "/build/scripts/"))

        this.backRouter.Route(this.app)
        this.backApiRouter.Route(this.app)
    }
}
