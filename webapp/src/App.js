import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Http from "./Http";
import Header from "./Header";
import Article from "./Article";

const http = new Http();

class App extends React.Component
{
    state = {
        articles: []
    };

    static getArticles = async () =>
    {
        let data = await http.get('/news?tag=Microsoft');

        if (data.value) {
            console.log(data.value);
            return (data.value);
        }
        return ([]);
    }
    generateArticles = () =>
    {
        return (
            this.state.articles.map((article) => {
                return (
                    <div key={article.id}>
                        <Article
                            title={article.title}
                            description={article.description}
                            body={article.body}
                            date={article.datePublished}
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
            <ThemeProvider theme={theme}>
                <div>
                    <Header />
                    {this.generateArticles()}
                </div>
            </ThemeProvider>
        );
    }
}
export default App;
