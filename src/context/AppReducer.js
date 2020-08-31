export default (state, action) => {
    switch (action.type) {
        case 'GET_POKEMON':
            return {
                ...state,
                pokemons: [...state.pokemons, ...action.payload]
            };
        case 'CATCH_POKEMON': {
            const pokeIdx = state.pokemons.findIndex((x) => x.id === action.payload.id);
            const newPokemon = [...state.mypokemon, action.payload]
            if (pokeIdx > -1) {
                state.pokemons[pokeIdx].catched = state.pokemons[pokeIdx].catched ? state.pokemons[pokeIdx].catched + 1 : 1;
            }
            return {
                ...state,
                mypokemon: newPokemon,
                pokemons: state.pokemons
            };
        }
        case 'RELEASE_POKEMON':{
            const pokeIdx = state.pokemons.findIndex((x) => x.id === action.payload.id);
            if (pokeIdx > -1) {
                state.pokemons[pokeIdx].catched = state.pokemons[pokeIdx].catched ? state.pokemons[pokeIdx].catched - 1 : 0;
            }
            return {
                ...state,
                mypokemon: state.mypokemon.filter((x) => 
                {
                    if (action.payload.nickName !== x.nickName) {
                        return x
                    }
                })
            };
        }
        default: return state;
    }
}