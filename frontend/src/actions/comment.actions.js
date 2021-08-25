import axios from "axios";

// Comments

export const GET_COMMENTS = "GET-COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";



export const getComments = (topicId) => {
    return (dispatch) => {
        return axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}comment/${topicId}`
        })
            .then((res) => {
                dispatch({type: GET_COMMENTS, payload: res.data})
            })
            .catch(err => console.log(err))
    }
}

export const deleteComments = (commentId) => {
    return (dispatch) => {
        return axios ({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}comment/${commentId}`
        })
        .then((res) => {
            dispatch({type: DELETE_COMMENT, payload: {commentId}});
        })
        .catch((err) => console.log(err));
    }
}

export const addComment = (post_id, userId, commentary) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}comment/${userId}`,
            data: {
                post_id,
                commentary
            }
        })
        .then((res) => {
            dispatch({type: ADD_COMMENT, payload: {post_id}})
        })
        .catch((err) => console.log(err))
    }
}

export const editComment = (commentId, commentary) => {
    return (dispatch) => {
        return axios ({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}comment/${commentId}`,
            data: {
                commentary
            }
        })
        .then((res) => {
            dispatch({type: EDIT_COMMENT, payload: {commentary, commentId}});
        })
        .catch((err) => console.log(err));
    }
}