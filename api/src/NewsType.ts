interface Article
{
	id:string;
	title:string;
	url:string;
	description:string;
	body:string;
	keywords:string;
	language:string;
	datePublished:string;
	provider: { name:string };
	image: {url:string, width:number, height:number }
}

export interface NewsType
{
	relatedSearch:string[];
	value:Array<Article>;
}

export interface SearchType
{
	tag:string;
	from?:string;
	to?:string;
}