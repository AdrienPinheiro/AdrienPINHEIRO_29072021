import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
import { useSelector } from 'react-redux'

const Navbar = () => {

    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer)


    return (
        <nav>
            <div className="nav-container">
                {uid ? (
                    <div className="connected">
                        <div className="logo">
                            <NavLink exact to="home">
                                <div className="logo-img">
                                    <img src="./img/logo-simple-color.png" alt="logo"/>
                                </div>
                            </NavLink>
                        </div>
                        <ul className="connected-menu">
                            <li className="welcome">
                                <NavLink exact to="/home">
                                    <p>Bienvenue {userData.pseudo}</p>
                                </NavLink>
                            </li>
                            <li className="option">
                                <NavLink exact to="/option">
                                    <p>Options</p>
                                </NavLink>
                            </li>
                            <Logout/>
                        </ul>
                    </div>
                ) : (
                    <div className="no-connected">
                        <div className="logo">
                            <NavLink exact to="accueil">
                                <div className="logo-img">
                                    <img src="./img/logo-simple-dark.png" alt="logo"/>
                                </div>
                            </NavLink>
                        </div>
                        <ul  className="no-connected-menu">
                            <li>
                                <NavLink exact to="/log-and-sign" className="accueil-btn">S'incrire / Se connecter</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;