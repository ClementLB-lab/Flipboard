import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { Button, TextField, FormControlLabel, Switch, Modal, Tooltip } from "@material-ui/core";
import FormContainer from "./FormContainer";

export default function User({ http })
{
    const styles = useStyles();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';
    const [username, setUsername] = useState("");
    const [followers, setFollowers] = useState("");
    const [magazines, setMagazines] = useState("");
    const [id, setId] = useState("");
    const [bio, setBio] = useState("");

    const [followerUsername, setFollowerUsername] = useState([]);
    const [followerInfos, setFollowerInfos] = useState({});
    const [followerAvatar, setFollowerAvatar] = useState([]);

    const [data, setMagazinename] = useState([]);
    const [errors, setErrors] = useState([]);
    const [toggle, setToggle] = useState(false);

    const getAllParams = async () => {
        let output;

        if (!http.token) {
            return;
        }
        output = await http.get(`/user/getByJWT?token=${http.token}`);
        let _id = output.id;
        setId(output.id);
        setUsername(output.name);
        setBio(output.bio);
        setFollowers(output.followers);
        setMagazines(output.magazines);

        const response = await http.get(`/user/getFollowers?id=${_id}`);

        setFollowerUsername(response.followerName);
        setFollowerInfos(response);
        setFollowerAvatar(response.avatarUrl);
    };

    const getMagazines = async () => {
        const output = await http.get(`/user/getMagazinesByOwnerId?id=${id}`);
        setMagazinename(output);

    };

    const filter = (data) =>
    {
        
    }
    const handleSubmit = async (data) =>
    {
        const magazine = {
            name: data.title,
            description: data.description,
            token: http.token
        };
        const output = await http.post(`/user/createmagazine`, magazine);
        
        if (output.success) {
            alert("Votre magazine a bien été créé.");
            setModalIsOpen(false);
        }
    }

//    console.log(followerInfos)
    // const test = followerUsername.map(follower => {
    //     return (
    //         <p>{follower}</p>
    //     )
    // })

    return (
        <div onLoad={getAllParams} className={styles.container}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.userIcon}>
                        <img src={icon} alt="User Icon" className={styles.icon} />
                    </div>
                    <div>
                        <h1>{username}</h1>
                        <p className={styles.bio}>{bio}</p>
                    </div>
                </header>
                <div>
                    <p className={styles.text}>{followers} Followers | {magazines} Magazines</p>
                    <hr />
                </div>
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


                    <Modal 
                        open={modalIsOpen}
                        className={styles.customModal}
                        onClose={() => setModalIsOpen(false)}
                    >
                        <FormContainer
                            title="Create a new magazine" 
                            onSubmit={handleSubmit}
                            errors={[]}
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
                            <TextField
                                label="Description"
                                name="description"
                                variant="filled"
                                minLength={10}
                                className={styles.input}
                                fullWidth
                                required
                                multiline
                                rows={4}
                            />
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
                    <div>
                    {followerUsername.map((name, index) => (
                        <li key={index}>
                        {name}
                        <img src={followerAvatar[index]} alt="User Icon" className={styles.icon} />
                        </li>
                    ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '1142px',
        margin: '0 auto',
        paddingTop: '10px'
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
        borderRadius: '40px',
        marginTop: '16px'
    },

    input: {
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
    },

    bio: {
        marginTop: '-10px'
    },

    text: {
        marginLeft: '96px'
    },
    customModal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));