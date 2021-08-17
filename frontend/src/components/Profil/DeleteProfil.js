import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import Logout from '../Log/Logout';

const DeleteProfil = () => {

    const userData = useSelector((state) => state.userReducer)

    const deleteProfil = () => {

        axios({
            method: "delete",
            ulr: `${process.env.REACT_APP_API_URL}option/`,
            data: {
                id: userData.id
            }
        })
            .then(() => Logout())
            .catch((err) => console.log(err));
    }

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