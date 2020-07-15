import Magazine from "../models/Magazine";

export default class MagazineManager {

    public async getMagazinesByOwnerId(ownerId: number): Promise<Magazine[]> {
        return Magazine.findAll({ where: { ownerId: ownerId } })
    }
}