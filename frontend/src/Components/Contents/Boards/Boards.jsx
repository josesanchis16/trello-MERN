import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';

//Importamos los settings
import settings from '../../../config/settings';

//Importamos los estilos
import './Boards.css';

class Boards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            boardName: 'hola',
        }
    }
    newBoard = async () => {
        console.log(this.props);
        const boardName = this.state.boardName;
        await axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/addBoard/${this.props.user._id}`, {
            boardName  
        })
        .then(console.log);
    }
    
    handleChange = async(event) => await this.setState({[event.target.name]: event.target.value });

    render() {
        return (
            <div className="BoardsContent">
                <div className="divBoards boards">
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    {/* Aqui las otras tablas */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return({
        user: state.userReducer.loginToken,
    })
}

export default connect(mapStateToProps)(Boards);