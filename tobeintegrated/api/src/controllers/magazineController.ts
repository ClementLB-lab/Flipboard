import { Request, Response } from 'express'
import MagazineService from '../services/magazineService';
import * as jwt from "../utils/jwt"

import util from 'util'

export default class MagazineController {

    private magazineService = new MagazineService()

    /**
     * GET
     * 
     * Returns all magazines published by a user
     *
     * body {
     *      id: the user id
     * }
     *
     * return:
     * 200 - data : Magazine
     */
    public async getMagazinesByOwnerId(req: Request, res: Response) {
        const { id } = req.body;

        const magazines = await this.magazineService.getMagazinesByOwnerId(id)

        let result = []
        for (let i = 0; i != magazines.length; i++) {
            result.push(magazines[i].name)
        }
        return res.status(200).json(result)
    }
}
