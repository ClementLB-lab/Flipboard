import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";
import { useHistory } from 'react-router-dom';

export default function Header()
{
    const styles = useStyles();
    const history = useHistory();
    const goHome = () => history.push("/");

    return (
        <AppBar position="static">
            <Toolbar>
                    <Typography className={styles.title} variant="h6" noWrap>
                            <span className="input-group-btn">
                                <button onClick={goHome}>Flipboard</button>
                            </span>
                    </Typography>
                <Search />

                <div className={styles.registration}>
                    <div>
                        {/* <img src="/images/user_icon.png" class="nav_icon" /> */}
                        <p>Connexion / Inscription</p>
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