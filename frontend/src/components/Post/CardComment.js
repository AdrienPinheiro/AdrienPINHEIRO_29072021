import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../../actions/comment.actions';
import { getTopics } from '../../actions/topic.actions';
import { UidContext } from '../AppContext';
import { dateParser, isEmpty } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

const CardComment = ({topic}) => {

    const [text, setText] = useState("");

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const comment = useSelector((state) => state.commentReducer);

    const uid = useContext(UidContext);

    const dispatch = useDispatch();

    const handleComment = () => {
        if(text) {
            dispatch(addComment(topic.id, uid, text))
                .then(() => dispatch(getTopics()))
                .then(() => setText(""))
        }
    }

    useEffect(() => {
        dispatch(getComments(topic.id));
    }, [topic.id, dispatch])
    

    return (
        <div className="comments-container">
            {!isEmpty(comment[0]) &&
                comment.map((comment) => {
                return (
                    <div className={comment.user_id === userData.id ?
                    "comment-container client" : "comment-container"} key= {comment.id}>
                        <div className="left-part">
                            <p>{
                                !isEmpty(usersData[0]) &&
                                usersData
                                    .map((user) => {
                                    if(user.id === comment.user_id) return user.pseudo
                                    else return null
                                }).join('')
                            }</p>
                            <span>{dateParser(comment.createdAt)}</span>
                        </div>
                        <div className="right-part">
                            <div className="comment">
                                <p>{comment.commentary}</p>
                                <EditDeleteComment comment={comment} topicId={topic}/>
                            </div>
                        </div>
                    </div> 
                )})}
                {
                userData.id && (
                    <form action="" onSubmit={handleComment} className="comment-form">
                        <input 
                            type="text" 
                            name="text" 
                            onChange={(e) => setText(e.target.value)} 
                            value={text}
                            placeholder="Laisser un commentaire"
                        />
                        <br/>
                        <input
                            type="submit"
                            value="Envoyer"
                        />
                    </form>
                )
            }
        </div>
    );
};

export default CardComment;