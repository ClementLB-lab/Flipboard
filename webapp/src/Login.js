import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from "@material-ui/core";
import FormContainer from "./FormContainer";

export default function Login()
{
    const [errors, setErrors] = React.useState([]);
	const styles = useStyles();
    
    const filter = (data) => {
        let errors = [];

        if (data.password.length < 6) errors.push("Password is too short.");
        if (errors.length > 0) {
            setErrors(errors);
            return (false);
        }
        return (true);
    }

    const onSubmit = async (data) => {
        // Todo
    };

    return (
        <FormContainer
            title="Login to your account"
            errors={errors}
            filter={filter}
            onSubmit={onSubmit}
        >
            <TextField 
                type="email"
                name="email"
                label="Email address" 
                variant="filled"
                minLength={3}
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
            <Button type="submit" variant="contained" color="primary">Login!</Button>
        </FormContainer>
    );
}

const useStyles = makeStyles((theme) => ({
    input: {
        margin: "5px 0",
    }
}));