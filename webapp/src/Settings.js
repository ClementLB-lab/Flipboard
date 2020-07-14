import React, { useState } from 'react';
import { Button, makeStyles } from "@material-ui/core";
import Switch from "react-switch";

export default function Settings()
{
    const styles = useStyles();

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';    

    const [username = "Test", setUsername] = useState()
    const [email = "", setEmail] = useState()
    const [bio = "", setBio] = useState()
    const [toggle = false, setToggle] = useState()


    const handleChangeUsername = e => {
        setUsername(e.target.value)
    }
    
    const handleChangeEmail = e => {
        setEmail(e.target.value)
    }

    const handleChangeBio = e => {
        setBio(e.target.value)
    }

    const handleChangeToggle = e => {
        setToggle(!toggle)
    }
    
    const handleSubmit = event => {
        alert(username)
        alert(email)
        alert(bio)
        alert(toggle)
//        event.preventDefault()
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
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <p>Nom d'utilisateur</p>
                        <input className={styles.input} type="text" value={username} onChange={handleChangeUsername} />
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Email</p>
                        <input className={styles.input} type="text" value={email} onChange={handleChangeEmail} />
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Bio</p>
                        <textarea className={styles.input} type="text" value={bio} onChange={handleChangeBio} />
                    </div>
                    <label htmlFor="normal-switch">
                        <span>Profil privée ?</span>
                        <Switch
                            onChange={handleChangeToggle}
                            checked={toggle}
                            id="normal-switch"
                        />
                    </label>
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
        marginBottom: '24px'
    },

    input: {
        width: '90vh',
        height: '30px',
        padding: '8px 12px',
        fontSize: '16px',
        fontWeight: '500'
    },

    reactSwitch: {
        verticalAlign: 'middle',
        marginLeft: '4px'
    }
}));