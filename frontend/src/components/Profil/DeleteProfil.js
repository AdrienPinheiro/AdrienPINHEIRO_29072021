import React from 'react';
import { useDispatch } from 'react-redux';

const DeleteProfil = (id) => {

    const dispatch = useDispatch();

    const deleteProfil = () => dispatch(deleteProfil(id));

    return (

        <div className="profil-delete-btn">
            <button onClick={() => {
                if (window.confirm("Voulez-vous supprimer votre compte ?"))
                deleteProfil();
            }}>
                Supprimer mon compte
            </button>
        </div>
    );
};

export default DeleteProfil;