import { DELETE_TOPIC, GET_TOPICS, UPDATE_TOPIC } from "../actions/topic.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOPICS:
            return action.payload;
        case UPDATE_TOPIC:
            return state.map((topic) => {
                if(topic.id === action.payload.topicId) {
                    return{
                        ...topic,
                        content: action.payload.content
                    };
                } else return topic;
            })
        case DELETE_TOPIC:
            return state.filter((topic) => topic.id !== action.payload.topicId)
        default:
            return state;
    }
}