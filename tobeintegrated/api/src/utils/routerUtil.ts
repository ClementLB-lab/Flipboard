import express from 'express';

// TODO: Check usefulness
export function wrapper(func: (req: express.Request, res: express.Response, next?: express.NextFunction) => Promise<void>) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return await func(req, res, next).catch(next)
    };
}

/**
 * @brief Maps routes to exception-safe wrapper
 *
 * @param routes (array) of the form [
 *      ["/route/adress", "get", handler],
 *      ["/route/adress", "post", anotherHandler],
 *      ...
 * ]
 */
export function createRouter(routes: Array<Array<any>>) {
    var router = express.Router()

    for (let r of routes)
        router.route(r[0])[r[1]](wrapper(r[2]))

    return router
}
