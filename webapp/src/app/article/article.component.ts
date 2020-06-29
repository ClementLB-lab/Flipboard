import { Component, OnInit, NgModule } from '@angular/core';
import { ArticleService } from "../article.service";
import { Article } from "../models/article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

  article:Article;
  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles():void {
    this.articleService.getNews()
    .subscribe(news => this.article = news.articles[0]);
  }
}
