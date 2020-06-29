import App from './app'

const PORT = process.env.PORT || 8080

new App().app.listen(PORT, function () {
    console.log("Server started, listening on port " + PORT + "...")
})