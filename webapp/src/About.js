import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import Space from './images/space.jpg'

export default function About()
{
    const styles = useStyles();
    const history = useHistory();
    const goHome = () => history.push("/");

    return (
        <div className={styles.container}>
            <div>
                <header className={styles.brandBanner}>
                    <h1 className={styles.brandBannerHeader}>
                        <p className={styles.colorText}>C'est à votre tour</p>
                    </h1>
                    <p className={styles.colorText}>Découvrez et partagez les histoires qui forment votre monde</p>
                    <button onClick={goHome}>Page d'accueil</button>
                </header>
            </div>
            <p className={styles.text} >Ce site est un projet étudiant réalisé par Alexandre Cochet, Clément Le-Boëdec et François Lagadec</p>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: `url(${Space})`,
        backgroundSize: "cover",
        minHeight: 800
    },

    brandBanner: {
        textAlign: 'right',
        marginRight: theme.spacing(10),
        padding: theme.spacing(0)
    },

    brandBannerHeader: {
        marginTop: theme.spacing(30),
        marginBottom: theme.spacing(-35),
        fontFamily: 'FaktCondensed,AvenirNextCondensed-Medium,Segoe UI,sans-serif',
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'var(--color--grey-scale--primary)',
        display: 'inline-block',
        fontSize: '45px'
    },

    text: {
        marginTop: theme.spacing(40),
        marginLeft: theme.spacing(2),
        color: 'white'
    },

    colorText: {
        color: 'white'
    }
}));