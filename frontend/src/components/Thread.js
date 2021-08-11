import React, { useEffect, useState } from 'react';
import { getPosts } from '../actions/post.actions';
import { useDispatch /*useSelector*/ } from 'react-redux'
//import Card from './Post/Card';

const Thread = () => {

    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    //const posts = useSelector((state) => state.postReducer)

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])

    return (
        <div>
            
        </div>
       /* <div className="thread-container">
            <ul>
                {post[0] === null && 
                    posts.map((post) => {
                    return <Card post={post} key={post.id}/>
                 })}
            </ul>
        </div>*/
    );
};

export default Thread;