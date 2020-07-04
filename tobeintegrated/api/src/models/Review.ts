import * as S from "sequelize-typescript"
import User from "./User"


/**
 * A comment that a user left to describe his experience with another user
 */
@S.Table
export default class Review extends S.Model<Review> {

    // @S.PrimaryKey
    // @S.Column(S.DataType.INTEGER)
    // id: number

    @S.Column(S.DataType.TEXT)
    content: string

    @S.Comment("User who wrote the review")
    @S.ForeignKey(() => User)
    @S.Column(S.DataType.INTEGER)
    reviewerId: number

    @S.Comment("User the review was targetted to")
    @S.ForeignKey(() => User)
    @S.Column(S.DataType.INTEGER)
    revieweeId: number
}
