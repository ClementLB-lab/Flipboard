import * as S from "sequelize-typescript"

/**
 * All path
 */
@S.Table
export default class Article extends S.Model<Article> {
    
    @S.PrimaryKey
    @S.AutoIncrement
    @S.Column(S.DataType.INTEGER)
    id: number

    @S.Comment("ID de l'article généré par webcontext API")
    @S.Column(S.DataType.INTEGER)
    articleId: number

    @S.Comment("ID du magazine dans lequel se trouve l'article")
    @S.Column(S.DataType.INTEGER)
    magazineId: number
}