import React from 'react';

//Importacion de componentes
import Header from '../../Components/Headers/Header';
import LoginForm from '../../Components/Contents/LoginForm/Login';

class Login extends React.Component {
    render() {
        return (
            <div className="page">
                <Header />
                <div className="bodyContent">
                    <LoginForm />
                </div>
            </div>
        )
    }
}

export default Login;