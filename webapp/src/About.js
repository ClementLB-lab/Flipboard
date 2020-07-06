import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from './images/flipboard.png';
import { makeStyles } from '@material-ui/core';

export default function About()
{
    const styles = useStyles();
    const history = useHistory();
    const goHome = () => history.push("/");

    return (
        <div>
            <span className={styles.flipboard}>
                <img className={styles.icon} src={logo} alt="Flipboard Icon" />FLIPBOARD
            </span>
            <div>
                <header className={styles.brandBanner}>
                    <h1 className={styles.brandBannerHeader}>
                        <p>C'est à votre tour</p>
                    </h1>
                    <p>Découvrez et partagez les histoires qui forment votre monde</p>
                    <button onClick={goHome}>Page d'accueil</button>
                </header>
            </div>
            {/* <img src="https://cdn.flipboard.com/wp-content/uploads/2018/01/F3-Eclipse2.jpg" alt="Eclipse Icon"></img> */}
            <p className={styles.text} >Ce site est un projet étudiant réalisé par Alexandre Cochet, Clément Le-Boëdec et François Lagadec</p>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginLeft: theme.spacing(5),
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        height: '5vh'
    },

    flipboard: {
        fontWeight: '1000',
        display: 'inline-block',
        fontSize: '35px'
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
        marginLeft: theme.spacing(2)
    }
}));