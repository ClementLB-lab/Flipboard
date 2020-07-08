import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";
import { useHistory } from 'react-router-dom';
import logo from './images/flipboard.png';
import PersonIcon from "@material-ui/icons/Person";

export default function Header({onSearch})
{
    const styles = useStyles();
    const history = useHistory();
    const goHome = () => 
    {
        history.push("/");
    };

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
                    <PersonIcon />
                    <div>
                        <p>Connexion / Inscription</p>
                    </div>
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