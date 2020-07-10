import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";
import logo from './images/flipboard.png';

export default function Header({onSearch})
{
    const styles = useStyles();
    const history = useHistory();
    const goHome = () => 
    {
        history.push("/");
    };
    const onLogin = () => {
        history.push("/login");
    }
    const onRegister = () => {
        history.push("/register");
    }

    return (
        <AppBar position="static">
            <Toolbar className={styles.toolbar}>
                <div className={styles.leftPart}>
                    <div onClick={goHome} className={styles.titleContainer}>
                        <img className={styles.logo} src={logo} alt="logo" />
                        <Typography className={styles.title} variant="h6" noWrap>
                            Flipboard
                        </Typography>
                    </div>
                    <Search onSearch={onSearch}/>
                </div>
                <div className={styles.registration}>
                    <Button variant="contained" onClick={onLogin}>Login</Button>
                    <Button variant="contained" onClick={onRegister}>Register</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme) => ({
    title: {
        marginRight: theme.spacing(2)
    },
    titleContainer: {
        display: "flex",
        alignItems: "center"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    logo: {
        padding: theme.spacing(1),
        height: '5vh'
    },
    button: {
        backgroundColor: '#212121',
        color: 'white',
        fontSize: '20px',
        border: 'none',
    },
    leftPart: {
        display: "flex",
        alignItems: "center"
    },
    registration: {
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(1)
    }
}));