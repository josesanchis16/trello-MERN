import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

// import store from '../../../config/redux/store';

//Importamos los settings
import settings from '../../../config/settings';

//Importamos los estilos
import './Boards.css';

class Boards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardName: 'hola',
            showDivNewBoard: true,
            creationDivShow: true,
        }
    }
    newBoard = async () => {
        // console.log(this.props);

        // const boardName = this.state.boardName;
        // await axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/addBoard/${this.props.user._id}`, {
        //     boardName
        // })
        //     .then(res => {
        //         console.log(res);
        //         // try {
        //         //     const action = {
        //         //         type: 'NEWBOARD',
        //         //         payload: res.data
        //         //     }
        //         //     store.dispatch(action);
        //         // } catch (e) {
        //         //     console.log(e);
        //         // }
        //     });
    }

    cerrarBoardCreation = async () => {
        await this.setState({
            showDivNewBoard : !this.state.showDivNewBoard,
        })
    }

    handleChange = async (event) => await this.setState({ [event.target.name]: event.target.value });

    render() {
        return (
            <div className="BoardsContent">
                <div className="boardCreation" style={{ 'display': this.state.showDivNewBoard ? 'flex' : 'none' }}>
                    <div className="cerrarBoardCreation" onClick={this.cerrarBoardCreation}></div>
                    <div className="divBoardCreation">
                        <div className="btnCerrar" onClick={this.cerrarBoardCreation}>
                            <i class="fas fa-times"></i>
                        </div>
                        <div className="divName">
                            <p>Board name:</p>
                            <input type="text" />
                        </div>
                        <hr />
                        <div className="divColorFondo">
                            <p>Background Color:</p>
                            <ul>
                                <li id="color1">
                                    <div className="color1"></div>
                                </li>
                                <li id="color2">
                                    <div className="color2"></div>
                                </li>
                                <li id="color3">
                                    <div className="color3"></div>
                                </li>
                                <li id="color4">
                                    <div className="color4"></div>
                                </li>
                                <li id="color5">
                                    <div className="color5"></div>
                                </li>
                            </ul>
                        </div>
                        <hr />
                        <div className="divBotonAceptar">
                            <p>Aceptar</p>
                        </div>
                    </div>
                </div>
                <div className="divBoards boards">
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
                    <div onClick={this.newBoard} className="boardPrincipal board">
                        <p>Create new Board</p>
                    </div>
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
    return ({
        user: state.userReducer.loginToken,
    })
}

export default connect(mapStateToProps)(Boards);