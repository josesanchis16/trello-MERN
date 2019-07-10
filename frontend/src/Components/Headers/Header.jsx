import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

//Importacion de componentes
import BotonesNoLogin from '../Botoneras/BotonesNoUser/BotonesNoUser';
import BotonesLogin from '../Botoneras/BotonesUser/BotonesUser';

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
                    {this.props.user ? <BotonesLogin /> : <BotonesNoLogin />}
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.loginToken
    };
};

export default connect(mapStateToProps)(Header);