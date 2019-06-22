import React from 'react';
import { Link } from 'react-router-dom';

//Importamos los settings
import settings from '../../../config/settings';

class Login extends React.Component {
    render() {
        return (
            <div className="bodyContent">
                <div className="divCompleteForm">
                    <div className="divTituloForm">
                        <h2>Create account in TodoNow</h2>
                    </div>
                    <div className="divForm">
                        <form action={`${settings.backend.host_backend}${settings.backend.port_backend}/signup`} method="POST">
                            <div className="inputNick individualInput">
                                <i className="fa-2x fas fa-user"></i>
                                <input type="text" name="nick" id="nick" placeholder="Username" />
                            </div>
                            <div className="inputEmail individualInput">
                                <i className="fa-2x fas fa-at"></i>
                                <input type="text" name="email" id="email" placeholder="Email" />
                            </div>
                            <div className="inputPassword individualInput">
                                <i className="fa-2x fas fa-key"></i>
                                <input type="password" name="password" id="password" placeholder="Password" />
                            </div>
                            <div className="divError">
                                All fields must be filled
                            </div>
                            <button type="submit">Create</button>
                        </form>
                        <div className="changeForm">
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;