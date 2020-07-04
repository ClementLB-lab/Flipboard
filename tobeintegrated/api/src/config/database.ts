import { Sequelize } from 'sequelize-typescript';

export default new Sequelize({
    host: process.env.DB_URL,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: "postgres",
    storage: ":memory:",
    models: [__dirname + '/../models'],
    logging: false
});
