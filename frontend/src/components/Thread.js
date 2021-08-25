import React, { useEffect, useState } from 'react';
import { getTopics } from '../actions/topic.actions';
import { useDispatch, useSelector } from 'react-redux'
import Card from './Post/Card';
import { isEmpty } from './Utils';

const Thread = () => {

    const [loadTopic, setLoadTopic] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const topics = useSelector((state) => state.topicReducer)

    const loadMore = () => {
        if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
            setLoadTopic(true);
        }
    }

    useEffect(() => {
        if(loadTopic) {
            dispatch(getTopics(count));
            setLoadTopic(false);
            setCount(count + 5);
        }
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadTopic, dispatch, count])

    return (
    
       <div className="thread-container">
            <ul>
                {!isEmpty(topics[0]) && 
                    topics.map((topic) => {
                    return <Card topic={topic} key={topic.id}/>
                 })}
            </ul>
        </div>
    );
};

export default Thread;