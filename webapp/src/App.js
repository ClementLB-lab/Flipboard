import React from 'react';
import { ThemeProvider, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import theme from "./theme";
import Http from "./Http";
import Header from "./Header";
import ArticleList from "./ArticleList";
import Footer from "./Footer";
import Article from "./Article";

const http = new Http();

class App extends React.Component
{
    state = {
        articles: []
    };
    
    static getArticles = async (tag) =>
    {
        let data = await http.get(`/news?tag=${tag}`);

        if (data.value) {
            console.log(data.value);
            return (data.value);
        }
        return ([]);
    }
    setArticles = async (tag) =>
    {
        this.setState({
            articles: await App.getArticles(tag)
        });
    }
    render()
    {
        const styles = this.props.classes;
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <Header onSearch={this.setArticles.bind(this)} />
                </div>
                <div>
                    <div className={styles.brandBanner}>
                        <h1 className={styles.brandBannerHeader}>
                            <p>Soyez informé</p>
                            <p>Soyez inspiré</p>
                            <hr className={styles.brandBannerLine}/>
                        </h1>
                        <p>Des histoires sélectionnées pour vous</p>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <Button className={styles.button} variant="contained" color="secondary">Login</Button>
                        <Button className={styles.button} variant="contained" color="secondary">Register</Button>
                    </div>
                </div>
                <div>
                    <ArticleList articles={this.state.articles} />
                </div>
                <div>
                    <Footer />
                </div>
            </ThemeProvider>
        );
    }
}

const classes = (theme) => ({
    buttonsContainer: {
        display: "flex",
        justifyContent: "center"
    },
    button: {
        margin: theme.spacing(1)
    },
    brandBanner: {
        textAlign: 'center',
        padding: '0'
    },
    brandBannerHeader: {
        marginBottom: '15px',
        lineHeight: '40px',
        fontFamily: 'FaktCondensed,AvenirNextCondensed-Medium,Segoe UI',
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'var(--color--grey-scale--primary)',
        display: 'inline-block',
        fontSize: '45px'
    },
    brandBannerLine: {
        display: 'block',
        border: 'none',
        marginTop: '0.5em',
        marginBottom: '0.5em',
        margin: 'auto',
        borderStyle: 'inset',
        borderWidth: '1px',
        backgroundColor: 'red',
        width: '33vh',
        height: '3px'
    }
});

export default withStyles(classes, {withTheme: true})(App);