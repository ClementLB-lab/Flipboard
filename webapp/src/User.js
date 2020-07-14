import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

import Modal from 'react-modal';

Modal.setAppElement('#root')
export default function User()
{
    const styles = useStyles();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';
    const username = 'TEST';
    const followers = 0;
    const magazines = 0;

    const onSubmit = (event) => {
        // event.preventDefault();
        console.log(event.currentTarget.getAttribute('title'));
        console.log(event.currentTarget.getAttribute('description'));
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
                        <p>{followers} Followers | {magazines} Magazines</p>
                    </div>
                </header>
                <hr />
                <div className={styles.magazine}>
                    <h1>Magazines</h1>

                    <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>
                        Créer un nouveau magazine
                    </Button>

                    {/* <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                    </Modal> */}
                    <Modal isOpen={modalIsOpen} style={customModal}>
                        <h2>Créer un nouveau magazine</h2>
                        <form onClick={onSubmit}>
                            <div>
                                <input type="text" name="title" placeholder="Titre" required/>
                            </div>
                            <div>
                                <textarea type="text" name="description" placerholder="Description" required/>
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