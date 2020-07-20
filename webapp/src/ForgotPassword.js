import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from "@material-ui/core";
import FormContainer from "./FormContainer";

export default function ForgotPassword({ http })
{
    const [errors, setErrors] = React.useState([]);
	const styles = useStyles();
    
    const onSubmit = async (data) => {
        const output = await http.post("/user/forgotpwd", {
            email: data.email
        });

        if (output.err) {
            setErrors([output.err]);
            return (false);
        }
        if (output.success) {
            alert("Un email vient d'être envoyé à l'adresse " + data.email + " !")
        }
        return (output.success);
    };

    return (
        <FormContainer
            title="Recover password" 
            errors={errors} 
            onSubmit={onSubmit}
            fullscreen
        >
            <TextField
                type="email"
                name="email"
                label="Email address" 
                variant="filled" 
                className={styles.input} 
                fullWidth
                required
            />
            <Button type="submit" variant="contained" color="primary">Send</Button>
        </FormContainer>
    );
}

const useStyles = makeStyles((theme) => ({
    input: {
        margin: "5px 0",
    }
}));