import express from 'express'
import * as utils from './utils/routeUtils'

import UserController from './controllers/back/userController'

export default class BackRouter {
    userController = new UserController()

    public Route(app: express.Application) {

        app.route("/").get(utils.defaultRender("index.ejs"))

        // Users
        app.route("/login").get(this.userController.login)
        app.route("/register").get(this.userController.register)
        app.route("/forgotpwd").get(this.userController.forgotpwd)
        app.route("/resetpwd/:userId/:token").get(this.userController.resetpwd)
        app.route("/resetcurrentpwd").get(this.userController.resetCurrentPassword)
        app.route("/profile").get(this.userController.profile)
        app.route("/activate_host_account").get(this.userController.activateHost)
    }
}
