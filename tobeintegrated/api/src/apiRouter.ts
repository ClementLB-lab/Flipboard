import express from 'express';
import * as routerUtil from './utils/routerUtil'

import UserController from './controllers/userController'
import MagazineController from './controllers/magazineController'

export default class Route {
    private userController = new UserController()
    private magazineController = new MagazineController()

    public Route(app: express.Application) {

        // User's routes

        app.route("/user/getByJWT").get(async (req, res, next) => await this.userController.getByJWT(req, res).catch(next))
        app.route("/user/getById").get(async (req, res, next) => await this.userController.getById(req, res).catch(next))
        app.route("/user/register").post(async (req, res, next) => await this.userController.register(req, res).catch(next))
        app.route("/user/login").post(async (req, res, next) => await this.userController.login(req, res).catch(next))
        app.route("/user/forgotpwd").post(async (req, res, next) => await this.userController.forgotpwd(req, res).catch(next))
        app.route("/user/resetpwd").post(async (req, res, next) => await this.userController.resetpwd(req, res).catch(next))
        app.route("/user/resetcurrentpwd").post(async (req, res, next) => await this.userController.resetCurrentPassword(req, res).catch(next))
        app.route("/user/profilefollow").post(async (req, res, next) => await this.userController.profileFollow(req, res).catch(next))
        app.route("/user/getFollowingById").get(async (req, res, next) => await this.userController.getFollowingById(req, res).catch(next))
        app.route("/user/editprofile").post(async (req, res, next) => await this.userController.editProfile(req, res).catch(next))
        app.route("/user/upload/avatar").post(async (req, res, next) => await this.userController.uploadAvatar(req, res).catch(next))
        app.route("/user/createmagazine").post(async (req, res, next) => await this.userController.createMagazine(req, res).catch(next))
        app.route("/user/getFollowers").get(async (req, res, next) => await this.userController.getFollowers(req, res).catch(next))

        // Magazine's routes
        app.route("/magazine/getMagazinesByOwnerId").get(async (req, res, next) => await this.magazineController.getMagazinesByOwnerId(req, res).catch(next))
    }
}