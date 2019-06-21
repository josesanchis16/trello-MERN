import React from 'react';

//Importacion de componentes
import Header from '../../Componentes/Headers/HeaderFrom/Header';
import RegisterBody from '../../Componentes/Contents/RegisterBody/Register';

class Login extends React.Component {
    render() {
        return (
            <div className="page">
                <Header />
                <RegisterBody />
            </div>
        )
    }
}

export default Login;