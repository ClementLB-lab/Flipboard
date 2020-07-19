import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { Button, TextField, FormControlLabel, Switch, Modal } from "@material-ui/core";
import FormContainer from "./FormContainer";
import ReactDOM from "react-dom";

import { Divider, Avatar, Grid, Paper, TextareaAutosize } from "@material-ui/core";

import "./styles.css";

export default function Magazine({ http })
{
    const styles = useStyles();

    const icon = 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg';
    const [magazinename, setMagazinename] = useState("");
    const [followers, setFollowers] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");


    const [followerid, setFollowerId] = useState([]);
    const [magazinenamefollower, setMagazinenamefollower] = useState([]);
    const [urlfollower, setUrlfollower] = useState([]);
    const [errors, setErrors] = useState([]);

    const getParameterByName = (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(window.location.href);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    const getAllParams = async () => {
        const magazineId = getParameterByName('id');
        let output;

        if (!http.token) {
            return;
        }
        console.log(magazineId)
        output = await http.get(`/magazine/getMagazineById?id=${magazineId}`);
        console.log(output)
        setId(output.id);
        setMagazinename(output.name);
        setDescription(output.description);
//        setFollowers(output.followers);
    };

    const getReviews = async () => {
/*        const output = await http.get(`/user/getReviews?id=${id}`);
        
        setFollowerId(output.followerid);
        setUsernamefollower(output.followerName);
        setUrlfollower(output.avatarUrl);
        console.log(followerid[0])
    */    };

    const filter = (data) =>
    {
        
    }
    const handleSubmit = async (data) =>
    {
    }

    return (
        <div onLoad={getAllParams} className={styles.container}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.userIcon}>
                        <img src={icon} alt="User Icon" className={styles.icon} />
                    </div>
                    <div>
                        <h1>{magazinename}</h1>
                        <p className={styles.description}>{description}</p>
                    </div>
                </header>
                <div>
                    <p className={styles.text}>{followers} personnes suivent ce magazine</p>
                    <hr />
                </div>
                <div className={styles.article}>
                    <h1>Article</h1>

                </div>
                <div>
                    <h1>Comments</h1>


                    <div style={{ padding: 14 }} className="Comments">
                    <Paper style={{ padding: "40px 20px" }}>
                        <Grid container wrap="nowrap" spacing={6}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={icon} />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>Michael</h4>
                            <p style={{ textAlign: "left" }}>
                            Chance too good. God level bars. I'm so proud of @LifeOfDesiigner #1 song in the country. Panda! Don't be scared of the truth because we need to restart the human foundation in truth I stand with the most humility. We are so blessed!{" "}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                            </p>
                        </Grid>
                        </Grid>
                        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                        <Grid container wrap="nowrap" spacing={6}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={icon} />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>John</h4>
                            <p style={{ textAlign: "left" }}>
                            Hello guys, nice to have you on the platform! There will be a lot of great stuff coming soon. We will keep you posted for the latest news. Don't forget, You're Awesome!{" "}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                            </p>
                        </Grid>
                        </Grid>
                    </Paper>
                    </div>
                    <div style={{marginTop:"90px"}}>
                        <h3 class="jss195">Post your comment</h3>
                        <form className={styles.root} noValidate autoComplete="off">
                        <Avatar alt="Remy Sharp" src={icon} />
                        <div>
                            <TextField
                            id="standard-multiline-static"
                            label="Write some nice stuff or nothing"
                            multiline
                            rows={4}
                            defaultValue=""
                            />
                        </div>
                        <div>
                            <TextField
                            id="filled-multiline-static"
                            label="Multiline"
                            multiline
                            rows={8}
                            defaultValue="Default Value"
                            variant="filled"
                            />
                        </div>
                        </form>
                    </div>
                    <ul onLoad={getReviews}>
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

    article: {
        marginBottom: theme.spacing(20)
    },

    description: {
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
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    }
}));