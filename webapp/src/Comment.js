import React, { useState, Component } from 'react';
import { makeStyles, Avatar } from "@material-ui/core";

export default function Comment({icon, username, text, date}) {

    return(
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
    );
}