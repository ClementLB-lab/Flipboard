import express from 'express'
import UserController from './controllers/backapi/userController'
import MagazineController from './controllers/backapi/magazineController'

export default class BackRouter {
    userController = new UserController()
    magazineController = new MagazineController()


    public Route(app: express.Application) {

        // User
        app.route("/backapi/user/getById").get(this.userController.getById);
        app.route("/backapi/user/register").post(this.userController.register);
        app.route("/backapi/user/login").post(this.userController.login);
        app.route("/backapi/user/forgotpwd").post(this.userController.forgotpwd);
        app.route("/backapi/user/resetpwd").post(this.userController.resetpwd);
        app.route("/backapi/user/resetcurrentpwd").post(this.userController.resetCurrentPassword);
        app.route("/backapi/user/logout").post(this.userController.logout);
        app.route("/backapi/user/me").get(this.userController.me);
        app.route("/backapi/user/profilefollow").post(this.userController.profileFollow);
        app.route("/backapi/user/editprofile").post(this.userController.editProfile);
        app.route("/backapi/user/upload/avatar").post(this.userController.uploadAvatar);

        app.route("/backapi/user/createmagazine").post(this.userController.createMagazine);
        app.route("/backapi/user/getFollowers").get(this.userController.getFollowers);


        // Magazine
        app.route("/backapi/magazine/getMagazinesByOwnerId").get(this.magazineController.getMagazinesByOwnerId);
    }
}
