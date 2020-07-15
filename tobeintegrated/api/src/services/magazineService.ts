import MagazineManager from '../manager/magazineManager';
import Magazine from '../models/Magazine';
import validator from 'validator';
import Result from '../utils/result';

export default class MagazineService {

    private magazineManager = new MagazineManager()


    /**
     * Gets magazines by owner ID
     * 
     * @param id The user ID
     * 
     * @return the magazines or null if no match ownerID
     */
    public async getMagazinesByOwnerId(id: number): Promise<Magazine[]> {
        if (!id)
            return null

        const magazines = await this.magazineManager.getMagazinesByOwnerId(id);
        return magazines
    }
}