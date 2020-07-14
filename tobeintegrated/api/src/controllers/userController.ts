import { Request, Response } from 'express'
import UserService from '../services/userService';
import * as jwt from "../utils/jwt"

import util from 'util'

export default class UserController {

    private userService = new UserService()

    /**
     * GET
     *
     * query {
     *      token: authentification JWT
     * }
     *
     * return:
     * 200 - data : User
     */
    public async getByJWT(req: Request, res: Response) {
        const jwt = req.query.token as string

        const user = await this.userService.getByJWT(jwt)

        return res.status(200).json(user)
    }

    /**
     * GET
     *
     * query {
     *      id: User id
     *      token: authentification JWT
     * }
     *
     * return:
     * 200 -
     *  data :
     *      If retrieving information from another user, get public field:
     *          name, followers, magazines, id
     *      otherwise get all fields
     */
    public async getById(req: Request, res: Response) {
        const id = parseInt(req.query.id as string);
        const token = req.query.token as string;

        const currentUser = await this.userService.getByJWT(token)
        const user = await this.userService.getById(id)

        let result;
        if (user && (!currentUser || user.id != currentUser.id)) { // Only get public fields from other profiles
            result = {
                name: user.name,
                id: user.id,
                followers: user.followers,
                magazines: user.magazines,
                avatarUrl: user.avatarUrl,
                bio: user.bio,
            }
        } else
            result = user

        return res.status(200).json(result)
    }

    /**
     * POST
     *
     * Registers the new user
     *
     * body {
     *  name : The name
     *  email : The email
     *  password : The password
     * }
     *
     * 200 -
     *  data : {
     *      success: whether the user has been registered
     *      token: The generated JWT (in case of success)
     *      fieldsErrors {
     *          For each field containing error :
     *          [field name] : [error message (FR)]
     *      }
     * }
     */
    public async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const result = await this.userService.register(name, email, password)

        if (result.isSuccessful())
            return res.status(200).json({ success: true, token: result.getData() })
        else
            return res.status(200).json({ success: false, fieldsErrors: result.getError() })
    }

    /**
     * POST
     *
     * Login as the given user
     *
     * body {
     *  email : The email
     *  password : The password
     * }
     *
     * 200 -
     *  data : {
     *      success: whether the user has been registered
     *      token: The generated JWT (in case of success)
     *      fieldsErrors {
     *          For each field containing error :
     *          [field name] : [error message (FR)]
     *      }
     * }
     */
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const result = await this.userService.login(email, password)

        if (result.isSuccessful())
            return res.status(200).json({ success: true, token: result.getData() })
        else
            return res.status(200).json({ success: false, fieldsErrors: result.getError() })
    }

    /**
     * POST
     *
     * Send an email if user's email match
     *
     * body {
     *  email : The email
     * }
     *
     * 200 -
     *  data : {
     *      success: whether the user has been registered
     *      fieldsErrors {
     *          For each field containing error :
     *          [field name] : [error message (FR)]
     *      }
     * }
     */
    public async forgotpwd(req: Request, res: Response) {
        const { email } = req.body;

        const result = await this.userService.forgotpwd(email)

        if (result.isSuccessful())
            return res.status(200).json({ success: true })
        else
            return res.status(200).json({ success: false, fieldsErrors: result.getError() })
    }

    /**
     * POST
     *
     * Reset the password's user
     *
     * body {
     *  password : The password
     *  password2 : The password2
     * }
     *
     * 200 -
     *  data : {
     *      success: whether the user has been registered
     *      fieldsErrors {
     *          For each field containing error :
     *          [field name] : [error message (FR)]
     *      }
     * }
     */
    public async resetpwd(req: Request, res: Response) {
        const { password, password2, id, token } = req.body;

        const result = await this.userService.resetpwd(password, password2, id, token)

        if (result.isSuccessful())
            return res.status(200).json({ success: true })
        else
            return res.status(200).json({ success: false, fieldsErrors: result.getError() })
    }

    /**
     * POST
     *
     * Reset the current password's user
     *
     * body {
     *  token: The JWT auth token
     *  currentpassword : The current password
     *  password : The password
     *  password2 : The password2
     * }
     *
     * 200 -
     *  data : {
     *      success: whether the user has been registered
     *      fieldsErrors {
     *          For each field containing error :
     *          [field name] : [error message (FR)]
     *      }
     * }
     */
    public async resetCurrentPassword(req: Request, res: Response) {
        const { token, currentpassword, password, password2 } = req.body;

        const result = await this.userService.resetCurrentPassword(token, currentpassword, password, password2)

        if (result.isSuccessful())
            return res.status(200).json({ success: true })
        else
            return res.status(200).json({ success: false, fieldsErrors: result.getError() })
    }

    /**
     * POST
     *
     * Follow/Unfollow an user
     *
     * body {
     *  publisherId: id
     *  token: The JWT auth token
     * }
     *
     * Return :
     * 200 - data {
     *      success: whether the account has successfully be upgraded to host account
     *      err: Potential error message (FR)
     * }
     *
     */
    public async profileFollow(req: Request, res: Response) {
        const { token, profileId } = req.body;

        const result = await this.userService.profileFollow(token, profileId)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }

    /**
     * GET
     *
     * Get a Following
     *
     * query {
     *      token: authentification JWT
     *      id: User id
     * }
     *
     * return:
     * 200 - data : Follower
     */
    public async getFollowingById(req: Request, res: Response) {
        const id = parseInt(req.query.id as string);
        const token = req.query.token as string;

        const following = await this.userService.getFollowingById(token, id)

        let result = following

        return res.status(200).json(result)
    }

    /**
     * POST
     *
     * Edit user's profile
     *
     * body {
     *  name: name
     *  bio: bio
     *  token: The JWT auth token
     * }
     *
     * Return :
     * 200 - data {
     *      success: whether the account has successfully be upgraded to host account
     *      err: Potential error message (FR)
     * }
     *
     */
    public async editProfile(req: Request, res: Response) {
        const { name, email, bio, token } = req.body;

        const result = await this.userService.editProfile(name, email, bio, token)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }

    /**
     * POST
     *
     * Update user's avatar
     *
     * body {
     *  image: base64encoded
     *  token: The JWT auth token
     * }
     *
     * Return :
     * 200 - data {
     *      success: whether the account has successfully be upgraded to host account
     *      err: Potential error message (FR)
     * }
     *
     */
    public async uploadAvatar(req: Request, res: Response) {
        const { url, token } = req.body;

        const result = await this.userService.uploadAvatar(url, token)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }

    /**
     * GET
     *
     * query {
     *      id: User id
     * }
     *
     * return:
     * 200 -
     *  data :
     *      If retrieving information from another user, get public field:
     *          name, followers, magazines, id
     *      otherwise get all fields
     */
    public async getFollowers(req: Request, res: Response) {
        const id = parseInt(req.query.id as string);

        const follower = await this.userService.getFollowers(id)


        if (!follower || follower.length == 0)
            return res.status(200).json({ })
        let result;
        if (follower) {
            const user = await this.userService.getById(follower[0].followerId)
            if (user) {
                result = {
                    followerId: follower[0].followerId,
                    followerName: user.name,
                    avatarUrl: user.avatarUrl
                }
            }
        }
        return res.status(200).json(result)
    }



    /**
     * POST
     *
     * Create new magazine
     *
     * body {
     *  name: string
     *  description: string
     *  token: The JWT auth token
     * }
     *
     * Return :
     * 200 - data {
     *      success: whether the account has successfully be upgraded to host account
     *      err: Potential error message (FR)
     * }
     *
     */
    public async createMagazine(req: Request, res: Response) {
        const { name, description, token } = req.body;

        const result = await this.userService.createMagazine(name, description, token)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }

    /**
     * POST
     *
     * deletes the account of the logged-in user
     *
     * body {
     *      token: The JWT auth token
     * }
     *
     * Return :
     * 200 - data {
     *      success: whether the account has successfully be deleted
     *      err: Potential error message (FR)
     * }
     *
     */
    public async deleteAccount(req: Request, res: Response) {
        const { token } = req.body;

        const result = await this.userService.deleteAccount(token)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }
}
