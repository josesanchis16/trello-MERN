import React from 'react';
import axios from 'axios';
import { isEmail } from 'validator';
import { Link } from 'react-router-dom';

import store from '../../../config/redux/store';

//Importamos los settings
import settings from '../../../config/settings';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            email: '',
            password: '',
            errorNick: '0',
            errorEmail: '0',
            errorPassword: '0',
            errorMsg: '',
            backendInfo: '',
        }
    }

    handleSubmit = async event => {
        try {
            event.preventDefault();
            await this.validateForm();

            const nick = this.state.nick;
            const email = this.state.email;
            const password = this.state.password;

            if (this.state.errorMsg.length === 0) {
                const res = await axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/signup`, {
                    nick,
                    email,
                    password
                })
                await this.setState({ backendInfo: res.data });
                if (this.state.backendInfo !== '') {
                    await localStorage.setItem('loginToken', this.state.backendInfo.tokens.filter(token => token.for === 'login')[0].token);
                    try {
                        const action = {
                            type: 'LOGINTOKEN',
                            payload: res.data
                        }
                        store.dispatch(action);
                    } catch (e) {
                        console.log(e);
                    }
                    console.log('Token Guardado');
                    this.props.history.push('/');
                } else {
                    console.log(this.state);
                }
            } else {
                console.log('mec');
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    validateForm = async () => {
        await this.validateNick();
        await this.validateEmail();
        await this.validatePassword();

        const errores = this.state.errorNick + this.state.errorEmail + this.state.errorPassword;

        switch (errores) {
            case '000':
                await this.setState({ errorMsg: '' })
                break;
            case '001':
                await this.setState({ errorMsg: 'Password is required' })
                break;
            case '002':
                await this.setState({ errorMsg: 'Password must be at least 8 characters' })
                break;
            case '010':
                await this.setState({ errorMsg: 'Email is required' })
                break;
            case '011':
                await this.setState({ errorMsg: 'Email and Password are required' })
                break;
            case '012':
                await this.setState({ errorMsg: 'Email is required and Password must be at least 8 characters' })
                break;
            case '020':
                await this.setState({ errorMsg: 'Email must be a valid Email' })
                break;
            case '021':
                await this.setState({ errorMsg: 'Email must be a valid Email and Password is required' })
                break;
            case '022':
                await this.setState({ errorMsg: 'Email must be a valid Email and Password must be at least 8 characters' })
                break;

            case '100':
                await this.setState({ errorMsg: 'Username is required' })
                break;
            case '101':
                await this.setState({ errorMsg: 'Username and Password are required' })
                break;
            case '102':
                await this.setState({ errorMsg: 'Username is required and Password must be at least 8 characters' })
                break;
            case '110':
                await this.setState({ errorMsg: 'Username and Email are required' })
                break;
            case '111':
                await this.setState({ errorMsg: 'All fields are required' })
                break;
            case '112':
                await this.setState({ errorMsg: 'Username and Email are required, and Password must be at least 8 characters' })
                break;
            case '120':
                await this.setState({ errorMsg: 'Username is required and Email must be a valid Email' })
                break;
            case '121':
                await this.setState({ errorMsg: 'Username and Password required, and Email must be a valid Email' })
                break;
            case '122':
                await this.setState({ errorMsg: 'Username is required, Email must be a valid Email and Password must be at least 8 characters' })
                break;

            case '200':
                await this.setState({ errorMsg: 'Username must be at least 2 characters' })
                break;
            case '201':
                await this.setState({ errorMsg: 'Username must be at least 2 characters and Password are required' })
                break;
            case '202':
                await this.setState({ errorMsg: 'Username must be at least 2 characters and Password 8' })
                break;
            case '210':
                await this.setState({ errorMsg: 'Username must be at least 2 characters and Email are required' })
                break;
            case '211':
                await this.setState({ errorMsg: 'Email and Password are required and Username must be at least 2 characters' })
                break;
            case '212':
                await this.setState({ errorMsg: 'Username must be at least 2 characters and Password 8. Email is required' })
                break;
            case '220':
                await this.setState({ errorMsg: 'Username must be at least 2 characters and Email must be a valid Email' })
                break;
            case '221':
                await this.setState({ errorMsg: 'Username must be at least 2 characters, Password required, and Email must be a valid Email' })
                break;
            case '222':
                await this.setState({ errorMsg: 'Username must be at least 2 characters and Password 8, Email must be a valid Email' })
                break;
            default:
                await this.setState({ errorMsg: 'Unexpected error' });
                break;
        }
    }

    validateNick = async () => {
        if (this.state.nick.length === 0) await this.setState({ errorNick: "1" });
        else if (this.state.nick.length < 2) await this.setState({ errorNick: "2" });
        else await this.setState({ errorNick: "0" })
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


    handleChange = async event => {
        await this.setState({ [event.target.name]: event.target.value })
        console.log(this.state);
    }

    render() {
        return (
            <div className="divInnerWindow">
                <div className="divTituloForm">
                    <h2>Create account in TodoNow</h2>
                </div>
                <div className="divForm">
                    <form onSubmit={this.handleSubmit}>
                        <div className="inputNick individualInput" style={{ background: this.state.errorNick === '0' ? '#eee' : '#ff7575', border: (this.state.errorNick === '0' ? 'none' : '2px solid #f00') }}>
                            <i className="fa-2x fas fa-user"></i>
                            <input type="text" name="nick" id="nick" placeholder="Username" onChange={this.handleChange} />
                        </div>
                        <div className="inputEmail individualInput" style={{ background: this.state.errorEmail === '0' ? '#eee' : '#ff7575', border: (this.state.errorEmail === '0' ? 'none' : '2px solid #f00') }}>
                            <i className="fa-2x fas fa-at"></i>
                            <input type="text" name="email" id="email" placeholder="Email" onChange={this.handleChange} />
                        </div>
                        <div className="inputPassword individualInput" style={{ background: this.state.errorPassword === '0' ? '#eee' : '#ff7575', border: (this.state.errorPassword === '0' ? 'none' : '2px solid #f00') }}>
                            <i className="fa-2x fas fa-key"></i>
                            <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />
                        </div>
                        <div className="divError">
                            {this.state.errorMsg}
                        </div>
                        <button type="submit">Create</button>
                    </form>
                    <div className="changeForm">
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;