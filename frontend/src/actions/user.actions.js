import axios from 'axios';


export const GET_USER = "GET_USER";


export const getUser = (uid) => {
    return (dispatch) => {
        return axios ({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}id`,
            data: {id: uid}
        })
            .then((res) => {
                dispatch({type: GET_USER, payload: res.data.user})
            })
            .catch((err) => console.log(err));
    }
};
