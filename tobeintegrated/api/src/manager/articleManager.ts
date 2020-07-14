import Article from "../models/Article";
import Favorite from "../models/Favorite";

export default class ArticleManager {

    public async getArticlesByMagazineId(magazineId: number): Promise<Article[]> {
        return Article.findAll({ where: { magazineId: magazineId } })
    }

    public async getFavoritesArticlesByUserId(userId: number): Promise<Favorite[]> {
        return Favorite.findAll({ where: { userId: userId } })
    }

    public async addArticle(articleId: number, magazineId: number): Promise<Article> {
        return Article.create({ articleId, magazineId })
    }

    public async addFavoriteArticle(userId: number, magazineId: number, articleId: number): Promise<Favorite> {
        return Favorite.create({ userId, magazineId, articleId })
    }

    public async deleteArticle(articleId: number, magazineId: number): Promise<void> {
        await Article.destroy({ where: { articleId: articleId, magazineId: magazineId } })
    }

    public async deleteFavoriteArticle(userId: number, magazineId: number, articleId: number): Promise<void> {
        await Favorite.destroy({ where: { userId: userId, magazineId: magazineId, articleId: articleId } })
    }

    public async getArticleByIds(articleId: number, magazineId: number): Promise<Article> {
        return Article.findOne({ where: { articleId: articleId, magazineId: magazineId } })
    }

    public async getFavoriteArticleByIds(userId: number, magazineId: number, articleId: number): Promise<Favorite> {
        return Favorite.findOne({ where: { userId: userId, magazineId: magazineId, articleId: articleId } })
    }
}