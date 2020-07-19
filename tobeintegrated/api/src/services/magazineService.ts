import MagazineManager from '../manager/magazineManager';
import Magazine from '../models/Magazine';
import Review from '../models/Review';
import * as jwt from '../utils/jwt';
import Result from '../utils/result';
import UserService from './userService';

export default class MagazineService {

    private magazineManager = new MagazineManager()
    private userService = new UserService();

    /**
     * Gets magazine by its ID
     * 
     * @param magazineId The magazine ID
     * 
     * @return the magazine or null if no match magazineID
     */
    public async getMagazineById(magazineId: number): Promise<Magazine> {
        if (!magazineId)
            return null

        const magazine = await this.magazineManager.getMagazineById(magazineId);
        return magazine;
    }


    /**
     * Gets magazines by owner ID
     * 
     * @param userId The user ID
     * 
     * @return the magazines or null if no match ownerID
     */
    public async getMagazinesByOwnerId(userId: number): Promise<Magazine[]> {
        if (!userId)
            return null

        const magazines = await this.magazineManager.getMagazinesByOwnerId(userId);
        return magazines
    }


    /**
     * Adds a new review
     * 
     * @param magazineId The magazine ID
     * @param review The review
     * @param token The token generated by JWT
     * 
     * @return the magazines or null if no match ownerID
     */
    public async addReview(magazineId: number, review: string, token: jwt.Token): Promise<Result> {
        const user = await this.userService.getByJWT(token)

        if (!user)
            return Result.error("Impossible de récupérer votre profil à partir de votre token de connexion.")
        if (review == undefined)
            return Result.error("Impossible de créer une review sans review ;)")
        if (!magazineId)
            return Result.error("N'auriez vous pas oublier l'identifiant du magazine ?")

        const Review = await this.magazineManager.addReview(user.id, magazineId, review)
        if (!Review)
            return Result.error("Le magazine n'a pas pu être créer.")

        return Result.success()
    }


    /**
     * Gets review by magazine ID
     * 
     * @param magazineId The magazine ID
     * 
     * @return the magazines or null if no match ownerID
     */
    public async getReviewsByMagazineId(magazineId: number): Promise<Review[]> {
        if (!magazineId)
            return null

        const magazines = await this.magazineManager.getReviewsByMagazineId(magazineId);
        return magazines
    }


    /**
     * Deletes the review of the logged-in user
     * 
     * @param magazineId The magazine ID
     * @param token The token generated by JWT
     * 
     * @return the magazines or null if no match ownerID
     */
    public async deleteReview(magazineId: number, token: jwt.Token): Promise<Result> {
        if (!magazineId)
            return Result.error("Votre magazineId est invalide.")
        
        const user = await this.userService.getByJWT(token)

        if (!user)
            return Result.error("Impossible de récupérer votre profil à partir de votre token de connexion.")
        
        await this.magazineManager.deleteReview(user.id, magazineId);
        return Result.success()
    }
}