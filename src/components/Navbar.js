import React from 'react'
import { AppBar, Toolbar, Button, makeStyles } from '@material-ui/core'
import { useHistory } from "react-router-dom";

export default function Navbar() {
    const history = useHistory();
    const switchPage = (val) => {
        history.push(val);
    }
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Button color="inherit" onClick={() => {switchPage('/')}}>ListPokemon</Button>
                    <Button color="inherit" onClick={() => {switchPage('/mypokemonlist')}}>My Pokemon</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    appbar: {
        alignItems: "center"
    },
}))