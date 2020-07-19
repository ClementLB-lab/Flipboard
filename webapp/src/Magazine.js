import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { Button, TextField, FormControlLabel, Switch, Modal } from "@material-ui/core";
import FormContainer from "./FormContainer";
import ReactDOM from "react-dom";
import Comment from './Comment'

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
    const [review, setReview] = useState("");


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

    const handleTextFieldChange = (e) => {
        setReview(e.target.value)
    };

    const addReview = async () => {
        console.log("L'ID du mag : " + id)
        console.log("Commentaire : " + review)
        console.log("Token du user : " + http.token)
        const output = await http.post("/magazine/addReview", {
            magazineId: id,
            review: review,
            token: http.token
        });

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
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <Comment
                                icon={icon}
                                username="Michael"
                                text="Chance too good. God level bars."
                                date="posted 1 minute ago"
                            />
                        </Grid>
                        </Grid>
                        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                        <Grid container wrap="nowrap" spacing={6}>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <Comment
                                icon={icon}
                                username="John"
                                text="Voici un petit test"
                                date="posted 5 minute ago"
                            />
                        </Grid>
                        </Grid>
                    </Paper>
                    </div>
                    <div style={{marginTop:"90px"}}>
                        <h3 class="jss195">Post your comment</h3>
                        <form className={styles.root} noValidate autoComplete="off">
                            <div style={{display:"flex", alignItems: "center"}}>
                                <Avatar alt="Remy Sharp" src={icon} />
                                <TextField
                                id="standard-multiline-static"
                                label="Write some nice stuff or nothing"
                                multiline
                                rows={4}
                                defaultValue=""
                                fullWidth
                                onChange={handleTextFieldChange}
                                />
                            </div>
                        </form>
                        <div className={styles.buttonsContainer}>
                            <Button className={styles.button} variant="contained" color="secondary" onClick={addReview}>Post Comment</Button>
                        </div>
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

    article: {
        marginBottom: theme.spacing(20)
    },

    description: {
        marginTop: '-10px'
    },

    text: {
        marginLeft: '96px'
    },

    buttonsContainer: {
        display: "flex",
        justifyContent: "center"
    },

    button: {
        margin: theme.spacing(1)
    },

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    }
}));