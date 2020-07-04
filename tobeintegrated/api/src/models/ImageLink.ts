import * as S from "sequelize-typescript"
import User from "./User"

/**
 * All path
 */
@S.Table
export default class ImageLink extends S.Model<ImageLink> {

    @S.PrimaryKey
    @S.AutoIncrement
    @S.Column(S.DataType.INTEGER)
    id: number

    @S.ForeignKey(() => User)   
    @S.Column(S.DataType.INTEGER)
    ownerId: number

    @S.Column(S.DataType.TEXT)
    path: string
}
