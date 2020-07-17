import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { Button, TextField, FormControlLabel, Switch } from "@material-ui/core";
import axios from 'axios';
import FormContainer from "./FormContainer";

import Modal from 'react-modal';

Modal.setAppElement('#root')
export default function User({ http })
{
    const styles = useStyles();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5NDc5ODAyNiwiZXhwIjoxNTk0ODAxNjI2fQ.rgSpi9PyNvZ00lyRHzrhnDLmhlh1dnPBNUAwktEiEzo"

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';
    const [username, setUsername] = useState("");
    const [followers, setFollowers] = useState("");
    const [magazines, setMagazines] = useState("");
    const [id, setId] = useState("");

    const [followerid, setFollowerId] = useState([]);
    const [usernamefollower, setUsernamefollower] = useState([]);
    const [urlfollower, setUrlfollower] = useState([]);
    const [data, setMagazinename] = useState([]);
    const [errors, setErrors] = useState([]);
    const [toggle, setToggle] = useState(false);

    const getAllParams = () => {
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
            setId(response.data.id)
            setUsername(response.data.name)
            setFollowers(response.data.followers)
            setMagazines(response.data.magazines)
        })        
    };

    const getFollowers = () => {
        axios('/user/getFollowers?id=' + id, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }).then(response => {
            setFollowerId(response.data.followerid)
            setUsernamefollower(response.data.followerName)
            setUrlfollower(response.data.avatarUrl)
            console.log(followerid[0])
        })
    };

    const getMagazines = () => {
        axios('/user/getMagazinesByOwnerId?id=' + id, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }).then(response => {
            setMagazinename(response.data)
            console.log(data[3])
        })
    };

    const filter = (data) =>
    {
        
    }
    const handleSubmit = (data) =>
    {
        const magazine = {
            name: data.title,
            description: data.description,
            token: http.token
        };
        axios('/user/createmagazine', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
            data: magazine
        }).then(response => {
            if (response.data.success === true) {
                alert("Votre magazine a bien été créé.");
                setModalIsOpen(false)};
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
                        <h1>{username} | {id}</h1>
                        <p>{followers} Followers | {magazines} Magazines</p>
                    </div>
                </header>
                <hr />
                <div className={styles.magazine}>
                    <h1>Magazines</h1>

                    <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>
                        Créer un nouveau magazine
                    </Button>

                    <ul onLoad={getMagazines}>
                        {data.map(item => (
                            <li key={item.followerid}>
                                <div>{item.followerName}</div>
                                <div>{item.urlfollower}</div>
                            </li>
                        ))}
                    </ul>


                    <Modal isOpen={modalIsOpen} style={customModal}>
                        <FormContainer
                            title="Create a new magazine" 
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                label="Title"
                                name="title"
                                variant="filled"
                                minLength={3}
                                className={styles.input}
                                fullWidth
                                required
                            />
                            <div>
                                Description
                                <textarea
                                    name="description"
                                    className={styles.textarea}
                                    type="text"
                                />
                            </div>
                            <FormControlLabel
                                label="Magazine privé"
                                control={
                                    <Switch checked={toggle} onChange={(e) => setToggle(e.target.checked)} name="private" />
                                }
                            />
                            <div>
                                <Button color="secondary" onClick={() => setModalIsOpen(false)}>Annuler</Button>
                                <Button>Sauvegarder</Button>
                            </div>
                        </FormContainer>
                    </Modal>
                </div>
                <div>
                    <h1>Abonnés</h1>
                    <ul onLoad={getFollowers}>
                        {followerid.map(item => (
                            <li key={item.followerid}>
                                <div>{item.followerName}</div>
                                <div>{item.urlfollower}</div>
                            </li>
                        ))}
                    </ul>
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
        minWidth: '80px'
    },

    icon: {
        width: '80px',
        height: '80px',
        borderRadius: '40px'
    },

    inputName: {
        margin: "5px 0"
    },

    textarea: {
        width: '55vh',
        height: '54px',
        padding: '8px 12px',
        fontSize: '16px',
        fontWeight: '500'
    },

    magazine: {
        marginBottom: theme.spacing(20)
    }
}));

const customModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-40%, -40%)',
        maxWidth: '551px',
        minHeight: '200px'
    }
}