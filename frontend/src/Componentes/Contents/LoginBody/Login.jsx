import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <div className="bodyContent">
                <div className="divCompleteForm">
                    <div className="divTituloForm">
                        <h2>Log in to TodoNow</h2>
                    </div>
                    <div className="divForm">
                        <form action="login" method="POST">
                            <div className="inputEmailOrNick individualInput">
                                <i className="fa-2x fas fa-at"></i>
                                <input type="text" name="emailornick" id="emailornick" placeholder="Email or Username" />
                            </div>
                            <div className="inputPassword individualInput">
                                <i className="fa-2x fas fa-key"></i>
                                <input type="password" name="password" id="password" placeholder="Password" />
                            </div>
                            <div className="divError">
                                All fields must be filled
                            </div>
                            <button type="submit">Log in</button>
                        </form>
                        <div className="changeForm">
                            <p>New to TodoNow? <Link to="/signup">Create new account</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;