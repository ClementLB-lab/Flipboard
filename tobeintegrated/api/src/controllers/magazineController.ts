import { Request, Response } from 'express'
import MagazineService from '../services/magazineService';
import UserService from '../services/userService';
import * as jwt from "../utils/jwt"

import util from 'util'

export default class MagazineController {

    private magazineService = new MagazineService()
    private userService = new UserService()

    /**
     * GET
     * 
     * Retrieve a magazine using its ID
     *
     * body {
     *      magazineId: the magazine ID
     * }
     *
     * return:
     * 200 - data : Magazine
     */
    public async getMagazineById(req: Request, res: Response) {
        const magazineId = parseInt(req.query.id as string);

        const magazine = await this.magazineService.getMagazineById(magazineId)

        return res.status(200).json(magazine)
    }


    /**
     * GET
     * 
     * Returns all magazines published by a user
     *
     * body {
     *      userId: the user ID
     * }
     *
     * return:
     * 200 - data : Magazine[]
     */
    public async getMagazinesByOwnerId(req: Request, res: Response) {
        const { userId } = req.body;

        const magazines = await this.magazineService.getMagazinesByOwnerId(userId)

        let result = []
        for (let i = 0; i != magazines.length; i++) {
            result.push(magazines[i].name)
        }
        return res.status(200).json(result)
    }


    /**
     * POST
     * 
     * Adds a new review
     *
     * body {
     *      magazineId: the magazine ID
     *      review: the review
     *      token: the token generated by JWT
     * }
     *
     * 200 - data {
     *      success: whether the review has successfully be added
     *      err: Potential error message (FR)
     */
    public async addReview(req: Request, res: Response) {
        const { magazineId, review, token } = req.body;

        const result = await this.magazineService.addReview(magazineId, review, token)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }


    /**
     * GET
     * 
     * Returns all review of a magazine
     *
     * body {
     *      magazineId: the magazine ID
     * }
     *
     * return:
     * 200 - data : Review[]
     */
    public async getReviewsByMagazineId(req: Request, res: Response) {
        const { magazineId } = req.body;

        const reviews = await this.magazineService.getReviewsByMagazineId(magazineId)

        if (!reviews || reviews.length == 0)
            return res.status(200).json({ })

        let tabIds = []
        let tabNames = []
        let tabReviews = []
        for (let i = 0; i != reviews.length; i++) {
            let user = await this.userService.getById(reviews[i].userId)
            if (user) {
                tabIds.push(user.id)
                tabNames.push(user.name)
                tabReviews.push(reviews[i].review)
            }
        }
        let result = {
            userId: tabIds,
            name: tabNames,
            review: tabReviews
        }
        return res.status(200).json(result)
    }


    /**
     * POST
     * 
     * Deletes the review of the logged-in user
     *
     * body {
     *      magazineId: the magazine ID
     *      token: the token generated by JWT
     * }
     *
     * Return :
     * 200 - data {
     *      success: whether the review has successfully be deleted
     *      err: Potential error message (FR)
     */
    public async deleteReview(req: Request, res: Response) {
        const { magazineId, token } = req.body;

        const result = await this.magazineService.deleteReview(magazineId, token)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }
}
