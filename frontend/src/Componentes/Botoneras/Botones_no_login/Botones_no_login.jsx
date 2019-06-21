import React from 'react';
import { Link } from 'react-router-dom';

//Importacion de los estilos
import './Botones_no_login.css';

class Botones_no_login extends React.Component {
    render() {
        return (
            <div className="divButtons">
                <div>
                    <Link className="button" to="/login"><p className="btnLogin divButton">Log in</p></Link>
                </div>
            </div>
        )
    }
}

export default Botones_no_login;