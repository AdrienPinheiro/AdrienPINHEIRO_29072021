import Cookies from 'universal-cookie';

const Logout = () => {

    const cookies = new Cookies();

    const logout = () => {

        cookies.remove('session_id', {path: '/'})
        window.location = "/accueil"
        
    }
    
    return (
        <>
            <li onClick={logout} className="deconnexion">
                <p>Déconnexion</p>
            </li>
        </>
    );
};

export default Logout;