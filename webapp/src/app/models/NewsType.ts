import { Article } from "./Article";

export interface NewsType
{
	status:string;
	totalResults:number;
	articles:Array<Article>;
}