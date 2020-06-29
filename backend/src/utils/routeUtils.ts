import express from 'express'

export function defaultRender(page: string) {
    return function (_req: express.Request, _res: express.Response) {
        return _res.render(page);
    }
}
