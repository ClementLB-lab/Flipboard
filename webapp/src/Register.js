import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from "@material-ui/core";
import FormContainer from "./FormContainer";
import Http from "./Http";

const http = new Http();

export default function Register()
{
    const [errors, setErrors] = React.useState([]);
	const styles = useStyles();
    
    const filter = (data) => {
        let errors = [];

        if (data.name.length < 3) errors.push("Username is too short.");
        if (data.password.length < 6) errors.push("Password is too short.");
        if (data.password !== data.vpassword) errors.push("Passwords are not the same.");
        if (errors.length > 0) {
            setErrors(errors);
            return (false);
        }
        return (true);
    }

    const onSubmit = async (data) => {
        //Todo
    };

    return (
        <FormContainer 
            title="Join the club of informed people!" 
            errors={errors} 
            filter={filter}
            onSubmit={onSubmit}
        >
            <TextField
                label="Name"
                name="name"
                variant="filled"
                minLength={3}
                className={styles.input}
                fullWidth
                required
            />
            <TextField
                type="email"
                name="email"
                label="Email address" 
                variant="filled" 
                className={styles.input} 
                fullWidth
                required
            />
            <TextField 
                type="password"
                name="password"
                label="Password" 
                variant="filled"
                minLength={6} 
                className={styles.input} 
                fullWidth
                required
            />
            <TextField 
                type="password"
                name="vpassword"
                label="Confirm your password" 
                variant="filled"
                minLength={6}
                className={styles.input} 
                fullWidth
                required
            />
            <Button type="submit" variant="contained" color="primary">Register!</Button>
        </FormContainer>
    );
}

const useStyles = makeStyles((theme) => ({
    input: {
        margin: "5px 0",
    }
}));