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

export const modifyUser = (data) => {
    return (dispatch) => {
        return axios ({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}option/`,
            data: {
                id: data.uid,
                firstname: data.firstname,
                lastname: data.lastname,
                pseudo: data.pseudo
            }
        })
            .then((res) => {
                dispatch({type: GET_USER, payload: res.data.user})
            })
            .catch((err) => console.log(err));
    }
}
