import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComments } from '../../actions/comment.actions';

const DeleteCard = (props) => {

    const dispatch = useDispatch();

    const deleteComment = () => {dispatch(deleteComments(props.id))}

    return (
        <div onClick={() => {
            if (window.confirm("Voulez-vous vraiment supprimez ?"))
            deleteComment();
        }}>
            <i className="fas fa-trash" alt="trash"></i>
        </div>
    );
};

export default DeleteCard;