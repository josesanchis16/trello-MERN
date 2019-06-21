import React from 'react';
import { Link } from 'react-router-dom'

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
            </header>
        )
    }
}
export default Header;