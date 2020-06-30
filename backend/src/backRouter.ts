import express from 'express'
import * as utils from './utils/routeUtils'

export default class BackRouter {

    public Route(app: express.Application) {

        app.route("/").get(utils.defaultRender("index.ejs"))
    }
}
