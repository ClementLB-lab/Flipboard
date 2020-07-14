import * as S from "sequelize-typescript"

/**
 * All path
 */
@S.Table
export default class Favorite extends S.Model<Favorite> {
    
    @S.PrimaryKey
    @S.AutoIncrement
    @S.Column(S.DataType.INTEGER)
    id: number

    @S.Comment("ID de l'utilisateur")
    @S.Column(S.DataType.INTEGER)
    userId: number

    @S.Comment("ID du magazine")
    @S.Column(S.DataType.INTEGER)
    magazineId: number

    @S.Comment("ID de l'article aimé par un visiteur")
    @S.Column(S.DataType.INTEGER)
    articleId: number
}