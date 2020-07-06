import express from 'express'
import * as jwtUtils from '../../utils/jwtUtils';
import * as api from '../../utils/apiUtils';

/**
 * MagazineController for BackApi
 */
export default class MagazineController {

    /**
     * GET
     * see API's doc
     */
    public async getMagazinesByOwnerId(req: express.Request, res: express.Response) {
        const { id } = req.body;

        const result = await api.get("/magazine/getMagazinesByOwnerId", { id })

        return res.status(200).json(result)
    }
}
