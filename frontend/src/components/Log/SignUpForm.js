import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.email.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if(password !== controlPassword || !terms.checked){
            if(password !== controlPassword){
                passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
            }
            if(!terms.checked){
                termsError.innerHTML = "Veuillez valider les conditions générales";
            }
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}signup`,
                data: {
                    firstname,
                    lastname,
                    pseudo,
                    email,
                    password
                }
            })
                .then(res => {
                    console.log(res);
                    if(res.data.errors){
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm/>
                    <h4 className="success">Enregistrement réussi, veuillez vous connecter</h4>
                </>
            ): ( 
        <form action="" onSubmit={handleRegister} id="signUpForm">
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
            <div className="pseudo error"></div>
            <br/>
            <label htmlFor="email">Email</label>
            <br/>
            <input 
                type="text" 
                name="email" 
                id="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
            />
            <div className="email error"></div>
            <br/>
            <label htmlFor="password">Mot de passe</label>
            <br/>
            <input 
                type="password" 
                name="password" 
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password error"></div>
            <br/>
            <label htmlFor="password-confirm">Confirmer le mot de passe</label>
            <br/>
            <input
                type="password"
                name="password-confirm"
                id="password-confirm"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br/>
            <input type="checkbox" id="terms"/>
            <label htmlFor="terms">J'accepte les <a href="*" target="_blank" rel="noopener noreferrer">conditions générales d'utilisation</a></label>
            <div className="terms error"></div>
            <br/>
            <input type="submit" value="S'inscrire"/>
        </form>
        )}
        </>
    );
};

export default SignUpForm;