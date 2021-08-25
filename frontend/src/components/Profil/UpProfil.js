import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UidContext } from '../AppContext';


const UpProfil = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [pseudo, setPseudo] = useState('');
    const uid = useContext(UidContext);



    const handleUpdateProfil = () => {

        const data = {}
        
        if(pseudo.length>0){
            data.pseudo = pseudo
        } 

        if(firstname.length>0){
            data.firstname = firstname
        }

        if(lastname.length>0){
            data.lastname = lastname
        }

        if(Object.keys(data).length > 0){
            axios.put(
                URL = `${process.env.REACT_APP_API_URL}option/${uid}`, data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        }
}

    return (
        <div className="profil-form">
            <form action="" onSubmit={handleUpdateProfil} id="update-profil">
                <label htmlFor="firstname">Prénom</label>
                <br/>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                />
                <br/>
                <label htmlFor="lastname">Nom</label>
                <br/>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                />
                <br/>
                <label htmlFor="pseudo">Pseudo</label>
                <br/>
                <input
                    type="text"
                    name="pseudo"
                    id="pseudo"
                    onChange={(e) => setPseudo(e.target.value)}
                    value={pseudo}
                />
                <br/>
                <input type="submit" value="Modifier"/> 
            </form>           
        </div>
    );
};

export default UpProfil;