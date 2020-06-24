import fetch from "node-fetch";

export class NewsApi
{
	private static readonly BASE_URL = "http://newsapi.org/v2/"
	private readonly KEY:string;

	constructor()
	{
		this.KEY = process.env.NEWS_API_KEY!;
	}
	
	public async getHeadlines(country:string)
	{
		const URL = `${NewsApi.BASE_URL}top-headlines?country=${country}&apiKey=${this.KEY}`;

		return (await fetch(URL).then((res => res.json())));
	}
}