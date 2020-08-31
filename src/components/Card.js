import React, { useState, forwardRef, useContext } from 'react'
import { Card as MuiCard, Typography, makeStyles, Grid, CardContent, Button, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const useStyles = makeStyles(theme => ({
    media: {
        textAlign: "center"
    },
    title: {
        textAlign: "center",
        textTransform: "capitalize",
    }
}))

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function Card({ pokemon, index, mypokemon, listPokemon }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { releasePokemon } = useContext(GlobalContext);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deletePokemon = () => {
        releasePokemon(pokemon)
        setOpen(false)
    }

    return (
        <Grid item xs={12} sm={6} md={3} key={index}>
            {listPokemon ?
                <Link
                    to={{
                        pathname: "/detailpokemon",
                        state: { data: pokemon }
                    }}>
                    <MuiCard className={classes.media}>
                        <img
                            src={pokemon.sprites.front_default}
                        />
                        <CardContent>
                            <Typography variant="h5" gutterBottom className={classes.title}>
                                {listPokemon ? pokemon.name : pokemon.nickName}
                            </Typography>
                            <Typography variant="h5" gutterBottom className={classes.title}>
                                Total owned
                            </Typography>
                            <Typography variant="h5" gutterBottom className={classes.title}>
                                {pokemon.catched ? pokemon.catched : 0}
                            </Typography>
                        </CardContent>
                    </MuiCard>
                </Link>
                : <MuiCard className={classes.media}>
                    <img
                        src={pokemon.sprites.front_default}
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom className={classes.title}>
                            {listPokemon ? pokemon.name : pokemon.nickName}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Remove
                         </Button>
                    </CardContent>
                </MuiCard>}

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Delete Pokemon"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure delete this pokemon from you're list?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={deletePokemon} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default Card;