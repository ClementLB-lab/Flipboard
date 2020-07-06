import React from 'react';
import { Button, InputBase } from "@material-ui/core";
import { fade, withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

class Search extends React.Component
{
    state = {
        searchValue: ""
    };

    onInputChange = (e) =>
    {
        this.setState({
            searchValue: e.target.value
        });
    }
    onSubmit = () =>
    {
        this.props.onSearch(this.state.searchValue);
    }
    
    render()
    {
        const styles = this.props.classes;
        return (
            <div className={styles.container}>
                <div className={styles.searchBar}>
                    <div className={styles.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search..."
                        classes={{
                            root: styles.inputRoot,
                            input: styles.inputInput
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={this.onInputChange}
                    />
                </div>
                <Button onClick={this.onSubmit} variant="contained">Search</Button>
            </div>
        );
    }
}

const styles = (theme) => ({
    container: {
        display: "flex"
    },
    searchBar: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
});

export default withStyles(styles, {withTheme: true})(Search);