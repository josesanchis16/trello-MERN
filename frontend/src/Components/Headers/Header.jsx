import React from 'react';
import { Link } from 'react-router-dom'

//Importamos los settings
import settings from '../../config/settings';

//Importacion de componentes
import BotonesNoLogin from '../Botoneras/BotonesNoUser/BotonesNoUser';
import BotonesLogin from '../Botoneras/BotonesUser/BotonesUser';

//Importacion de estilos
import './Header.css';
import axios from 'axios';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    async componentDidMount() {
        let userToken = localStorage.getItem('loginToken');
        let user = await axios.get(`${settings.backend.host_backend}${settings.backend.port_backend}/getUserFromToken/${userToken}`);
        await this.setState({
            user: user
        })
        console.log('Esto es el usuario: ' + user);
    }

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
                    {this.state.user ? <BotonesLogin user={this.state.user} /> : <BotonesNoLogin />}
                </div>
            </header>
        )
    }
}
export default Header;