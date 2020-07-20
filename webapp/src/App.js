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
import User from "./User";
import Settings from "./Settings";
import Magazine from "./Magazine";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Profile from "./Profile";

const http = new Http("http://localhost:3001");

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
                <Header onSearch={getArticles} http={http} />
                <div className={styles.container}>
                    <div className={styles.filter}>
                        <Switch>
                            <Route path="/register">
                                <Register http={http} />
                            </Route>
                            <Route path="/login">
                                <Login http={http} />
                            </Route>
                            <Route path="/forgotPassword">
                                <ForgotPassword http={http} />
                            </Route>
                            <Route path="/resetPassword">
                                <ResetPassword http={http} />
                            </Route>
                            <Route path="/publishers">
                                <Publishers />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/user">
                                <User http={http} />
                            </Route>
                            <Route path="/profile">
                                <Profile http={http} />
                            </Route>
                            <Route path="/settings">
                                <Settings http={http} />
                            </Route>
                            <Route path="/magazine">
                                <Magazine http={http} />
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
    filter: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        minHeight: 800
    }
}));