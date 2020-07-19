import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function Article({id, title, date, author, description, body, image})
{
    const styles = useStyles();
    
    const onClickAddArticle = () => {
    }

    const onClickLikeArticle = () => {
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
                <Button variant="contained" color="primary">
                    <FavoriteBorderIcon />
                </Button>
            </Tooltip>

            <Tooltip title="Add this article">
                <Button variant="contained" color="primary">
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