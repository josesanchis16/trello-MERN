import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

//Importamos la store
import store from '../../../config/redux/store';

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
            objBoards: [],
            boards: [],
            staredBoards: [],
            imgs: [],
            isLoad: false,
        }
        this.list = React.createRef();
        this.boardName = React.createRef();
        this.btnAceptar = React.createRef();
        this.imagesLoaded = false;
        this.boardsLoaded = false;
    }

    async componentDidMount() {
        // Conseguimos las imagenes aleatorias para los fondos de pantalla
        if (process.env.NODE_ENV === 'production') {
            const res = await axios.get('https://api.unsplash.com/photos/random?count=6&client_id=24947b377516628f4f8c3d19940525dab1d5e734746767039ff261554f7b619d');
            for (let obj of res.data) {
                console.log(obj.urls);
                await this.setState({
                    imgs: [
                        ...this.state.imgs,
                        obj.urls.regular
                    ]
                });
            }
        }

        //Comprobamos que haya un usuario en la memoria
        if (this.props.user) {
            console.log(this.props.user);
            const userId = this.props.user._id;

            const boards = await axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/getUserBoards`, {
                userId
            });

            if (boards.data.length > 0) {
                await boards.data.map(async board => {

                    //Creamos la board para visualizarla
                    const boardHTML =
                        <div style={{ background: board.background }} className="board" key={board._id} id={board._id} onClick={this.lists}>
                            <p>{board.name}</p>
                            <p className="starDiv" onClick={this.staredBoard}>
                                <i style={{ color: (board.stared ? '#FFD800' : '#eee') }} className="fas fa-star starIcon" id={board._id} onClick={this.btnStared}></i>
                            </p>
                        </div>;

                    //Insertamos las que estan stared en su array correspondiente
                    if (board.stared) {
                        await this.setState({
                            staredBoards: [
                                boardHTML,
                                ...this.state.staredBoards,
                            ]
                        })
                    }

                    //Rellenamos la array general
                    await this.setState({
                        boards: [
                            boardHTML,
                            ...this.state.boards
                        ]
                    });

                    //Guardamos el array de objetos
                    await this.setState({
                        objBoards: [
                            ...this.state.objBoards,
                            board
                        ]
                    });
                });
                //Insertamos en redux todos los objetos
                try {
                    console.log(this.state.objBoards);
                    const arrObj = this.state.objBoards;
                    const action = {
                        type: 'LOADBOARDS',
                        payload: arrObj
                    }
                    await store.dispatch(action);
                } catch (e) {
                    console.log('Error: ' + e);
                }
                console.log('Se han cargado todas las boards');
            }
        }
    }

    lists = async (e) => {
        console.log(e.target);
        try {
            const action = {
                type: 'SETBOARDID',
                payload: e.target.id
            }
            await store.dispatch(action);
            console.log('Se ha seleccionado la tabla correctamente');
        } catch (e) {
            console.log('Error al seleccionar tabla: ' + e);
        }
        this.props.history.push('/boards/lists');
    }

    staredBoard = () => {
        console.log('stared');
    }

    newBoard = async () => {
        await this.setState({
            showDivNewBoard: true,
        });
        this.boardName.current.focus();
    }

    btnStared = (e) => {
        console.log(e.target.id);
    }

    actAceptar = async () => {
        const name = this.state.actualBoardName;
        const background = this.state.actualBoardColor;
        const stared = false;
        const admin = this.props.user._id;

        const res = await axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/createBoard`, {
            name,
            background,
            stared,
            admin
        });
        try {
            const action = {
                type: 'NEWBOARD',
                payload: res.data,
            }
            await store.dispatch(action);

            console.log('Se ha insertado la board en el redux');

            await this.setState({
                showDivNewBoard: false
            });
            this.props.history.push('/boards');
        } catch (e) {
            console.log('Error al guardar el tablero en Redux (errno: 33): ' + e);
        }

        /* Cambiar estas lineas, esto es un apaño chapuza */

        await this.setState({
            boards: [
                <div onClick={this.lists} style={{ background: res.data.background }} className="board" key={res.data._id} id={res.data._id}>
                    <p>{res.data.name}</p>
                    <p className="starDiv"><i className="fas fa-star starIcon" id={res.data.id} onClick={this.btnStared}></i></p>
                </div>,
                ...this.state.boards,
            ]
        });

        await this.setState({
            showDivNewBoard: false,
            actualBoardColor: '#eee',
        });

        /* Cambiar hasta esta linea */
    }

    // clearLastInput() {
    //     this.boardName.current.value = '';
    //     this.clearListSelection();
    // }

    clearListSelection() {
        let childNodesLength = this.list.current.childNodes;
        console.log(childNodesLength);
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
    }

    handleColor = async (event) => {
        this.clearListSelection();
        event.target.classList.add('colorSelected');
        var rgb = event.target.style.background;

        rgb = rgb.substring(4, rgb.length - 1)
            .replace(/ /g, '')
            .split(',');

        await this.setState({
            actualBoardColor: 'linear-gradient(to right, #0000008c, #92929255),' + this.rgbToHex(rgb[0], rgb[1], rgb[2])
        });
    }

    handleImage = async (event) => {
        this.clearListSelection();
        event.target.classList.add('colorSelected');
        await this.setState({
            actualBoardColor: 'linear-gradient(to right, #0000008c, #92929255),' + event.target.style.background
        });
    }

    rgbToHex(r, g, b) {
        return "#" + Number(r).toString(16) + Number(g).toString(16) + Number(b).toString(16);
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
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
                                <li style={{ background: '#57c348' }} className="actualBoardColor" onClick={this.handleColor}></li>
                                <li style={{ background: '#D766EE' }} className="actualBoardColor" onClick={this.handleColor}></li>
                                <li style={{ background: `url('${this.state.imgs[0]}')` }} className="imgBackground actualBoardColor" onClick={this.handleImage}></li>
                                <li style={{ background: `url('${this.state.imgs[1]}')` }} className="imgBackground actualBoardColor" onClick={this.handleImage}></li>
                                <li style={{ background: `url('${this.state.imgs[2]}')` }} className="imgBackground actualBoardColor" onClick={this.handleImage}></li>
                                <li style={{ background: `url('${this.state.imgs[3]}')` }} className="imgBackground actualBoardColor" onClick={this.handleImage}></li>
                                <li style={{ background: `url('${this.state.imgs[4]}')` }} className="imgBackground actualBoardColor" onClick={this.handleImage}></li>
                                <li style={{ background: `url('${this.state.imgs[5]}')` }} className="imgBackground actualBoardColor" onClick={this.handleImage}></li>
                            </ul>
                        </div>
                        <div className="previewBoard">
                            <div style={{ background: this.state.actualBoardColor }} className="board">
                                <p>{this.state.actualBoardName}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="divBotonAceptar">
                            <p style={{ 'display': this.state.actualBoardName ? 'none' : 'block' }} className="errorMsg">The name field cannot be empty</p>
                            <p ref={this.btnAceptar} onClick={this.actAceptar} className="btnAceptarEnabled" style={{ 'display': this.state.actualBoardName ? 'block' : 'none' }}>Aceptar</p>
                        </div>
                    </div>
                </div>
                <div className="divAllBoards">
                    {/* Stared boards */}
                    {this.state.staredBoards.length > 0 &&
                        <div className="staredBoards divBoards">
                            {/* <div className="divBusqueda">
                                <i class="fas fa-search"></i>
                            </div> */}
                            <div className="titleBoard">
                                <i className="fas fa-star icon"></i>
                                <h2>Stared boards</h2>
                            </div>
                            <div className=" boards">
                                {this.state.staredBoards}
                            </div>
                        </div>
                    }
                    {/* Personal boards */}
                    <div className="personalBoards divBoards">
                        {/* <div className="divBusqueda">
                            <i class="fas fa-search"></i>
                        </div> */}
                        <div className="titleBoard">
                            <i className="fas fa-user icon"></i>
                            <h2>Your boards</h2>
                        </div>
                        <div className=" boards">
                            {this.state.boards}
                            <div onClick={this.newBoard} className="boardPrincipal board">
                                <p>Create new Board</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        user: state.userReducer.loginToken,
        boards: state.boardsReducer.boards
    })
}

export default connect(mapStateToProps)(Boards);