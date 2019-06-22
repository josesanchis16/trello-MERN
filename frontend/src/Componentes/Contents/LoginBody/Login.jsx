import React from 'react';
import axios from 'axios';
import {isEmail} from 'validator';

import { Link } from 'react-router-dom';

//Importamos los settings
import settings from '../../../config/settings';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailornick: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            errorMsg: '',
            backendInfo: ''
        }
    }

    handleSubmit = async event => {
        try {
            event.preventDefault();
            await this.validateForm();
            const emailornick = this.state.emailornick;
            const password = this.state.password;
            if (this.state.errorMsg.length === 0) {
                const res = await axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/login`, {
                    emailornick,
                    password
                })
                this.setState({ backendInfo: res.data.info });
            }
        }
        catch (error) {
            console.error(error)
        }

    }
    validateForm = () => {
        return new Promise((resolve, reject) => {
            this.validateEmail();
            this.validatePassword();

            const errores = this.state.errorEmail + this.state.errorPassword;

            switch (errores) {
                case '00':
                    this.setState({ errorMsg: '' })
                    break;
                case '01':
                    this.setState({ errorMsg: 'Password is required' })
                    break;
                case '02':
                    this.setState({ errorMsg: 'Password must be at least 8 characters' })
                    break;
                case '10':
                    this.setState({ errorMsg: 'Email is required' })
                    break;
                case '11':
                    this.setState({ errorMsg: 'Email and Password are required' })
                    break;
                case '12':
                    this.setState({ errorMsg: 'Email is required and Password must be at least 8 characters' })
                    break;
                case '20':
                    this.setState({ errorMsg: 'Email field must be a valid Email' })
                    break;
                case '21':
                    this.setState({ errorMsg: 'Email field must be a valid Email and Password is required' })
                    break;
                case '22':
                    this.setState({ errorMsg: 'Email field must be a valid Email and Password must be at least 8 characters' })
                    break;
            }
            resolve('form validado')
        })
    }

    validateEmail = () => {
        if (this.state.emailornick.length === 0) this.setState({ errorEmail: "1" });
        else if (!isEmail(this.state.emailornick)) this.setState({ errorEmail: "2" });
        else this.setState({ errorEmail: "0" })
    }

    validatePassword = () => {
        const password = this.state.password
        if (password.length === 0) this.setState({ errorPassword: "1" })
        else if (password.length < 8) this.setState({ errorPassword: "2" })
        else this.setState({ errorPassword: "0" })
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value })

    render() {
        return (
            <div className="bodyContent">
                <div className="divCompleteForm">
                    <div className="divTituloForm">
                        <h2>Log in to TodoNow</h2>
                    </div>
                    <div className="divForm">
                        <form onSubmit={this.handleSubmit}>
                            <div className="inputEmailOrNick individualInput">
                                <i className="fa-2x fas fa-at"></i>
                                <input type="text" name="emailornick" id="emailornick" placeholder="Email or Username" onChange={this.handleChange} />
                            </div>
                            <div className="inputPassword individualInput">
                                <i className="fa-2x fas fa-key"></i>
                                <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />
                            </div>
                            <div className="divError">
                                {this.state.errorMsg}
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