import React from 'react';
import { Route, Switch } from "react-router-dom";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import theme from "./theme";
import Http from "./Http";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Publishers from "./Publishers";
import About from "./About";
import Register from "./Register";
import Wallpaper from "./images/wallpaper.jpg";

const http = new Http();

export default function App()
{
    const styles = useStyles();
    const [articles, setArticles] = React.useState([]);
    
    const getArticles = async (tag) =>
    {
        let data;
        
        if (!tag || tag.length < 2)
            return;
        data = await http.get(`/news?tag=${tag}`);
        if (!data.value)
            return;
        setArticles(data.value);
    }
    return (
            <ThemeProvider theme={theme}>
                <Header onSearch={getArticles} />
                <div className={styles.container}>
                    <div className={styles.filter}>
                        <Switch>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/publishers">
                                <Publishers />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                             <Route path="/">
                                <Home articles={articles} />
                            </Route>
                        </Switch>
                    </div>
                </div>
                <Footer />
            </ThemeProvider>
     );
}

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: `url(${Wallpaper})`,
        backgroundSize: "cover",
        minHeight: 800
    },
    filter: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: 800
    }
}));