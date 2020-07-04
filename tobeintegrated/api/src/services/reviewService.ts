import Result from '../utils/result'
import UserService from './userService'
import ReviewManager from '../manager/reviewManager'
import Review from '../models/Review'

export default class ReviewService {
    private userService = new UserService()
    private reviewManager = new ReviewManager()

    /**
     * @brief Adds a review
     *
     * @param revieweeId Id of the user writting the review
     * @param reviewerId If of the user being reviewed
     * @param review     The review content
     *
     * @returns Result
     */
    public async add(content: string, reviewer_id: number, reviewee_id: number) {
        if (reviewee_id == reviewer_id)
            return Result.error("Vous ne pouvez pas laisser d'avis sur votre profil")

        await this.reviewManager.create(content, reviewer_id, reviewee_id)

        return Result.success()
    }

    /**
     * @brief Gets all the reviewf of a specific user
     *
     * @param userId Id of the user we want to get the reviews
     *
     * @return Array of {
     *      content: (string)
     *      reviewer: (User)
     * }
     */
    public async getByRevieweeId(userId: number) {
        let result = []

        const reviews = await this.reviewManager.getByReviweeId(userId)
        for (let r of reviews) {
            const user = await this.userService.getById(r.reviewerId)

            result.push({
                content: r.content,
                reviewer: user
            })
        }

        return result
    }
}
