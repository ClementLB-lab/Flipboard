import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Typography, TextField, Button } from "@material-ui/core";
import AnimatedCardContainer from "./AnimatedCardContainer";

export default function Register()
{
	const styles = useStyles();
    const history = useHistory();
    
    const goHome = () => history.push("/");
    const onSubmit = () => {

    };

    return (
    	<AnimatedCardContainer>
    		<CardContent>
    			<Typography variant="h4" component="h2" className={styles.title}>
    				Join the club of well-informed people!
    			</Typography>
			    <form autoComplete="off">
			       	<TextField label="Email address" variant="filled" className={styles.input} fullWidth />
			       	<TextField type="password" label="Password" variant="filled" className={styles.input} fullWidth />
			       	<TextField type="password" label="Confirm your password" variant="filled" className={styles.input} fullWidth />
                    <Button variant="contained" color="primary" onClick={onSubmit}>Register!</Button>
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