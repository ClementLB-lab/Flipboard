import url from "url";
import express from "express";
import cors from "cors";
import { NewsApi } from "./NewsApi";

export class Server
{
	private app = express();
	private newsApi = new NewsApi();
	
	constructor(private readonly PORT:number)
	{
		this.app.listen(this.PORT, (err:string) => {
			if (err) {
				console.error(err);
				return;
			}
			this.init();
			console.log(`Server is listening on port ${PORT}`);
		});
	}

	private init()
	{
<<<<<<< HEAD
		this.app.get("/news", async (req, res) => {
			const query = <any>url.parse(req.url, true).query;
=======
		this.app.use(cors());
		this.app.get("/headlines", async (req, res) => {
			const query = url.parse(req.url, true).query;
>>>>>>> webapp
			const output = await this.newsApi.getHeadlines(query);

			return (res.status(200).json(output));
		});
		this.app.get("/everything", async (req, res) => {
			const query = url.parse(req.url, true).query;
			const output = await this.newsApi.getEverything(query);

			return (res.status(200).json(output));
		});
	}
}