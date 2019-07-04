import React from 'react';
import axios from 'axios';

//Importacion de componentes
import Header from '../../Components/Headers/Header';
import IndexContent from '../../Components/Contents/Index/Index';
import BoardsContent from '../../Components/Contents/Boards/Boards';

//Importamos los settings
import settings from '../../config/settings';

//Importacion de estilos
import './Index.css';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
        }
    }

    async componentDidMount() {
        let userToken = localStorage.getItem('loginToken');
        let user = await axios.get(`${settings.backend.host_backend}${settings.backend.port_backend}/getUserFromToken/${userToken}`);
        await this.setState({
            user: user
        })
        console.log('Esto es el usuario: ' + user);
    }

    render() {
        return (
            <div className="page">
                {this.state.user && <Header user={this.state.user} />}
                {!this.state.user && <IndexContent />}
                {this.state.user && <BoardsContent user={this.state.user} />}
            </div>
        )
    }
}

export default Index;