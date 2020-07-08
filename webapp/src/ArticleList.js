import React from "react";
import Article from "./Article";

export default class ArticleList extends React.Component
{
    generateArticles = () =>
    {
        return (
            this.props.articles.map((article) => {
                return (
                    <div key={article.id}>
                        <Article
                            title={article.title}
                            description={article.description}
                            body={article.body}
                            date={article.datePublished}
                            author={article.provider.name}
                            image={{
                                url: article.image.url,
                                height: article.image.height
                            }}
                        />
                    </div>
                )
            })
        );
    }
    render()
    {
        return (
            <div>
                {this.generateArticles()}
            </div>
        );
    }
}