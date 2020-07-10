import React from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import AnimatedCardContainer from "./AnimatedCardContainer";
import ArticleList from "./ArticleList";

export default function Home({ articles })
{
    const styles = useStyles();
    const history = useHistory();

    const onClickOnLogin = () => {
        history.push("login");
    };
    const onClickOnRegister = () => {
        history.push("register");
    };

    return (
        <AnimatedCardContainer>
            <div className={styles.brandBanner}>
                <h1 className={styles.brandBannerHeader}>
                    <p>Be informed</p>
                    <p>Be inspired</p>
                    <hr className={styles.brandBannerLine}/>
                    </h1>
                <p>Histories selected for you.</p>
            </div>
            <div className={styles.buttonsContainer}>
                <Button className={styles.button} variant="contained" color="secondary" onClick={onClickOnLogin}>Login</Button>
                <Button className={styles.button} variant="contained" color="secondary" onClick={onClickOnRegister}>Register</Button>
            </div>
            <div>
                <ArticleList articles={articles} />
            </div>
        </AnimatedCardContainer>
    );
}

const useStyles = makeStyles((theme) => ({
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
        marginTop: 0,
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
}));