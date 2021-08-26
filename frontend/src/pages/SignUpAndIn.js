import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import { NavLink } from 'react-router-dom';
import Log from '../components/Log'

const SignUpAndIn = () => {
    const uid = useContext(UidContext);

    return (
        <div className="logs">
            <div className="logs-header">
            <NavLink exact to="/accueil" className="logs-btn"><i className="fas fa-arrow-left" alt="back"></i></NavLink>
            </div>
            {uid ? (
                <h1>Update PAGE</h1>
            ) : (
            <div className="logs-page">
                <div className="logs-container">
                    <Log className="logs-menu" login={false} signup={true}/>
                </div>
            </div>
            )}
        </div>
    );
};

export default SignUpAndIn;