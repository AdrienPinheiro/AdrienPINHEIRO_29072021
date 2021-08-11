import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Logout = () => {

    const cookies = new Cookies();

    const logout = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}me/logout`
        })
        .then(() => cookies.remove('session_id'))
        .catch(err => console.log(err))

        window.location = "/accueil"
    }
    return (
        <li onClick={logout} className="deconnexion">
            <p>Déconnexion</p>
        </li>
    );
};

export default Logout;