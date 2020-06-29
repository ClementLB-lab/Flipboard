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
<<<<<<< HEAD
	relatedSearch:string[];
	value:Array<Article>;
=======
	status:string;
	totalResults:number;
	articles:Array<Article>;
>>>>>>> webapp
}

export interface SearchType
{
<<<<<<< HEAD
	tag:string;
	from?:string;
	to?:string;
}
=======
	tag?:string;
	country?:string;
	sources?:string;
	category?:string;
	from?:string;
	to?:string;
}
>>>>>>> webapp
