import React from 'react';
import {Link} from 'react-router-dom'

//Importacion de componentes
import BotonesNoLogin from '../Botoneras/BotonesNoUser/BotonesNoUser';

//Importacion de estilos
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="btnHome">
                    <Link to="/"><h1>TodoNow</h1></Link>
                </div>
                <div className="centerIcon">
                    <img src="https://img.icons8.com/color/48/000000/carpet-man.png" alt="icon" />
                </div>
                <div className="menuUser">
                    {/* Mostramos una cosa u otra dependiendo de si el usuario esta logueado o no */}
                    {/* Para saber esto debemos leer el token en el localhost */}
                    <BotonesNoLogin />
                </div>
            </header>
        )
    }
}
export default Header;