import fetch from "node-fetch";
import { NewsType, SearchType } from "./NewsType";

export class NewsApi
{
	private static readonly BASE_URL = "http://newsapi.org/v2/"
	private readonly KEY:string;

	constructor()
	{
		this.KEY = process.env.NEWS_API_KEY!;
	}
	
	private static createUrl(data:SearchType, type:string, key:string):string
	{
		let url = `${NewsApi.BASE_URL}${type}?apiKey=${key}`;

		url += data.country ? `&country=${data.country}` : "";
		url += data.category ? `&category=${data.category}` : "";
		url += data.tag ? `&q=${data.tag}` : "";
		url += data.sources ? `&sources=${data.sources}` : "";
		url += data.from ? `&from=${data.from}` : "";
		url += data.to ? `&to=${data.to}` : "";
		return (url);
	}

	public async getHeadlines(data:SearchType):Promise<NewsType>
	{
		const URL = NewsApi.createUrl(data, "top-headlines", this.KEY);

		return (await fetch(URL).then((res) => res.json()));
	}

	public async getEverything(data:SearchType):Promise<NewsType>
	{
		const URL = NewsApi.createUrl(data, "everything", this.KEY);

		return (await fetch(URL).then((res) => res.json()));
	}
}