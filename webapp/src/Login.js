import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Link } from "@material-ui/core";
import FormContainer from "./FormContainer";

export default function Login({ http })
{
    const [errors, setErrors] = React.useState([]);
	const styles = useStyles();
    const history = useHistory();
    
    const filter = (data) => {
        return (true);
    }

    const onSubmit = async (data) => {
        const output = await http.post("/user/login", data);

        console.log(output)
        if (output.err) {
            setErrors(errors.concat(output.err));
            return (false);
        }
        if (output.success) {
            http.setToken(output.token);
            history.push("/user");
        }
        else
            setErrors([output.errorFields]);
        return (output.success);
    };

    return (
        <FormContainer
            title="Login to your account"
            errors={errors}
            filter={filter}
            onSubmit={onSubmit}
            fullscreen
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
            <Link href="/forgotPassword">
                Lost your password
            </Link>
            <Button type="submit" variant="contained" color="primary">Login!</Button>
        </FormContainer>
    );
}

const useStyles = makeStyles((theme) => ({
    input: {
        margin: "5px 0",
    }
}));