import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComments, editComment } from '../../actions/comment.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({ comment, topicId}) => {

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();

        if(text){
            dispatch(editComment(comment.id, text));
            setText('');
            setEdit(false);
        }
    }

    const handleDelete = () => {
        dispatch(deleteComments(comment.id))
    }

    useEffect(() => {
        const checkAuthor = () => {
            if(uid === comment.user_id){
                setIsAuthor(true);
            }
        }
        checkAuthor();
    }, [uid, comment.user_id]);

    return (
        <div className="edit-comment">
            {
                isAuthor && edit === false && (
                    <span onClick={() => setEdit(!edit)}>
                        <i className="far fa-edit" alt="edit-comment"/>
                    </span>
                )
            }
            {
                isAuthor && edit === true && (
                    <form action="" onSubmit={handleEdit} className="edit-comment-form">
                        <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>
                        <br/>
                        <input 
                            type="text" 
                            name="text" 
                            onChange={(e) => setText(e.target.value)}
                            defaultValue={comment.commentary}
                        />
                        <br/>
                        <div className="btn-delete">
                           <span onClick={() => {
                               if(window.confirm("Voulez-vous supprimer votre commentaire ?")){
                                   handleDelete();
                               }
                           }}>
                                <i className="far fa-trash-alt" alt="delete"></i>
                           </span>
                        </div>
                        <input type="submit" value="Valider les modifications"/>
                    </form>
                )
            }
        </div>
    );
};

export default EditDeleteComment;