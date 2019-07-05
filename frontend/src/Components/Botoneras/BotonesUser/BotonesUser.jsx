import React from 'react';
import { connect } from 'react-redux'

//Importamos los estilos
import './BotonesUser.css';

class BotonesUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuShow: false,
        }
        console.log(this.props.user);
    }

    clickBackgroundMenu = async () => {
        await this.setState({
            menuShow: !this.state.menuShow
        })
    }

    logout = () => {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('redux_localstorage_simple');
        window.location.href = "/";
        console.log('mec')
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