import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Typography, TextField, Button } from "@material-ui/core";
import AnimatedCardContainer from "./AnimatedCardContainer";

export default function Login()
{
	const styles = useStyles();
    
    const onSubmit = () => {

    };

    return (
    	<AnimatedCardContainer>
    		<CardContent>
    			<Typography variant="h4" component="h2" className={styles.title}>
    				Login to your account
    			</Typography>
			    <form autoComplete="off">
			       	<TextField label="Email address" variant="filled" className={styles.input} fullWidth />
			       	<TextField type="password" label="Password" variant="filled" className={styles.input} fullWidth />
			       	<Button variant="contained" color="primary" onClick={onSubmit}>Login!</Button>
			    </form>
		    </CardContent>
	    </AnimatedCardContainer>
    );
}

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'FaktCondensed,AvenirNextCondensed-Medium,Segoe UI',
        fontWeight: 900,
        textTransform: "uppercase",
        marginBottom: 20
    },
    input: {
    	margin: "5px 0",
    }
}));