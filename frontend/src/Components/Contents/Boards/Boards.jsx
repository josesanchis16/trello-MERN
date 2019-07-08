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
            showDivNewBoard: false,
            boards: [],
        }
        this.list = React.createRef();
        this.boardName = React.createRef();
    }


    newBoard = async () => {
        await this.setState({
            showDivNewBoard: true,
        });
        this.boardName.current.focus();
    }

    actAceptar = async () => {
        const name = this.state.actualBoardName;
        const background = this.state.actualBoardColor;

        const board = {
            id: new Date().getTime(),
            name: name,
            background: background,
            stared: false,
            people: [],
            listas: [],
            descripcion: '',
            labels: [],
        }

        //enviar objeto a la base de datos
        //Enviar aqui
        //

        this.props.user.boards = [
            board,
            ...this.props.user.boards,
        ]

        const nombre = board.name;
        const backColor = board.background;
        await this.setState({
            boards: [
                <div style={{ background: backColor }} className="board" key={board.id}>
                    <p>{nombre}</p>
                </div>,
                ...this.state.boards,
            ]
        });

        await this.setState({
            showDivNewBoard: false,
            actualBoardColor: '#eee',
        });
        this.clearLastInput();
    }

    clearLastInput() {
        this.boardName.current.value = '';
        this.clearListSelection();
    }

    clearListSelection() {
        let childNodesLength = this.list.current.childNodes;
        for (let child of childNodesLength) {
            child.classList.remove('colorSelected');
        }
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
        this.clearListSelection();
        event.target.classList.add('colorSelected');
        var rgb = event.target.style.background;

        rgb = rgb.substring(4, rgb.length - 1)
            .replace(/ /g, '')
            .split(',');

        await this.setState({
            actualBoardColor: this.rgbToHex(rgb[0], rgb[1], rgb[2])
        });
        console.log(this.state);
    }

    rgbToHex(r, g, b) {
        return "#" + Number(r).toString(16) + Number(g).toString(16) + Number(b).toString(16);
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
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
                            <input ref={this.boardName} type="text" name='actualBoardName' onChange={this.handleChange} />
                        </div>
                        <hr />
                        <div className="divColorFondo">
                            <p>Background Color:</p>
                            <ul ref={this.list}>
                                <li style={{ background: '#F8A64A' }} className="actualBoardColor" onClick={this.handleColor}></li>
                                <li style={{ background: '#EA7070' }} className="actualBoardColor" onClick={this.handleColor}></li>
                                <li style={{ background: '#764AF8' }} className="actualBoardColor" onClick={this.handleColor}></li>
                                <li style={{ background: '#70C0EA' }} className="actualBoardColor" onClick={this.handleColor}></li>
                                <li style={{ background: '#7FEA70' }} className="actualBoardColor" onClick={this.handleColor}></li>
                            </ul>
                        </div>
                        <hr />
                        <div className="divBotonAceptar">
                            <p onClick={this.actAceptar}>Aceptar</p>
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