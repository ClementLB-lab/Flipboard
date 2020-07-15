import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from 'axios';

import Modal from 'react-modal';

Modal.setAppElement('#root')
export default function User()
{
    const styles = useStyles();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5NDc3NzI1MiwiZXhwIjoxNTk0NzgwODUyfQ.oSYfTxcysbtWv0b66Y1yKwmm7Y7986f3wwUMwuvs2Pw"

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';
    const [username = "", setUsername] = useState()
    const [followers = "", setFollowers] = useState()
    const [magazines = "", setMagazines] = useState()
    const [title = "", setTitle] = useState()
    const [description = "", setDescription] = useState()

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
            setUsername(response.data.name)
            setFollowers(response.data.followers)
            setMagazines(response.data.magazines)
        })        
    };

    const handleChangeTitle = e => {
        setTitle(e.target.value)
    }
    
    const handleChangeDescription = e => {
        setDescription(e.target.value)
    }

    const handleSubmit = event => {
        // fetch('http://localhost:3001/')
        alert(title)
        alert(description)
//        event.preventDefault()
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
                        <p>{followers} Followers | {magazines} Magazines</p>
                    </div>
                </header>
                <hr />
                <div className={styles.magazine}>
                    <h1>Magazines</h1>

                    <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>
                        Créer un nouveau magazine
                    </Button>
                    <Modal isOpen={modalIsOpen} style={customModal}>
                        <h2>Créer un nouveau magazine</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                Title:
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleChangeTitle}
                                />
                            </div>
                            <div>
                                Description
                                <textarea
                                    type="text"
                                    value={description}
                                    onChange={handleChangeDescription}
                                />
                            </div>
                            <div>
                                <button color="secondary" onClick={() => setModalIsOpen(false)}>Annuler</button>
                                <button>Sauvegarder</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div>
                    <h1>Abonnés</h1>
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

    inputContainer: {
        marginBottom: '24px',
    },

    input: {
        width: '90vh',
        height: '44px',
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
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
}