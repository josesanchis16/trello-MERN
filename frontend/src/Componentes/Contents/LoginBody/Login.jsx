import React from 'react';
import axios from 'axios';
import { isEmail } from 'validator';

import { Link } from 'react-router-dom';

//Importamos los settings
import settings from '../../../config/settings';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorEmail: '0',
            errorPassword: '0',
            errorMsg: '',
            backendInfo: ''
        }
    }

    handleSubmit = async event => {
        try {
            event.preventDefault();
            await this.validateForm();
            const email = this.state.email;
            const password = this.state.password;
            if (this.state.errorMsg.length === 0) {
                const res = await axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/login`, {
                    email,
                    password
                })
                this.setState({ backendInfo: res.data.info });
            }
        }
        catch (error) {
            console.error(error)
        }

    }
    validateForm = async () => {
        await this.validateEmail();
        await this.validatePassword();

        const errores = this.state.errorEmail + this.state.errorPassword;

        switch (errores) {
            case '00':
                await this.setState({ errorMsg: '' })
                break;
            case '01':
                await this.setState({ errorMsg: 'Password is required' })
                break;
            case '02':
                await this.setState({ errorMsg: 'Password must be at least 8 characters' })
                break;
            case '10':
                await this.setState({ errorMsg: 'Email is required' })
                break;
            case '11':
                await this.setState({ errorMsg: 'Email and Password are required' })
                break;
            case '12':
                await this.setState({ errorMsg: 'Email is required and Password must be at least 8 characters' })
                break;
            case '20':
                await this.setState({ errorMsg: 'Email must be a valid Email' })
                break;
            case '21':
                await this.setState({ errorMsg: 'Email must be a valid Email and Password is required' })
                break;
            case '22':
                await this.setState({ errorMsg: 'Email must be a valid Email and Password must be at least 8 characters' })
                break;
        }
    }

    validateEmail = async () => {
        if (this.state.email.length === 0) await this.setState({ errorEmail: "1" });
        else if (!isEmail(this.state.email)) await this.setState({ errorEmail: "2" });
        else await this.setState({ errorEmail: "0" })
    }

    validatePassword = async () => {
        const password = this.state.password
        if (password.length === 0) await this.setState({ errorPassword: "1" })
        else if (password.length < 8) await this.setState({ errorPassword: "2" })
        else await this.setState({ errorPassword: "0" })
    }

    handleChange = async event => await this.setState({ [event.target.name]: event.target.value })

    render() {
        return (
            <div className="bodyContent">
                <div className="divCompleteForm">
                    <div className="divTituloForm">
                        <h2>Log in to TodoNow</h2>
                    </div>
                    <div className="divForm">
                        <form onSubmit={this.handleSubmit}>
                            <div className="inputEmailOrNick individualInput" style={{ background: this.state.errorEmail === '0' ? '#eee' : '#ff7575', border: '2px solid ' + (this.state.errorEmail === '0' ? 'none' : '#f00') }} >
                                <i className="fa-2x fas fa-at"></i>
                                <input type="text" name="email" id="email" placeholder="Email" onChange={this.handleChange} />
                            </div>
                            <div className="inputPassword individualInput" style={{ background: this.state.errorPassword === '0' ? '#eee' : '#ff7575', border: '2px solid ' + (this.state.errorEmail === '0' ? 'none' : '#f00') }}>
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