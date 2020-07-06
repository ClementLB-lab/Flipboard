import { Request, Response } from 'express'
import MagazineService from '../services/magazineService';
import * as jwt from "../utils/jwt"

import util from 'util'

export default class MagazineController {

    private magazineService = new MagazineService()

    /**
     * GET
     *
     * query {
     *      id: the user id
     * }
     *
     * return:
     * 200 - data : Magazine
     */
    public async getMagazinesByOwnerId(req: Request, res: Response) {
        const { id } = req.body;

        const magazine = await this.magazineService.getMagazinesByOwnerId(id)

        return res.status(200).json(magazine)
    }
}
