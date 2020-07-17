import React from "react";
import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle } from "@material-ui/core";

export default function FormDialog({errors, open, onClick})
{
	return (
		<Dialog open={open}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
				{errors.map((e, i) => {
				    return <DialogContentText key={i}>{e}</DialogContentText>
                })}
                <Button onClick={onClick}>OK</Button>
        	</DialogContent>
        </Dialog>
	);
}