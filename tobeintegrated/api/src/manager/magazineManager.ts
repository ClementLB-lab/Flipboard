import Magazine from "../models/Magazine";
import Review from "../models/Review";

export default class MagazineManager {

    public async getMagazineById(magazineId: number): Promise<Magazine> {
        return Magazine.findOne({ where: { id: magazineId } })
    }

    public async getMagazinesByOwnerId(ownerId: number): Promise<Magazine[]> {
        return Magazine.findAll({ where: { ownerId: ownerId } })
    }

    public async addReview(userId: number, magazineId: number, review: string): Promise<Review> {
        return Review.create({ userId: userId, magazineId: magazineId, review: review } )
    }

    public async getReviewsByMagazineId(magazineId: number): Promise<Review[]> {
        return Review.findAll({ where: { magazineId: magazineId } })
    }

    public async deleteReview(userId: number, magazineId: number): Promise<void> {
        await Review.destroy({ where: { userId: userId, magazineId: magazineId } })
    }
}