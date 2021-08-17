import { GET_TOPICS } from "../actions/topic.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOPICS:
            return action.payload;
        default:
            return state;
    }
}