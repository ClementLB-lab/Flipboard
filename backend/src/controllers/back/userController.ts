import express from 'express'
import * as utils from '../../utils/routeUtils'
import * as api from '../../utils/apiUtils'
import * as jwtUtils from '../../utils/jwtUtils'

export default class UserController {
    public login = utils.defaultRender("login.ejs")
    public register = utils.defaultRender("register.ejs")
    public forgotpwd = utils.defaultRender("forgotpwd.ejs")
    public activateHost = utils.defaultRender("activate_host_account.ejs")
    public resetCurrentPassword = utils.defaultRender("resetcurrentpwd.ejs")

    /**
     * GET
     *
     * query {
     *      id: Id of the desired user
     * }
     */
    public async profile(req: express.Request, res: express.Response) {
        const id = req.query.id
        const token = jwtUtils.getAuthToken(req)

        let self = await api.get("/user/getByJWT", { token })

        let profile = await api.get("/user/getById", { id, token })

        let followState = "Suivre"

        if (id != null && self.id != id) {
            let subscription = await api.get("/user/getFollowingById", { token, id })
            if (subscription)
                followState = "Se désabonner"
        }
        
        const args = {
            loggedin: self != null,
            isHostProfile: profile.host || false,
            isOwnProfile: self && (self.id == id),
            profile,
            followState: followState
        }

        return res.render("profile.ejs", args)
    }

    /**
     * GET
     *
     * query {
     *      id: id of the desired user
     *      token: token of the desired user
     * }
     */
    public async resetpwd(req: express.Request, res: express.Response) {
        const { userId, token } = req.params;

        const args = {
            id: userId,
            token: token
        }

        return res.render("resetpwd.ejs", args)
    }
}
