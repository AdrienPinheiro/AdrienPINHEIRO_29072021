import React ,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTopic } from '../../actions/topic.actions';
import { dateParser, isEmpty } from '../Utils';
import CardComment from './CardComment';
import DeleteCard from './DeleteCard';
import EventBus from '../EventBus';


const Card = ({topic}) => {

   const [isLoading, setIsLoading] = useState(true);
   const [isUpdated, setIsUpdated] = useState(false);
   const [textUpdate, setTextUpdate] = useState(null);
   const [showComments, setShowComments] = useState(false);
   const usersData = useSelector((state) => state.usersReducer);
   const userData = useSelector((state) => state.userReducer);
   const dispatch = useDispatch();

   const updateItem = async () => {
    if(textUpdate) {
        dispatch(updateTopic(topic.id, textUpdate))
    }
    setIsUpdated(false);
   }

   const commentReact = () => {
    setShowComments(!showComments); 
    EventBus.emit("closeComment", {topicId: topic.id});
   }

   useEffect(() => {
       !isEmpty(usersData[0]) && setIsLoading(false);

       EventBus.on("closeComment", data =>{
        if(data.topicId !== topic.id){
            setShowComments(false);
        }
    });
   }, [usersData, topic.id])

    return (        
        <li className="card-container" key={topic.id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin" alt="loading"></i>
            ) : (
                <>
                    <div className="card">
                        <div className="card-header">
                            <div className="pseudo">
                                {
                                    !isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                        if(user.id === topic.user_id) return user.pseudo
                                        else return null
                                    }).join('')
                                }
                            </div>
                            <div className="title-date">
                                <h3>
                                    {
                                        !isEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                            if(user.id === topic.user_id) return topic.title
                                            else return null
                                        }).join('')
                                    }
                                </h3>
                                <span>{dateParser(topic.createdAt)}</span>
                            </div>
                        </div>
                        {topic.image && <img src={`uploads/post/${topic.image}`} alt="card-img" className="card-img"/>}
                        {topic.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={topic.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={topic.id}
                            ></iframe>
                        )}
                        {
                            isUpdated === false && <p>{topic.content}</p>
                        }
                        {
                            isUpdated && (
                                <div className="update-topic">
                                    <textarea
                                        defaultValue={topic.content}
                                        onChange={(e) => setTextUpdate(e.target.value)}
                                    />
                                    <div className="btn-container">
                                        <button className="btn" onClick={updateItem}>
                                            Valider les modifications
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        {userData.id === topic.user_id && (
                            <div className="btn-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <i className="far fa-edit" alt="edit"/>
                                </div>
                                <DeleteCard id={topic.id}/>
                            </div>  
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <i onClick={() => commentReact()} className="far fa-comment-dots" alt="comments"/>
                            </div>
                            <i className="fas fa-share" alt="share"/>
                        </div>
                        {
                            showComments && <CardComment topic={topic}/>
                        }
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;

// <span>{topic.comments.length}</span>