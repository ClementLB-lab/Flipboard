import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from "@material-ui/core";
import FormContainer from "./FormContainer";

export default function Register({ http })
{
    const getParameterByName = (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(window.location.href);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    const [errors, setErrors] = React.useState([]);
	const styles = useStyles();
    const myId = getParameterByName("id");
    const myToken = getParameterByName("token");

    const filter = (data) => {
        let errors = [];

        if (data.password.length < 6) errors.push("Password is too short.");
        if (data.password !== data.vpassword) errors.push("Passwords are not the same.");
        if (myId == "" || myToken == "") errors.push("There is one or more arguments missing.")
        if (errors.length > 0) {
            setErrors(errors);
            return (false);
        }
        return (true);
    }

    const onSubmit = async (data) => {
        const output = await http.post("/user/resetpwd", {
            password: data.password,
            password2: data.vpassword,
            id: myId,
            token: myToken
        });

        if (output.err) {
            setErrors([output.err]);
            return (false);
        }
        if (output.success) {
            alert("Votre mot de passe a bien été modifié!")
        }
        return (output.success);
    };

    return (
        <FormContainer
            title="Choose a new password" 
            errors={errors} 
            filter={filter}
            onSubmit={onSubmit}
            fullscreen
        >
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
                label="Confirm Password" 
                variant="filled"
                minLength={6} 
                className={styles.input} 
                fullWidth
                required
            />
            <Button type="submit" variant="contained" color="primary">Save</Button>
        </FormContainer>
    );
}

const useStyles = makeStyles((theme) => ({
    input: {
        margin: "5px 0",
    }
}));