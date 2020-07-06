import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Http from "./Http";
import Header from "./Header";
import Footer from "./Footer";
import Article from "./Article";

const http = new Http();

var brandBanner = {
    textAlign: 'center',
    padding: '0'
}

var brandBannerHeader = {
    marginBottom: '15px',
    lineHeight: '40px',
    fontFamily: 'FaktCondensed,AvenirNextCondensed-Medium,Segoe UI,sans-serif',
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'var(--color--grey-scale--primary)',
    display: 'inline-block',
    fontSize: '45px'
}

var brandBannerLine = {
    display: 'block',
    border: 'none',
    marginTop: '0.5em',
    marginBottom: '0.5em',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderStyle: 'inset',
    borderWidth: '1px',
    backgroundColor: 'red',
    width: '33vh',
    height: '3px'
}

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
                </div>
                <div>
                    <div>
                        <header style={brandBanner}>
                            <h1 style={brandBannerHeader}>
                                <p>Soyez informé</p>
                                <p>Soyez inspiré</p>
                                <hr style={brandBannerLine}/>
                            </h1>
                            <p>Des histoires sélectionnées pour vous</p>
                        </header>
                    </div>
                </div>
                {this.generateArticles()}
                <div>
                    <Footer />
                </div>
            </ThemeProvider>
        );
    }
}
export default App;
