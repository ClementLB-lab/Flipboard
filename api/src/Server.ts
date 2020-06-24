import express from "express";
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
		this.app.get("/headlines", async (req, res) => {
			let output = await this.newsApi.getHeadlines("fr");

			return (res.status(200).json(output));
		});
	}
}