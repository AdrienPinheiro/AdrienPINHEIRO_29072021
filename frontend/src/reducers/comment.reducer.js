import { EDIT_COMMENT, GET_COMMENTS } from "../actions/comment.actions";
import { DELETE_COMMENT } from "../actions/comment.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
    switch(action.type) {
        case GET_COMMENTS:
            return action.payload;
        case DELETE_COMMENT:
            return state.filter((comment) => comment.id !== action.payload.commentId)
        case EDIT_COMMENT:
            return state.map((comment) => {
                if(comment.id === action.payload.commentId) {
                    return{
                        ...comment,
                        commentary: action.payload.commentary
                    };
                } else return comment;
            })
        default:
            return state;
    }
}