import React from 'react';
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Http from "./Http";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Publishers from "./Publishers";
import About from "./About";

const http = new Http();

export default function App()
{
    const [articles, setArticles] = React.useState([]);
    
    const getArticles = async (tag) =>
    {
        let data = await http.get(`/news?tag=${tag}`);

        if (!data.value) {
            return;
        }
        setArticles(data.value);
    }
    return (
            <ThemeProvider theme={theme}>
                <Header onSearch={getArticles} />
                <Switch>
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
                <Footer />
            </ThemeProvider>
     );
}