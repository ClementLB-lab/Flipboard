import * as S from "sequelize-typescript"
import User from "./User"

/**
 * All path
 */
@S.Table
export default class Magazine extends S.Model<Magazine> {
    
    // @S.PrimaryKey
    // @S.AutoIncrement
    // @S.Column(S.DataType.INTEGER)
    // id: number

    @S.ForeignKey(() => User)   
    @S.Column(S.DataType.INTEGER)
    ownerId: number

    @S.Column(S.DataType.TEXT)
    name: string

    @S.Column(S.DataType.TEXT)
    description: string
}