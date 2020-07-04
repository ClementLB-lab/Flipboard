import App from "./app"
import db from "./config/database"

db
    .authenticate()
    .then(() => {
        console.log('Connection to database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


async function start() {
//    await db.sync({force: true}) // - If you need to apply non-retrocompatible changes (will clear the db)
    await db.sync({alter: true})

    let servApp = new App()

    servApp.app.listen(3001, function () {
        console.log("API started, listening on port 3001...")
    });
}

start();
