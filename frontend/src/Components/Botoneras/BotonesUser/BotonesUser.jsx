import React from 'react';

//Importamos los estilos
import './BotonesUser.css';

class BotonesUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            menuShow: false,
        }
        console.log(this.state.user);
    }

    clickBackgroundMenu = async () => {
        await this.setState({
            menuShow: !this.state.menuShow
        })
    }

    render() {
        return (
            <div className="menuImagen">
                <div className="backgroundList" onClick={this.clickBackgroundMenu} style={{ 'display': this.state.menuShow ? 'block' : 'none' }}></div>
                <div className="btnImagen">
                    <img src={this.state.user.info.avatar} onClick={this.clickBackgroundMenu} alt="avatar" />
                    <div className="menuDesplegable" style={{ 'display': this.state.menuShow ? 'block' : 'none' }}>
                        <ul className="lista">
                            <li className="btnPerfil">Perfil</li>
                            <li className="btnLogout">Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default BotonesUser;