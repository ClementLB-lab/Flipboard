import React from 'react';
import { Button, makeStyles } from "@material-ui/core";

import UserIcon from "@material-ui/icons/PersonOutline";

export default function Settings()
{
    const styles = useStyles();
    const onSubmit = () => {

    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.userIcon}>
                        <UserIcon className={styles.icon} />
                    </div>
                    <div>
                        <h1>TEST</h1>
                    </div>
                </header>
                <hr />
                <h1>Paramètres utilisateur</h1>
                <form autoComplete="off">
                    <div className={styles.inputContainer}>
                        <p>Nom d'utilisateur</p>
                        <input className={styles.input} type="text" label="username" />
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Email</p>
                        <input className={styles.input} type="text" label="Email" />
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Bio</p>
                        <textarea className={styles.input} type="text" label="Bio" />
                    </div>
                    <Button variant="contained" color="primary" onClick={onSubmit}>Sauvegarder</Button>
                </form>
            </main>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '1142px',
        margin: '0 auto',
        paddingTop: '20px'
    },

    main: {
        paddingLeft: '16px',
        paddingRight: '16px'
    },

    header: {
        display: 'flex',
        alignItems: 'center'
    },

    userIcon: {
        marginRight: '16px',
        marginBottom: '8px',
        minWidth: '80px'
    },

    icon: {
        width: '80px',
        height: '80px'
    },

    inputContainer: {
        marginBottom: '24px',
    },

    input: {
        width: '90vh',
        height: '44px',
        padding: '8px 12px',
        fontSize: '16px',
        fontWeight: '500'
    }
}));