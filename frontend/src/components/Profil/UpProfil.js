import React, { useState } from 'react';
import { /*useDispatch,*/ useSelector } from 'react-redux';
import axios from 'axios';


const UpProfil = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [pseudo, setPseudo] = useState('');
    const userData = useSelector((state) => state.userReducer);



    const handleUpdateProfil = async (e) => {
        e.preventDefault();  
        await axios ({
            method: "put",
            ulr: `${process.env.REACT_APP_API_URL}option/`,
            data: {
                id: userData.id,
                firstname,
                lastname,
                pseudo
            }
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

        //dispatch(updateProfil(data, userData.id));}

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