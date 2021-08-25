import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from '../components/AppContext';

const NotFound = () => {

    const uid = useContext(UidContext);

    return (
        <div className="notFound">
            {
                uid ? (
                    <>
                        <h1>Error 404</h1>
                        <br/>
                        <p>Vous vous êtes perdu ! <br/>
                        Mais pas d'inquiétude, nous avons laissé des petits cailloux pour que vous reveniez sur vos pas.</p>
                        <NavLink exact to="/home"><p>Suivre les petits cailloux !</p></NavLink>
                    </>
                ) : (
                    <>
                        <h1>Error 404</h1>
                        <br/>
                        <p>Vous vous êtes perdu ! <br/>
                        Mais pas d'inquiétude, nous avons laissé des petits cailloux pour que vous reveniez sur vos pas.</p>
                        <NavLink exact to="/accueil"><p>Suivre les petits cailloux !</p></NavLink>
                    </>
                )
            }
            
        </div>
    );
};

export default NotFound;