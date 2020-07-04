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
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2)
    }
}));