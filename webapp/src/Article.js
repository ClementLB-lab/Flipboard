import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function Article({http, id, title, date, author, description, body, image})
{
    const styles = useStyles();
    const history = useHistory();

    const [magazineName, setMagazineName] = useState([]);
    const [magazineId, setMagazineId] = useState([]);
    
    const onClickAddArticle = async () => {
        let output;

        if (!http.token) {
            history.push("/login");
            return;
        }
        output = await http.get(`/user/getByJWT?token=${http.token}`);
        let _id = output.id;

        const responseMagazine = await http.get(`/magazine/getMagazinesByOwnerId?id=${_id}`);
        if (responseMagazine !== undefined) {
            setMagazineName(responseMagazine.name);
            setMagazineId(responseMagazine.id);
        } else {
            alert("Vous devez créer un magazine pour faire cette action");
            return;
        }

        const article = {
            articleId: id,
            magazineId: magazineId[0]
        }
        output = await http.post(`/user/addArticle`, article);

        if (output.success) {
            alert("Cet article à été ajouté à votre magazine " + magazineName[0]);
        } else {
            alert("Cet article n'a pas pu être ajouté à votre magazine " + magazineName[0]);
        }
    }

    const onClickLikeArticle = async () => {
        let output;

        if (!http.token) {
            history.push("/login");
            return;
        }
        output = await http.get(`/user/getByJWT?token=${http.token}`);
        let _id = output.id;

        const responseMagazine = await http.get(`/magazine/getMagazinesByOwnerId?id=${_id}`);
        if (responseMagazine !== undefined) {
            setMagazineName(responseMagazine.name);
            setMagazineId(responseMagazine.id);
        } else {
            alert("Vous devez créer un magazine pour faire cette action");
            return;
        }

        const article = {
            userId: _id,
            magazineId: magazineId[0],
            articleId: id
        }
        output = await http.post(`/user/addFavoriteArticle`, article);

        if (output.success) {
            alert("Cet article à été ajouté à vos favoris.");
        } else {
            alert("Cet article n'a pas pu être ajouté à vos favoris.");
        }
    }

    return (
        <Card className={styles.root}>
            <CardMedia
                component="img"
                alt="Article illustration"
                height={(image.height > 1000 ? 1000 : image.height) * 0.75}
                image={image.url}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography color="textSecondary" >
                    {date} by {author}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    {description}
                </Typography>
                <br/>
                <Typography variant="body2" component="p">
                    {body.replace("<br />", "\n")}
                </Typography>
            </CardContent>

            <Tooltip title="Like">
                <Button variant="contained" color="primary" onClick={() => onClickLikeArticle()}>
                    <FavoriteBorderIcon />
                </Button>
            </Tooltip>

            <Tooltip title="Add this article">
                <Button variant="contained" color="primary" onClick={() => onClickAddArticle()}>
                    <AddIcon />
                </Button>
            </Tooltip>

        </Card>
    );
}

const useStyles = makeStyles({
    root: {
        maxWidth: 700,
        margin: "auto",
        marginBottom: 10,
        backgroundColor: "primary.main"
    }
});