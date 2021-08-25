import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import topicReducer from "./topic.reducer";
import commentReducer from "./comment.reducer"

export default combineReducers({
    userReducer, usersReducer, topicReducer, commentReducer
});