import Review from "../models/Review";

export default class ReviewManager {

    public async getByReviweeId(id: number): Promise<[Review]> {
        return Review.findAll({ where: { revieweeId: id } })
    }

    public async create(content: string, reviewerId: number, revieweeId: number): Promise<Review> {
        return Review.create({ content, reviewerId,revieweeId })
    }

}
