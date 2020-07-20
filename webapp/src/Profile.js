import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { Button, GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

export default function Profile({ http })
{
    const styles = useStyles();
    const history = useHistory();

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';
    const [username, setUsername] = useState("");
    const [followers, setFollowers] = useState("");
    const [magazines, setMagazines] = useState("");
    const [id, setId] = useState("");
    const [bio, setBio] = useState("");

    const [followerUsername, setFollowerUsername] = useState([]);
    const [followerAvatar, setFollowerAvatar] = useState([]);
    const [followerID, setFollowerID] = useState([]);

    const [magazineName, setMagazineName] = useState([]);
    const [magazineId, setMagazineId] = useState([]);

    const [boolCondition, setBoolCondition] = useState();

    const getParameterByName = (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(window.location.href);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    const getAllParams = async () => {
        const profileId = getParameterByName('id');
        let output;

        if (!http.token) {
            history.push('/');
            return;
        }
        output = await http.get(`/user/getById?id=${profileId}`);
        if (output === null) {
            history.push('/login');
        } else {
            setId(output.id);
            setUsername(output.name);
            setBio(output.bio);
            setFollowers(output.followers);
            setMagazines(output.magazines);
        }

        const responseFollower = await http.get(`/user/getFollowers?id=${profileId}`);

        if (responseFollower.followerName !== undefined) {
            setFollowerUsername(responseFollower.followerName);
            setFollowerAvatar(responseFollower.avatarUrl);
            setFollowerID(responseFollower.followerId);
            setBoolCondition(true);
        } else {
            setBoolCondition(false);
        }

        const responseMagazine = await http.get(`/magazine/getMagazinesByOwnerId?id=${profileId}`);

        if (responseMagazine !== undefined) {
            setMagazineName(responseMagazine.name);
            setMagazineId(responseMagazine.id);
        }
    };

    const handleClick = async (bool) => {
        const body = {
            token: http.token,
            profileId: id
        };
        const output = await http.post(`/user/profilefollow`, body)

        if (!(output.success)) {
            alert("Erreur. L'utilisateur n'a pas pu être ajouté à votre liste d'abonnée");
        }

        setBoolCondition(!boolCondition);
    }

    const AccessUserProfile = async (data) => {
        console.log(data);
        let output = await http.get(`/user/getByJWT?token=${http.token}`);

        if (output.id === data) {
            history.push("/user");
        } else {
            history.push("/profile?id=" + data);
            history.go();
        }
    }

    const AccessMagazineById = async (data) => {
        console.log(data);
        history.push("/magazine?id=" + data);
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
                        <p className={styles.bio}>{bio}</p>
                    </div>
                </header>
                <div>
                    <Button className={styles.text} variant="contained" color="primary" onClick={() => handleClick(boolCondition)}>{boolCondition ? 'Unfollow' : 'Follow'}</Button>
                </div>
                <div>
                    <p className={styles.text}>{followers} Followers | {magazines} Magazines</p>
                    <hr />
                </div>
                <div className={styles.magazine}>
                    <h1>Magazines</h1>

                    <div className={styles.root}>
                        <GridList className={styles.gridList} cols={2}>
                            {magazineName.map((name, index) => (
                                <GridListTile>
                                    <div className={styles.rectangle}></div>
                                    <GridListTileBar
                                        title={name}
                                        classes={{
                                            root: styles.titleBar
                                        }}
                                        onClick={() => AccessMagazineById(magazineId[index])}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
                <div>
                    <h1>Abonnés</h1>
                    <div className={styles.root}>
                        <GridList className={styles.gridList} cols={2}>
                            {followerUsername.map((name, index) => (
                                <GridListTile key={followerAvatar[index]}>
                                    <img src={followerAvatar[index]} alt="Follower Icon" />
                                    <GridListTileBar
                                        title={name}
                                        classes={{
                                            root: styles.titleBar
                                        }}
                                        onClick={() => AccessUserProfile(followerID[index])}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
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
        marginBottom: theme.spacing(5)
    },

    addMagazineButton: {
        marginBottom: '20px'
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
    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },

    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)'
    },

    titleBar: {
        background: 'linear-gradient(to tap, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%)'
    },

    rectangle: {
        width: '180vh',
        height: '180vh',
        background: 'red'
    }
}));