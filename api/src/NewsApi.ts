import fetch from "node-fetch";
import { NewsType, SearchType } from "./NewsType";

export class NewsApi
{
	private static readonly BASE_URL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI";
	
	private static createUrl(data:SearchType):string
	{
		let url = `${NewsApi.BASE_URL}?autoCorrect=false&pageNumber=1&pageSize=10&safeSearch=false`;

		url += data.tag ? `&q=${data.tag}` : "";
		url += data.from ? `&fromPublishedDate=${data.from}` : "";
		url += data.to ? `&toPublishedDate=${data.to}` : "";
		return (url);
	}

	public async getHeadlines(data:SearchType):Promise<NewsType>
	{
		const URL = NewsApi.createUrl(data);
		const req = {
			method: "GET",
			headers: {
				"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
				"x-rapidapi-key": process.env.NEWS_API_KEY!
			}
		};

		return (await fetch(URL, req).then((res) => res.json()));
	}
}