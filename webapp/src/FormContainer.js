import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography } from "@material-ui/core";
import AnimatedCardContainer from "./AnimatedCardContainer";
import FormDialog from "./FormDialog";
import Wallpaper from "./images/wallpaper.jpg";

export default function FormContainer(props)
{
	const [open, setOpen] = React.useState(false);
	const styles = useStyles();

	const submit = async (e) => 
	{
		const data = {};
		const elements = e.target.elements;
		
		e.preventDefault();
		for (let i = elements.length - 1; i >= 0; i--) {
			data[elements[i].name] = elements[i].value;
		}
		if (props.filter && !props.filter(data)) {
			setOpen(true);
			return;
		}
		if (!await props.onSubmit(data)) {
			setOpen(true);
		}
	}
	const displayFullscreenContainer = () =>
	{
		return (
			<div className={styles.container}>
				<FormDialog open={open} errors={props.errors} onClick={() => setOpen(false)}/>
				<AnimatedCardContainer>
					<CardContent>
						<Typography variant="h4" component="h2" className={styles.title}>
							{props.title}
	        			</Typography>
	            		<form autoComplete="off" onSubmit={submit} >
	        				{props.children}
	        			</form>
					</CardContent>
				</AnimatedCardContainer>
			</div>
		);
	}
	const displayNotFullscreenContainer = () =>
	{
		return (
			<div>
				<FormDialog open={open} errors={props.errors} onClick={() => setOpen(false)}/>
				<AnimatedCardContainer>
					<CardContent>
						<Typography variant="h4" component="h2" className={styles.title}>
		        			{props.title}
		        		</Typography>
		            	<form autoComplete="off" onSubmit={submit} >
		        			{props.children}
		        		</form>
					</CardContent>
				</AnimatedCardContainer>
			</div>
		)
	}

	return (props.fullscreen ? displayFullscreenContainer() : displayNotFullscreenContainer());
}

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: `url(${Wallpaper})`,
        backgroundSize: "cover",
        minHeight: 800
    },
    title: {
        fontFamily: 'FaktCondensed,AvenirNextCondensed-Medium,Segoe UI',
        fontWeight: 900,
        textTransform: "uppercase",
        marginBottom: 20
    }
}));