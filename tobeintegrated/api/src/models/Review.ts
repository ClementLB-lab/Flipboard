import * as S from "sequelize-typescript"

/**
 * All path
 */
@S.Table
export default class Review extends S.Model<Review> {
    
    @S.PrimaryKey
    @S.AutoIncrement
    @S.Column(S.DataType.INTEGER)
    id: number

    @S.Comment("User ID de l'auteur de la review")
    @S.Column(S.DataType.INTEGER)
    userId: number

    @S.Comment("ID du magazine concerné par la review")
    @S.Column(S.DataType.INTEGER)
    magazineId: number

    @S.Comment("Review")
    @S.Column(S.DataType.TEXT)
    review: string
}