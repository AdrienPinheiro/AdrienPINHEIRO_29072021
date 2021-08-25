import React, { useContext/*, useEffect*/, useState } from 'react';
import { UidContext } from "../AppContext";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import { useDispatch } from 'react-redux';
import { likeTopic, unLikeTopic } from '../../actions/topic.actions';

const LikeButton = ({topic}) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext)
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likeTopic(topic.id, uid))
        setLiked(true);
    }

    const unLike = () => {
        dispatch(unLikeTopic(topic.id, uid))
        setLiked(false);
    }

    /*useEffect(() => {
        if (topic.likes.includes(uid)){
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [uid, topic.likes, liked])*/

    return (
        <div className="like-container">
            {
                uid === null && (
                <Popup trigger={<i class="far fa-thumbs-up" alt="like"/>} position={['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick>
                    <div>Connectez-vous pour aimer un post !</div>
                </Popup> )
            }
            {
                uid && liked === false && (
                    <i class="far fa-thumbs-up" alt="like" onClick={like}/>
                )
            }
            {
                uid && liked && (
                    <i class="fas fa-thumbs-up" alt="unLike" onClick={unLike}/>
                )
            }
            <span>{topic.likes}</span>
        </div>
    );
};

export default LikeButton;