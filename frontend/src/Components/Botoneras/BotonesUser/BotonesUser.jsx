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
            user: this.props.user
        }
        console.log(this.props.user);
    }

    clickBackgroundMenu = async () => {
        await this.setState({
            menuShow: !this.state.menuShow
        })
    }

    logout = async () => {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('redux_localstorage_simple');
        await this.setState({
            user: ''
        });

        try {
            const action = {
                type: 'LOGOUTUSER',
                payload: ''
            }
            store.dispatch(action);
        } catch (e) {
            console.log(e);
        }
        console.log('mec');
    }

    render() {
        return (
            <div className="menuImagen">
                <div className="backgroundList" onClick={this.clickBackgroundMenu} style={{ 'display': this.state.menuShow ? 'block' : 'none' }}></div>
                <div className="btnImagen">
                    <img src={this.props.user.info.avatar} onClick={this.clickBackgroundMenu} alt="avatar" />
                    <div className="menuDesplegable" style={{ 'display': this.state.menuShow ? 'block' : 'none' }}>
                        <ul className="lista">
                            <li className="static">{this.props.user.nick}</li>
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
        user: state.userReducer.loginToken
    };
};

export default connect(mapStateToProps)(BotonesUser);