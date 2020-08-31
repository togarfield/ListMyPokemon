import api from "./api.js";

export const ACTION_TYPES = {
    FETCH_ALL: 'FETCH_ALL',
}

export const fetchAll = () => dispatch => {
    api.pokemon().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: res.data.results
            })
        })
        .catch(err => console.log(err))
}