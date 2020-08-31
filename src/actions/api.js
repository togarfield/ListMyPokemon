import axios from "axios";

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

export default {
    pokemon() {
        return {
            fetchAll: () => axios.get(baseUrl)
        }
    }
}