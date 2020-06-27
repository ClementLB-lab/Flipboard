interface Article
{
	source:{id:string, name:string};
	author:string;
	title:string;
	description:string;
	url:string;
	urlToImage:string;
	publishedAt:string;
	content:string;
}

export interface NewsType
{
	status:string;
	totalResults:number;
	articles:Array<Article>;
}

export interface SearchType
{
	tag?:string;
	country?:string;
	sources?:string;
	category?:string;
	from?:string;
	to?:string;
}
