import { Request, Response } from 'express'
import UserService from '../services/userService'
import ReviewService from '../services/reviewService'
import Result from '../utils/result'

export default class ReviewController {
    private userService = new UserService()
    private reviewService = new ReviewService()

    /**
     * POST
     *
     * Adds a review to the given user
     *
     * body {
     *  revieweeId: The reviewee id
     *  review: The review content
     *  token: The authentification JWT
     * }
     *
     * Return :
     * 200 - {
     *      success: whether the review has successfully been added
     *      err: Potential error message (FR)
     * }
     *
     */
    public async add(req: Request, res: Response) {
        const { revieweeId, review, token } = req.body

        const reviewer = await this.userService.getByJWT(token)

        let result : Result

        if (!reviewer)
            result = Result.error("Vous devez être connecté")
        else
            result = await this.reviewService.add(review, reviewer.id, revieweeId)

        return res.status(200).json({ success: result.isSuccessful(), err: result.getError() })
    }

    /**
     * GET
     *
     * query {
     *      id: Reviewee id
     * }
     *
     */
    public async get(req: Request, res: Response) {
        const id = +(req.query.id as string)

        const reviews = await this.reviewService.getByRevieweeId(id)

        return res.status(200).json(reviews)
    }
}