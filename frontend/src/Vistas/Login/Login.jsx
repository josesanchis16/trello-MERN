import React from 'react';

//Importacion de componentes
import Header from '../../Componentes/Header/Header';
import LoginBody from '../../Componentes/Contents/LoginBody/Login';

//Importacion de estilos
import './Login.css';

class Login extends React.Component {
    render() {
        return (
            <div className="page">
                <Header />
                <LoginBody/>
            </div>
        )
    }
}

export default Login;