import React from 'react';
import { connect } from 'react-redux'

//Traemos la store
import store from '../../../config/redux/store';
//Importamos los estilos
import './BotonesUser.css';


class BotonesUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuShow: false,
        }
    }

    clickBackgroundMenu = async () => {
        await this.setState({
            menuShow: !this.state.menuShow
        })
    }

    logout = async () => {
        await localStorage.removeItem('loginToken');
        try {
            const action = {
                type: 'LOGOUTUSER',
                payload: ''
            }
            await store.dispatch(action);
            this.props.history.push('/');
        } catch (e) {
            console.log('Error al hacer el logout: ' + e);
        }
    }

    render() {
        return (
            <div className="menuImagen">
                <div className="backgroundList" onClick={this.clickBackgroundMenu} style={{ 'display': this.state.menuShow ? 'block' : 'none' }}></div>
                <div className="btnImagen">
                    <img src={this.props.user.loginToken.info.avatar} onClick={this.clickBackgroundMenu} alt="avatar" />
                    <div className="menuDesplegable" style={{ 'display': this.state.menuShow ? 'block' : 'none' }}>
                        <ul className="lista">
                            <li className="static">{this.props.user.loginToken.nick}</li>
                            <hr />
                            <li className="btnPerfil btn">Profile</li>
                            <hr />
                            <li onClick={this.logout} className="btnLogout btn">Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    };
};

export default connect(mapStateToProps)(BotonesUser);