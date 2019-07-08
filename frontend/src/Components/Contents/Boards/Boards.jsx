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
            actualBoardName: '',
            actualBoardColor: '',
            showDivNewBoard: true,
            creationDivShow: true,
            boards: [],
        }
        this.list = React.createRef();
    }


    newBoard = async () => {
        console.log(this.props.user);
        const board = {
            id: new Date().getTime(),
            name: this.state.boardName,
            background: this.state.boardColor,
            stared: false,
            people: [],
            listas: [],
            descripcion: '',
            labels: [],
        }

        this.props.user.boards = [
            ...this.props.user.boards,
            board
        ]

        await this.setState({
            boards: [
                ...this.state.boards,
                <div className="board">
                    <p>{board.name}</p>
                </div>
            ]
        })

        console.log(this.state.boards);
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
            showDivNewBoard: !this.state.showDivNewBoard,
        })
    }

    handleChange = async (event) => {
        await this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }

    handleColor = async (event) => {
        let childNodesLength = this.list.current.childNodes;
        for (let child of childNodesLength) {
            child.classList.remove('colorSelected');
        }
        event.target.classList.add('colorSelected');
        console.log(event.target.background);
        await this.setState({
            actualBoardColor: event.target.background
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className="bodyContent">
                <div className="boardCreation" style={{ 'display': this.state.showDivNewBoard ? 'flex' : 'none' }}>
                    <div className="cerrarBoardCreation" onClick={this.cerrarBoardCreation}></div>
                    <div className="divBoardCreation">
                        <div className="btnCerrar" onClick={this.cerrarBoardCreation}>
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="divName">
                            <p>Board name:</p>
                            <input type="text" name='actualBoardName' onChange={this.handleChange} />
                        </div>
                        <hr />
                        <div className="divColorFondo">
                            <p>Background Color:</p>
                            <ul ref={this.list}>
                                <li className="actualBoardColor" onClick={this.handleColor}></li>
                                <li className="actualBoardColor" onClick={this.handleColor}></li>
                                <li className="actualBoardColor" onClick={this.handleColor}></li>
                                <li className="actualBoardColor" onClick={this.handleColor}></li>
                                <li className="actualBoardColor" onClick={this.handleColor}></li>
                            </ul>
                        </div>
                        <hr />
                        <div className="divBotonAceptar">
                            <p>Aceptar</p>
                        </div>
                    </div>
                </div>
                <div className="divBoards boards">
                    {this.state.boards}
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