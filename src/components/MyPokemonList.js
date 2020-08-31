import React, {useContext} from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Card from './Card';
import { GlobalContext } from '../context/GlobalState';

export default function MyPokemonList() {
    const { mypokemon } = useContext(GlobalContext);
    const classes = useStyles();
    return (
        <div className={classes.divroot}>
            <Grid
                className={classes.root}
                container
                spacing={4}
                justify="center"
                alignItems="center"
                direction="row" >
                {
                    mypokemon && mypokemon.length > 0 && mypokemon.map((pokemon, i) => {
                        return <Card pokemon={pokemon} index={i} />
                    })
                }
            </Grid>
        </div>
    )
}
const useStyles = makeStyles(theme => ({
    root: {
        padding: 20,
        paddingTop: 80
    },
    divroot: {
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        margin: "20"
    }
}))
