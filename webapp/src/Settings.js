import React, { useState } from 'react';
import { Button, Switch, FormControlLabel, TextField, Modal, makeStyles, Divider, Link } from "@material-ui/core";
import FormContainer from "./FormContainer";

export default function Settings({ http })
{
    const styles = useStyles();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalDeleteAccountIsOpen, setModalDeleteAccountIsOpen] = useState(false);

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';

    const [errors, setErrors] = React.useState([]);

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [toggle, setToggle] = useState(false)

    const getAllParams = async (e) => {
        let output;

        if (!http.token) {
            return;
        }
        output = await http.get(`/user/getByJWT?token=${http.token}`);
        if (output) {
            setUsername(output.name)
            setEmail(output.email)
            setBio(output.bio)
            setToggle(output.private)
        }
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
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            name: username,
            email: email,
            bio: bio,
            isPrivate: toggle,
            token: http.token
        };
        const output = await http.post(`/user/editprofile`, user);

        if (output.err) {
            setErrors(errors.concat(output.err));
            return (false);
        }
        if (output.success) {
            alert("Vos informations ont été mis à jour.")
        }
        return (output.success);

    }

    const filter = (data) => {
        let errors = [];

        if (modalIsOpen && data.password.length < 6) errors.push("Your new Password is too short.");
        if (modalIsOpen && data.password !== data.vpassword) errors.push("Your new Passwords are not the same.");
        if (errors.length > 0) {
            setErrors(errors);
            return (false);
        }
        return (true);
    }
    
    const handlePasswordSubmit = async (data) => {
        const output = await http.post("/user/resetcurrentpwd", {
            currentpassword: data.currentpassword,
            password: data.password,
            password2: data.vpassword,
            token: http.token
        });
        if (output.err) {
            setErrors(errors.concat(output.err));
            return (false);
        }
        if (output.success) {
            alert("Votre mot de passe a été correctement modifié!")
            setModalIsOpen(false);
        }
        return (output.success);
    }

    const handleDeleteAccountSubmit = async (data) => {
        const output = await http.post("/user/deleteAccount", {
            password: data.password2,
            token: http.token
        });
        if (output.err) {
            setErrors(errors.concat(output.err));
            return (false);
        }
        if (output.success) {
            alert("Votre compte a été correctement supprimé de la base de donnée !")
            setModalIsOpen(false);
            window.location.href = "http://localhost:3000/";
        }
        return (output.success);
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
                        onChange={handleChangeUsername}
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
                        onChange={handleChangeEmail}
                        className={styles.input}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Biography"
                        placeholder="Biography"
                        name="bio"
                        value={bio}
                        onChange={handleChangeBio}
                        className={styles.input}
                        fullWidth
                        required
                        multiline
                        rows={4}
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
                    <Button variant="contained" color="primary" type="submit">Save</Button>
                </form>
                <div>
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                    <h1>Account settings</h1>
                    <div style={{width: "200px"}}>
                        <div style={{float: "left", marginTop: "15px"}}>
                            <Button className={styles.addMagazineButton} color="secondary" onClick={() => setModalIsOpen(true)}>Change Password</Button>
                        </div>
                        <div style={{float: "left", marginTop: "10px"}}>
                            <Button className={styles.addMagazineButton} color="secondary" onClick={() => setModalDeleteAccountIsOpen(true)}>Delete Account</Button>
                        </div>
                    </div>
                    <Modal
                        open={modalIsOpen}
                        className={styles.customModal}
                        onClose={() => setModalIsOpen(false)}
                    >
                        <FormContainer             
                            title="Change your password" 
                            errors={errors}
                            filter={filter}
                            onSubmit={handlePasswordSubmit}
                        >
                            Please enter your current password and choose your new password.
                            <TextField 
                                type="password"
                                name="currentpassword"
                                label="Your current password"
                                variant="filled"
                                minLength={6}
                                className={styles.input}
                                fullWidth
                                required
                            />
                            <TextField 
                                type="password"
                                name="password"
                                label="New password"
                                variant="filled"
                                minLength={6}
                                className={styles.input}
                                fullWidth
                                required
                            />
                            <TextField 
                                type="password"
                                name="vpassword"
                                label="Confirm password"
                                variant="filled"
                                minLength={6}
                                className={styles.input}
                                fullWidth
                                required
                            />
                            <div>
                                <Button color="secondary" onClick={() => setModalIsOpen(false)}>Cancel</Button>
                                <Button type="submit" variant="contained" color="primary">Save</Button>
                            </div>
                        </FormContainer>
                    </Modal>
                    <Modal
                        open={modalDeleteAccountIsOpen}
                        className={styles.customModal}
                        onClose={() => setModalDeleteAccountIsOpen(false)}
                    >
                        <FormContainer             
                            title="Change your password" 
                            errors={errors}
                            filter={filter}
                            onSubmit={handleDeleteAccountSubmit}
                        >
                            Please enter your password to confirm the complete deletion of the account.
                            <TextField 
                                type="password"
                                name="password2"
                                label="Your Password"
                                variant="filled"
                                minLength={6}
                                className={styles.input}
                                fullWidth
                                required
                            />
                            <div>
                                <Button color="secondary" onClick={() => setModalDeleteAccountIsOpen(false)}>Cancel</Button>
                                <Button type="submit" variant="contained" color="primary">Delete Account</Button>
                            </div>
                        </FormContainer>
                    </Modal>
                </div>
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
    },

    customModal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));