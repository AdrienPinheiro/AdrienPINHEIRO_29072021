import React from 'react';
import { useSelector } from 'react-redux';

const Profil = () => {

    const userData = useSelector((state) => state.userReducer);

    return (
        <div className="profil">
            <p>{userData.user_img}</p>
            <p>{userData.pseudo}</p>
            
        </div>
    );
};

export default Profil;