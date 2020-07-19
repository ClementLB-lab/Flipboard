import React, { useState, Component } from 'react';
import { makeStyles, Avatar, Grid, Divider } from "@material-ui/core";

export default function Comment({icon, username, text, date, key, length}) {

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
                                {date}
                            </p>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </div>
    );
}