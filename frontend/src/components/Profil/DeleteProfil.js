import axios from 'axios';
import React, { useContext } from 'react';
import { UidContext } from '../AppContext';
import Cookies from 'universal-cookie';

const DeleteProfil = () => {

    const uid = useContext(UidContext);
    const cookies = new Cookies();

    const logout = () => {

        cookies.remove('session_id', {path: '/'})
        window.location = "/accueil"
        
    }

    const deleteProfil = () => {

        axios.delete(
            URL = `${process.env.REACT_APP_API_URL}option/${uid}`,  
        )
        logout();
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