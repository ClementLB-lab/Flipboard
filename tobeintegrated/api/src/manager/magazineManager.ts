import Magazine from "../models/Magazine";

export default class MagazineManager {

    public async getMagazinesByOwnerId(ownerId: number): Promise<Magazine> {    
        /*
        /*      /!\ - il y a un problème à la compilation avec .findAll()
        /*      ci-dessous : une solution temporaire de secours
        */
        return Magazine.findOne({ where: { ownerId: ownerId } })
    }
}