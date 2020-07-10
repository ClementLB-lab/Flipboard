import React from "react";
import { motion } from "framer-motion";
import { withStyles } from '@material-ui/core/styles';
import { Card } from "@material-ui/core";

class AnimatedCardContainer extends React.Component
{
    render()
    {
        const styles = this.props.classes;
        
        return (
            <div className={styles.container}>
                <motion.div
                    initial={{
                        x: "100vw",
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.75,
                        type: "spring"
                    }}
                >
                    <Card className={styles.card}>
                        {this.props.children}
                    </Card>
                </motion.div>
            </div>
        );
    }
}

const styles = (theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    card: {
        minWidth: 600,
        margin: "auto",
        padding: 10
    }
});

export default withStyles(styles, {withTheme: true})(AnimatedCardContainer);