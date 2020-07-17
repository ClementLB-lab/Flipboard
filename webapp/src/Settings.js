import React, { useState } from 'react';
import { Button, Switch, FormControlLabel, TextField, TextareaAutosize, makeStyles } from "@material-ui/core";
import axios from 'axios';

export default function Settings()
{
    const styles = useStyles();

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5NDc3NzI1MiwiZXhwIjoxNTk0NzgwODUyfQ.oSYfTxcysbtWv0b66Y1yKwmm7Y7986f3wwUMwuvs2Pw"

    const [username = "", setUsername] = useState()
    const [email = "", setEmail] = useState()
    const [bio = "", setBio] = useState()
    const [toggle = false, setToggle] = useState()

    const getAllParams = event => {
        axios('/user/getByJWT?token=' + authToken, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }).then(response => {
            setUsername(response.data.name)
            setEmail(response.data.email)
            setBio(response.data.bio)
            setToggle(response.data.private)
        })        
    };

    const handleChangeUsername = e => {
        setUsername(e.target.value)
    }
    
    const handleChangeEmail = e => {
        setEmail(e.target.value)
    }

    const handleChangeBio = e => {
        setBio(e.target.value)
    }
    
    const handleSubmit = event => {
        event.preventDefault();

        // Token à modifier toutes les heures !
        const user = {
            name: username,
            email: email,
            bio: bio,
            isPrivate: toggle,
            token: authToken
        };

        axios(`/user/editprofile`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
            data: user
        }).then(response => {
            console.log(response)
        })
    }

    return (
        <div onLoad={getAllParams} className={styles.container}>
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
                <h1>User settings</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        variant="filled"
                        value={username}
                        minLength={3}
                        className={styles.input}
                        fullWidth
                        required
                    />
                    <TextField
                        type="email"
                        label="Email"
                        name="email"
                        variant="filled"
                        value={email}
                        className={styles.input}
                        fullWidth
                        required
                    />
                    <TextareaAutosize
                        rowsMax={4}
                        placeholder="Biography"
                        name="bio"
                        value={bio}
                        className={styles.input}
                    />
                    <FormControlLabel
                        label="Profil privé"
                        control={
                            <Switch checked={toggle} onChange={(e) => setToggle(e.target.checked)} name="private" />
                        }
                    />
                    <TextField
                        type="file"
                        label="Avatar"
                        name="avatar"
                        accept="image/x-png,image/jpeg"
                        method="POST"
                        className={styles.input}
                    />
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

    input: {
        margin: "5px 0"
    },

    reactSwitch: {
        verticalAlign: 'middle',
        marginLeft: '4px'
    }
}));