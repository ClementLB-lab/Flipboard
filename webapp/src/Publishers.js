import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

export default function Publishers()
{
    const styles = useStyles();
    const history = useHistory();
    const goHome = () => history.push("/");

    return (
        <div>
            <div className={styles.brandBanner}>
                <div>
                    <h1>
                        <p className={styles.brandBannerHeader}>
                            Rejoignez Flipboard
                        </p>
                        <hr className={styles.brandBannerLine} />
                    </h1>
                </div>
                <div className={styles.brandBannerText}>
                    <p>
                        Nous récupérons actuellement nos articles via l'API contextualWeb.
                    </p>
                    <p>
                        N'hésitez pas à publier vos propres articles sur notre site.
                    </p>
                    <button onClick={goHome}>Page d'accueil</button>
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    brandBanner: {
        textAlign: 'center',
        marginRight: theme.spacing(10),
        padding: theme.spacing(0)
    },

    brandBannerHeader: {
        textAlign: 'left',
        fontFamily: 'FaktCondensed,AvenirNextCondensed-Medium,Segoe UI,sans-serif',
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'var(--color--grey-scale--primary)',
        display: 'inline-block',
        fontSize: '45px'
    },

    brandBannerText: {
        fontFamily: 'FaktCondensed,AvenirNextCondensed-Medium,Segoe UI,sans-serif',
        fontWeight: '300',
        color: 'var(--color--grey-scale--primary)',
        display: 'inline-block',
        fontSize: '20px'
    },

    brandBannerLine: {
        display: 'block',
        border: 'none',
        marginBottom: '0.5em',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderStyle: 'inset',
        borderWidth: '1px',
        backgroundColor: 'black',
        width: '50vh',
        height: '10px'
    }
}));