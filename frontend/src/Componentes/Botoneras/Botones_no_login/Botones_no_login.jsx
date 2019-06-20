import React from 'react';
import {Link} from 'react-router-dom';

//Importacion de los estilos
import './Botones_no_login.css';

class Botones_no_login extends React.Component {
    render() {
        return (
            <div className="divButtons">
                <div>
                    <p className="btnLogin divButton">
                        <Link className="button" to="/login">Log in</Link>
                    </p>
                    <p className="btnLogin divButton">
                        <Link className="button" to="/signup">Sign up</Link>
                    </p>
                </div>
                <div></div>
            </div>
        )
    }
}

export default Botones_no_login;