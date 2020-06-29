import url from "url";
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
		this.app.get("/news", async (_req, _res) => {
			const query = <any>url.parse(_req.url, true).query;
			const output = await this.newsApi.getHeadlines(query);

			return (_res.status(200).json(output));
		});
	}
}