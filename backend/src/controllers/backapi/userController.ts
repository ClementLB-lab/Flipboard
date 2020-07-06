import express from 'express'
import * as jwtUtils from '../../utils/jwtUtils';
import * as api from '../../utils/apiUtils';

/**
 * UserController for BackApi
 */
export default class UserController {

    /**
     * GET
     * see API's doc
     */
    public async getById(req: express.Request, res: express.Response) {
        const result = await api.get("/user/getById", req.query)

        return res.status(200).json(result)
    }

    /**
     * POST
     * see API's doc
     */
    public async register(req: express.Request, res: express.Response) {
        const { name, email, password } = req.body;

        const result = await api.post("/user/register", { name, email, password })

        // Automatic log-in
        if (result.success)
            jwtUtils.setAuthToken(req, result.token)

        return res.status(200).json(result)
    }

    /**
     * POST
     * see API's doc
     */
    public async login(req: express.Request, res: express.Response) {
        const { email, password } = req.body;

        const result = await api.post("/user/login", { email, password })

        if (result.success)
            jwtUtils.setAuthToken(req, result.token)

        return res.status(200).json(result)
    }

    /**
     * POST
     * see API's doc
     */
    public async forgotpwd(req: express.Request, res: express.Response) {
        const { email } = req.body;

        const result = await api.post("/user/forgotpwd", { email })

        return res.status(200).json(result)
    }

    /**
     * POST
     * see API's doc
     */
    public async resetpwd(req: express.Request, res: express.Response) {
        const { password, password2, id, token } = req.body;

        const result = await api.post("/user/resetpwd", { password, password2, id, token })

        return res.status(200).json(result)
    }

    /**
     * POST
     * see API's doc
     */
    public async resetCurrentPassword(req: express.Request, res: express.Response) {
        const { currentpassword, password, password2 } = req.body;
        const token = jwtUtils.getAuthToken(req)

        const result = await api.post("/user/resetcurrentpwd", { token, currentpassword, password, password2 })

        return res.status(200).json(result)
    }

    /**
     * POST
     *
     * Deletes the authentification token from session
     */
    public logout(req: express.Request, res: express.Response) {
        jwtUtils.setAuthToken(req, null)

        return res.status(200).send()
    }

    /**
     * GET
     *
     * Get the current logged-in user
     */
    public async me(req: express.Request, res: express.Response) {
        const user = await api.get("/user/getByJWT", { token: jwtUtils.getAuthToken(req) }).catch(() => { return null })
        var result = null

        if (user)
            result = {
                name: user.name,
                id: user.id,
                email: user.email
            }

        return res.status(200).json(result)
    }

    /**
     * POST
     * see API's doc
     */
    public async profileFollow(req: express.Request, res: express.Response) {
        const { profileId } = req.body;
        const token = jwtUtils.getAuthToken(req)

        const result = await api.post("/user/profilefollow", { profileId, token })

        return res.status(200).json(result)
    }


    /**
     * POST
     * see API's doc
     */
    public async editProfile(req: express.Request, res: express.Response) {
        const { name, bio } = req.body;
        const token = jwtUtils.getAuthToken(req)

        const result = await api.post("/user/editprofile", { name, bio, token })

        return res.status(200).json(result)
    }

    /**
     * POST
     * see API's doc
     */
    public async uploadAvatar(req: express.Request, res: express.Response) {
        const { url } = req.body;
        const token = jwtUtils.getAuthToken(req)

        const result = await api.post("/user/upload/avatar", { url, token })

        return res.status(200).json(result)
    }
    
    /**
     * POST
     * see API's doc
     */
    public async createMagazine(req: express.Request, res: express.Response) {
        const { name, description } = req.body;
        const token = jwtUtils.getAuthToken(req)

        const result = await api.post("/user/createmagazine", { name, description, token })

        return res.status(200).json(result)
    }
}
