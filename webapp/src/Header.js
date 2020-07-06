import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";
import { useHistory } from 'react-router-dom';
import logo from './images/flipboard.png';
import userIcon from './images/user_icon.png'

export default function Header({onSearch})
{
    const styles = useStyles();
    const history = useHistory();
    const goHome = () => history.push("/");

    return (
        <AppBar position="static">
            <Toolbar>
                    <Typography className={styles.title} variant="h6" noWrap>
                        <span>
                            <img className={styles.logo} src={logo} alt="Flipboard Icon" />
                            <button className={styles.button} onClick={goHome}>Flipboard</button>
                        </span>
                    </Typography>
                <Search onSearch={onSearch}/>

                <div className={styles.registration}>
                <img className={styles.logo} src={userIcon} alt="User Icon" />
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
        marginLeft: theme.spacing(5)
    },

    logo: {
        height: '5vh',
        marginTop: '5px',
    },

    button: {
        backgroundColor: '#212121',
        color: 'white',
        fontSize: '20px',
        border: 'none',
    },

    registration: {
        marginLeft: theme.spacing(95),
        alignItems: 'flex-end',
        textAlign: 'left',
        alignSelf: 'stretch'
    }
}));