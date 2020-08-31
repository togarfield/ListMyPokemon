import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'
import { getAllPokemon, getPokemon } from '../services/pokemon';

const initialState = {
    pokemons: [],
    mypokemon: []
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function fetchPokemon() {
        if (state.pokemons.length === 0) {
            const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
            const pokemons = await getAllPokemon(baseUrl);
            let pokemonData = await Promise.all(pokemons.results.map(async pokemon => {
                let pokemonRecord = await getPokemon(pokemon.url);
                return pokemonRecord
            }))
            await dispatch({
                type: 'GET_POKEMON',
                payload: pokemonData
            });
        }
    };

    function catchPokemon(poke) {
        dispatch({
            type: 'CATCH_POKEMON',
            payload: poke
        });
    };

    function releasePokemon(poke) {
        dispatch({
            type: 'RELEASE_POKEMON',
            payload: poke
        })
    }

    return (<GlobalContext.Provider value={{
        pokemons: state.pokemons,
        mypokemon: state.mypokemon,
        fetchPokemon,
        catchPokemon,
        releasePokemon
    }}>
        {children}
    </GlobalContext.Provider>);
}