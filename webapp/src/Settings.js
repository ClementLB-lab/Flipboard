import React from 'react';
import { Button, makeStyles } from "@material-ui/core";

export default function Settings()
{
    const styles = useStyles();

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';    
    const username = 'Test';

    const onSubmit = (event) => {
        // event.preventDefault();
        console.log(event.currentTarget.getAttribute('username'));
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.userIcon}>
                        <img src={icon} alt="User Icon" className={styles.icon} />
                    </div>
                    <div>
                        <h1>{username}</h1>
                    </div>
                </header>
                <hr />
                <h1>Paramètres utilisateur</h1>
                <form onClick={onSubmit}>
                    <div className={styles.inputContainer}>
                        <p>Nom d'utilisateur</p>
                        <input className={styles.input} type="text" id="username" name="username" />
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Email</p>
                        <input className={styles.input} type="text" id="email" name="email" />
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Bio</p>
                        <textarea className={styles.input} type="text" id="bio" name="bio" />
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Avatar</p>
                        <input type="file" name="avatar" accept="image/x-png,image/jpeg" method="POST" />
                    </div>
                    <Button variant="contained" color="primary" type="submit">Sauvegarder</Button>
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
        height: '80px',
        borderRadius: '40px'
    },

    inputContainer: {
        marginBottom: '24px',
    },

    input: {
        width: '90vh',
        height: '30px',
        padding: '8px 12px',
        fontSize: '16px',
        fontWeight: '500'
    }
}));