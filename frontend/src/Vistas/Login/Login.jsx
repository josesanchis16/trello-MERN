import React from 'react';

//Importacion de componentes
import Header from '../../Componentes/Headers/HeaderFrom/Header';
import LoginBody from '../../Componentes/Contents/LoginBody/Login';

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