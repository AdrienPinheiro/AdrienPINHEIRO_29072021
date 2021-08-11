import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="notFound">
            <h1>Error 404</h1>
            <br/>
            <p>Vous vous êtes perdu ! <br/>
            Mais pas d'inquiétude, nous avons laissé des petits cailloux pour que vous reveniez sur vos pas.</p>
            <NavLink exact to="/accueil"><p>Suivre les petits cailloux !</p></NavLink>
        </div>
    );
};

export default NotFound;