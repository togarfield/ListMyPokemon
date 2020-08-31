import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Grid, makeStyles } from '@material-ui/core';
import Card from './Card';

const ListPokemon = () => {
    const myPokemon = [];
    const classes = useStyles();
    const { pokemons, fetchPokemon } = useContext(GlobalContext);

    useEffect(() => {
        fetchPokemon()
    }, [])

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
                    pokemons && pokemons.length > 0 && pokemons.map((pokemon, i) => {
                        return <Card pokemon={pokemon} index={i} mypokemon={myPokemon} listPokemon={true} />
                    })
                }
            </Grid>
        </div>
    );
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

export default ListPokemon;