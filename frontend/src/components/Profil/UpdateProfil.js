import React from 'react';
import { useSelector } from 'react-redux';
import DeleteProfil from './DeleteProfil';
import UpProfil from './UpProfil';

const UpdateProfil = () => {

    const userData = useSelector((state) => state.userReducer)

    return (
        <div className="profil-container">
            <div className="profil-img">  
                <img src="" alt=""/>
                <h1>Profil de {userData.firstname} {userData.lastname}</h1>
                <h3>contact: {userData.email}</h3>
            </div>
            <div className="profil-bio">
                 <UpProfil/>               
            </div>
            <div className="profil-delete">
                <DeleteProfil/>
            </div>
        </div>
    );
};

export default UpdateProfil;