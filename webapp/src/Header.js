import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";

export default function Header()
{
    const styles = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={styles.title} variant="h6" noWrap>
                    Flipboard
                </Typography>
                <Search />

                <div className={styles.registration}>
                    <div class="btn-link-login">
                        <img src="/images/user_icon.png" class="nav_icon" />
                        <p class="nav_text animation">Connexion / Inscription</p>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2)
    },

    registration: {
        alignItems: 'flex-end',
        textAlign: 'left',
        alignSelf: 'stretch'
    }
}));