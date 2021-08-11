import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Accueil from '../../pages/Accueil';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Option from '../../pages/Option';
import SignUpAndIn from '../../pages/SignUpAndIn';
import Navbar from '../Navbar';

const index = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route path="/accueil" component={Accueil}/>
                <Route path="/log-and-sign" component={SignUpAndIn}/>
                <Route path="/home" component={Home}/>
                <Route path="/option" component={Option}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
};

export default index;