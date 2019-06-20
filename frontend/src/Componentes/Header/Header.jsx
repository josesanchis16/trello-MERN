import React from 'react';

//Importacion de componentes
import Botones_no_login from '../Botoneras/Botones_no_login/Botones_no_login';

//Importacion de estilos
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="btnHome">
                    <h1>Todo Now</h1>
                </div>
                <div className="centerIcon">
                    <img src="https://img.icons8.com/color/48/000000/carpet-man.png" />
                </div>
                <div className="menuUser">
                    {/* Mostramos una cosa u otra dependiendo de si el usuario esta logueado o no */}
                    {/* Para saber esto debemos leer el token en el localhost */}
                    <Botones_no_login />
                </div>
            </header>
        )
    }
}
export default Header;