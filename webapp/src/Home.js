import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ArticleList from "./ArticleList";

class Home extends React.Component
{
    render()
    {
        const styles = this.props.classes;
        return (
            <>
                <div>
                    <div className={styles.brandBanner}>
                        <h1 className={styles.brandBannerHeader}>
                            <p>Soyez informé</p>
                            <p>Soyez inspiré</p>
                            <hr className={styles.brandBannerLine}/>
                            </h1>
                        <p>Des histoires sélectionnées pour vous</p>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <Button className={styles.button} variant="contained" color="secondary">Login</Button>
                        <Button className={styles.button} variant="contained" color="secondary">Register</Button>
                    </div>
                </div>
                <div>
                    <ArticleList articles={this.props.articles} />
                </div>
            </>
        );
    }
}

const styles = (theme) => ({
    buttonsContainer: {
        display: "flex",
        justifyContent: "center"
    },
    button: {
        margin: theme.spacing(1)
    },
    brandBanner: {
        textAlign: 'center',
        padding: '0'
    },
    brandBannerHeader: {
        marginBottom: '15px',
        lineHeight: '40px',
        fontFamily: 'FaktCondensed,AvenirNextCondensed-Medium,Segoe UI',
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'var(--color--grey-scale--primary)',
        display: 'inline-block',
        fontSize: '45px'
    },
    brandBannerLine: {
        display: 'block',
        border: 'none',
        marginTop: '0.5em',
        marginBottom: '0.5em',
        margin: 'auto',
        borderStyle: 'inset',
        borderWidth: '1px',
        backgroundColor: 'red',
        width: '33vh',
        height: '3px'
    }
});

export default withStyles(styles, {withTheme: true})(Home);