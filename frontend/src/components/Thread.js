import React, { useEffect, useState } from 'react';
import { getTopics } from '../actions/topic.actions';
import { useDispatch, useSelector } from 'react-redux'
import Card from './Post/Card';

const Thread = (topic) => {

    const [loadTopic, setLoadTopic] = useState(true);
    const dispatch = useDispatch();
    const Topics = useSelector((state) => state.topicReducer)

    useEffect(() => {
        if(loadTopic) {
            dispatch(getTopics());
            setLoadTopic(false)
        }
    }, [loadTopic, dispatch])

    return (
    
       <div className="thread-container">
            <ul>
                {topic[0] === null && 
                    Topics.map((topic) => {
                    return <Card topic={topic} key={topic.id}/>
                 })}
            </ul>
        </div>
    );
};

export default Thread;