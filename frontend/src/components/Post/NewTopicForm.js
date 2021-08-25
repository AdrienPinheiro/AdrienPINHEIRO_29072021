import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addTopic, getTopics } from '../../actions/topic.actions';
import { isEmpty, timestampParser } from '../Utils';

const NewTopicForm = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('');
    const [topicPicture, setTopicPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState('');
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    const handleTopic = async () => {
        if(message || topicPicture || video) {
            const data = new FormData();
            data.append('user_id', userData.id);
            data.append('title', title);
            data.append('content', message);
            if(file){
                data.append('image', file);
            }
            data.append('video', video);

            await dispatch(addTopic(data));
            dispatch(getTopics());
            cancelTopic();
        } else {
            alert("Veuillez entrer un message !")
        }
    }

    const handlePicture = (e) => {
        setTopicPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo('');
    }

    const cancelTopic = () => {
        setTitle('');
        setMessage('');
        setTopicPicture('');
        setVideo('');
        setFile('');
    }

    useEffect(() => {
        if(!isEmpty(userData)){
            setIsLoading(false);
        }

        const handleVideo = () => {
            let findLink = message.split(" ");
            for ( let i = 0; i < findLink.length; i++) {
                if(findLink[i].includes("https://www.yout") || findLink[i].includes("https://yout")){
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    setVideo(embed.split("&")[0]);
                    findLink.splice(i, 1);
                    setMessage(findLink.join(" "));
                    setTopicPicture('');
                }
            }
        };

        handleVideo();
    }, [userData, message, video])

    return (
        <div className="topic-container">
            {
                isLoading ? (
                    <i class="fas fa-spinner fa-pulse"/>
                ) : (
                    <>  
                        <div className="topic-form">
                            <textarea
                                name="title"
                                id="title"
                                placeholder="Titre"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <br/>
                            <textarea 
                                name="message"
                                id="message"
                                placeholder="Contenue de votre message"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                            />
                            <div className="footer-form">
                                {
                                    isEmpty(video) && (
                                        <>
                                            <i class="fas fa-images" alt="image"/>
                                            <input 
                                                type="file" 
                                                id="file-upload"
                                                name="file" 
                                                accept=".jpg , .jpeg , png" 
                                                onChange={(e) => handlePicture(e)}
                                            />

                                        </>
                                    )
                                }
                                {video && (
                                    <button onClick={() => setVideo('')}>Supprimer la vidéo</button>
                                )}
                            </div>
                            <div className="btn-send">
                                {
                                    title || message || topicPicture || video.length > 10 ? (
                                        <button className="cancel" onClick={cancelTopic}>Annuler le post</button>
                                    ) : null
                                }
                                <button className="send" onClick={handleTopic}>Envoyer</button>
                            </div>
                            {title || message || topicPicture || video.length > 10 ? (
                                <li className="card-container">
                                    <div className="card-left">
                                        <h3>{userData.pseudo}</h3>
                                    </div>
                                    <div className="card-right">
                                        <div className="card-header">
                                            <div className="title">
                                                <h3>{title}</h3>
                                            </div>
                                            <span>{timestampParser(Date.now())}</span>
                                        </div>
                                            <p>{message}</p>
                                            <img src={topicPicture} alt="" className="picture"/>
                                            {video && (
                                            <iframe
                                                src={video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}
                                            ></iframe>
                                            )}
                                    </div>
                                </li>
                            ) : null}
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default NewTopicForm;

