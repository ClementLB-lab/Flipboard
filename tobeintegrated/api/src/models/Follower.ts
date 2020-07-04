import * as S from "sequelize-typescript"

/**
 * Liste des personnes qui suivent l'activité d'un compte.
 */
@S.Table
export default class Follower extends S.Model<Follower> {

    @S.PrimaryKey
    @S.AutoIncrement
    @S.Column(S.DataType.INTEGER)
    id: number

    @S.Column(S.DataType.INTEGER)
    publisherId: number

    @S.Column(S.DataType.INTEGER)
    followerId: number
}
