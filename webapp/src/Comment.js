import React, { useState, Component } from 'react';
import { makeStyles, Avatar, Grid, Divider, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export default function Comment({icon, username, text, date, key, id, userId, logId, magazineId, http}) {

    const [errors, setErrors] = useState([]);

    const getTimeAgo = (date) => {
        const current = (Math.round(new Date().getTime() / 1000)) - 7200;
        var msPerMinute = 60;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - date;
    
        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
        }
        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
        }
        else {
            return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    };

    const deleteComment = () => {
        const output = http.post("/magazine/deleteReview", {
            magazineId: magazineId,
            reviewId: id,
            token: http.token
        });
        console.log(output)
        if (output.err) {
            setErrors(errors.concat(output.err));
            return (false);
        }
        if (output.success) {
            alert("Votre commentaire a été correctement supprimé")
        }
        return (output.success);
    };

    const setButton = () => {
        if (userId === logId) {
            return (
            <IconButton aria-label="delete" onClick={() => { deleteComment() }}>
                <DeleteIcon />
            </IconButton>);
        }
    };
 
    return(
        <div>
            <Grid container wrap="nowrap" spacing={6}>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <div style={{display:"flex", alignItems: "center"}}>
                        <Avatar alt="Remy Sharp" src={icon} />
                        <div style={{marginLeft:"40px"}}>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{username}</h4>
                            <p style={{ textAlign: "left" }}>
                                {text}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                {getTimeAgo(date)}
                            </p>
                        </div>
                        {setButton()}
                    </div>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </div>
    );
}