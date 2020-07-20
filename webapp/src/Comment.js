import React, { useState, Component } from 'react';
import { makeStyles, Avatar, Grid, Divider } from "@material-ui/core";

export default function Comment({icon, username, text, date, key, length}) {

    const getTimeAgo = (date) => {
        const current = (Math.round(new Date().getTime() / 1000)) - 7200;
        console.log("Timestamp actuel : " + current)
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
                    </div>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </div>
    );
}