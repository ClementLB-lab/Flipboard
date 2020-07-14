import { Request, Response } from 'express'
import ArticleService from '../services/articleService';

import util from 'util'

export default class ArticleController {

    private articleService = new ArticleService()


    /**
     * POST
     *
     * Adds a new article
     *
     * body {
     *  articleId : The id generated by WebContextApi
     *  magazineId : The id in which the article is located.
     * }
     *
     * 200 -
     *  data : {
     *      success: whether the article has been registered
     *      err: Potential error message (FR)
     * }
     */
    public async addArticle(req: Request, res: Response) {
        const { articleId, magazineId } = req.body;

        const result = await this.articleService.addArticle(articleId, magazineId)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }

    

    /**
     * GET
     *
     * Retrieves articles from a magazine
     * 
     * query {
     *      magazineId: magazine id
     * }
     *
     * return:
     * 200 -
     *  data :
     *      Returns the identifiers of all the articles contained in the magazine.
     */
    public async getArticlesByMagazineId(req: Request, res: Response) {
        const { magazineId } = req.body;

        const articles = await this.articleService.getArticlesByMagazineId(magazineId)

        let result = [];
        if (articles) {
            for (let i = 0; i != articles.length; i++) {
                result.push(articles[i].articleId)
            }
        }
        return res.status(200).json(result)
    }



    /**
     * POST
     *
     * Deletes an article from a magazine
     *
     * body {
     *  articleId : The identifier of the article
     *  magazineId : The id in which the article is located.
     * }
     *
     * 200 -
     *  data : {
     *      success: whether the article has been deleted
     *      err: Potential error message (FR)
     * }
     */
    public async deleteArticle(req: Request, res: Response) {
        const { articleId, magazineId } = req.body;

        const result = await this.articleService.deleteArticle(articleId, magazineId)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }



    /**
     * POST
     *
     * Adds a new article to his favorites
     *
     * body {
     *      userId : The user ID
     *      magazineId : The id in which the article is located
     *      articleId : The id generated by WebContextApi
     * }
     *
     * 200 -
     *  data : {
     *      success: whether the article has been added to favorites
     *      err: Potential error message (FR)
     * }
     */
    public async addFavoriteArticle(req: Request, res: Response) {
        const { userId, magazineId, articleId } = req.body;

        const result = await this.articleService.addFavoriteArticle(userId, magazineId, articleId)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }

    

    /**
     * GET
     *
     * It returns user's favorite articles
     * 
     * query {
     *      userId: The user ID
     * }
     *
     * return:
     * 200 -
     *  data :
     *      Returns the identifiers of all the articles added to his favorites.
     */
    public async getFavoritesArticlesByUserId(req: Request, res: Response) {
        const { userId } = req.body;

        const articles = await this.articleService.getFavoritesArticlesByUserId(userId)

        let result = [];
        if (articles) {
            for (let i = 0; i != articles.length; i++) {
                result.push(articles[i].articleId)
            }
        }
        return res.status(200).json(result)
    }



    /**
     * POST
     *
     * Removes an article from the favorites
     *
     * body {
     *      userId: The user ID
     *      magazineId : The id in which the article is located
     *      articleId : The identifier of the article
     * }
     *
     * 200 -
     *  data : {
     *      success: whether the article has been deleted from favorites
     *      err: Potential error message (FR)
     * }
     */
    public async deleteFavoriteArticle(req: Request, res: Response) {
        const { userId, magazineId, articleId } = req.body;

        const result = await this.articleService.deleteFavoriteArticle(userId, magazineId, articleId)

        if (result.isSuccessful())
            return res.status(200).json({ success: true });
        else
            return res.status(200).json({ success: false, err: result.getError() })
    }
}
