import {ACTION_TYPES} from "../actions/pokemon";

const initialState = {
    list: []
}

export const pokemon = (state=initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.FETCH_ALL :
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state;
    }
}