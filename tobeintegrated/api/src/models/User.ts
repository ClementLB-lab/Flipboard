import * as S from "sequelize-typescript"

/**
 * A registered Yeat user
 */
@S.Table
export default class User extends S.Model<User> {

    @S.PrimaryKey
    @S.AutoIncrement
    @S.Column(S.DataType.INTEGER)
    id: number

    @S.Column(S.DataType.TEXT)
    name: string

    @S.Column(S.DataType.TEXT)
    email: string

    @S.Comment("hashed and salted")
    @S.Column(S.DataType.TEXT)
    passwordHash: string

    @S.Default(0)
    @S.Comment("Amount of person who follow the user")
    @S.Column(S.DataType.INTEGER)
    followers: number

    @S.Default(0)
    @S.Comment("Amount of magazines writed by the user")
    @S.Column(S.DataType.INTEGER)
    magazines: number

    @S.Default("https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg")
    @S.Comment("Avatar url")
    @S.Column(S.DataType.TEXT)
    avatarUrl: string

    @S.Comment("Biography")
    @S.Column(S.DataType.TEXT)
    bio: string

    @S.Default(false)
    @S.Comment("Private account ?")
    @S.Column(S.DataType.BOOLEAN)
    private: boolean
}
