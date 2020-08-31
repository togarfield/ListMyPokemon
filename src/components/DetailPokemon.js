import React, { useState, useContext } from 'react'
import { Grid, Card as MuiCard, CardContent, Typography, makeStyles, Button, Modal, FormControl, Input, OutlinedInput, InputLabel } from '@material-ui/core'
import { GlobalContext } from '../context/GlobalState';
import typeColors from '../utils/typeColors';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function DetailPokemon(data) {
    const useStyles = makeStyles(theme => ({
        root: {
            justifyContent: "center",
            display: 'flex',
            padding: 20,
            paddingTop: 80
        },
        media: {
            textAlign: "center",
        },
        title: {
            textTransform: "capitalize",
            marginBottom: '20px'
        },
        secondTitle: {
            fontSize: 14,
            marginTop: 16
        },
        type: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            borderRadius: '4px',
            color: "#000",
            textTransform: "capitalize",
        },
        types: {
            display: 'flex',
            justifyContent: 'center',
        },
        paper: {
            position: 'absolute',
            width: 400,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }))
    let detailPokemon = data.location.state.data;
    const [nickName, setNickName] = useState('');
    const { catchPokemon, mypokemon } = useContext(GlobalContext);
    const [number, setNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (val) => {
        setNickName(val.target.value);
    }

    const textModal = () => {
        return (
            <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Congratulations!</h2>
                <p id="simple-modal-description">
                    You got a pokemon!
                </p>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="component-outlined" error={!nickName}>Nickname</InputLabel>
                    <OutlinedInput id="component-outlined" value={nickName} onChange={handleChange} label="Nickname" />
                </FormControl>
                <Button variant="contained" color="primary" onClick={() => { goBack() }} style={{ marginTop: 20, textTransform: "capitalize", }}>
                    Set Nickname
                </Button>
            </div>
        );
    }


    const randomNumber = () => {
        const min = 1;
        const max = 100;
        const random = min + Math.random() * (max - min);
        setNumber(random);
        if (random >= 50) {
            handleOpen();
        } else {
            alert('Sorry, maybe next time!')
        }
    }

    const goBack = () => {
        const exist = mypokemon.findIndex((x) =>
            x.nickName === nickName)
        if (nickName && exist < 0) {
            const newPokemon = {
                id: detailPokemon.id,
                nickName: nickName,
                sprites: detailPokemon.sprites
            }
            catchPokemon(newPokemon);
            data.history.goBack();
        } else {
            alert("Yang laen!!")
        }
    }
    return (
        <div className={classes.root}>
            <Grid item xs={12} sm={6} md={3} >
                <MuiCard className={classes.media}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div>
                            {textModal()}
                        </div>
                    </Modal>
                    <img
                        src={detailPokemon.sprites.front_default}
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom className={classes.title}>
                            {detailPokemon.name}
                        </Typography>

                        <div className={classes.types}>
                            {
                                detailPokemon.types.map(types => {
                                    return <Typography className={classes.type} style={{ backgroundColor: typeColors[types.type.name] }}>
                                        {types.type.name}
                                    </Typography>
                                })
                            }
                        </div>

                        <Typography className={classes.secondTitle} color="textSecondary" component="h2" gutterBottom>
                            Ability
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title}>
                            {detailPokemon.abilities[0].ability.name}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={randomNumber}
                        >
                            Catch!
                        </Button>
                    </CardContent>
                </MuiCard>
            </Grid>
        </div>
    )
}

export default DetailPokemon;