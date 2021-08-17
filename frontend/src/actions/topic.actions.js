import axios from "axios";

// Posts

export const GET_TOPICS = "GET_TOPICS";

export const getTopics= () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}topic`)
            .then((res) => {
                dispatch({type: GET_TOPICS, payload: res.data})
            })
            .catch(err => console.log(err))
    }
}