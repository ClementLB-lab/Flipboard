import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { NewsType } from "./models/NewsType";

@Injectable({
  providedIn: 'root'
})

export class ArticleService
{
  private readonly CORS = "https://cors-anywhere.herokuapp.com/";
  private readonly URL = "http://localhost:8080/headlines?country=fr";
  
  constructor(
    private http:HttpClient
  ) { }

  getNews():Observable<NewsType>
  {
    return (this.http.get<NewsType>(this.URL));
  }
}
