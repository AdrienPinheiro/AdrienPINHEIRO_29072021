import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTopics } from '../../actions/topic.actions';

const DeleteCard = (props) => {

    const dispatch = useDispatch();

    const deleteTopic = () => {dispatch(deleteTopics(props.id))}

    return (
        <div onClick={() => {
            if (window.confirm("Voulez-vous vraiment supprimez ?"))
            deleteTopic();
        }}>
            <i class="fas fa-trash" alt="trash"></i>
        </div>
    );
};

export default DeleteCard;