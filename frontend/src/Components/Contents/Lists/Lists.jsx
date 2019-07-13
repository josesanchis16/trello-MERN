import React from 'react';

import { connect } from 'react-redux';

//Importamos los estilos
import './Lists.css';
import store from '../../../config/redux/store';
import Axios from 'axios';
import settings from '../../../config/settings';

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewListInput: false,
            lists: [],
            listName: '',
        }
        this.inputName = React.createRef();
    }

    componentDidMount() {
        console.log(this.props);
        this.props.board.listas.map(list => {
            // Aqui el hmtl de una lista previamente creada
        });
    }

    listHTML = (list) => {
        // <div className="list">
        //     <div className="listName">
        //         <p>{list.name}</p>
        //     </div>
        //     <div className="listTasks">
        //         <div className="task">
        //             <div className="taskName">
        //                 Esto es un texto largo para provar hasta donde podemos escribir el titulo de una tarea
        //                         </div>
        //             <hr />
        //             <div className="divThinks">
        //                 <i className="far fa-calendar-alt"></i>
        //                 <i className="fas fa-stream"></i>
        //                 <i className="far fa-comment"></i>
        //                 <i className="far fa-check-square"></i>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    }

    btnAceptar = async () => {

        if (this.state.listName.length > 0) {
            //const html = this.listHTML();

            const list = {
                parentID: this.props.board._id,
                name: this.state.listName,
                tareas: []
            };

            const newList = await Axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/newList`, {
                list
            });
            console.log(newList.data);

            // const action = {
            //     type: 'NEWLIST',
            //     payload: list
            // }
            // store.dispatch(action);

            console.log('Se ha dispachado la accion en la store');

            //action
        }

        await this.setState({
            showNewListInput: !this.state.showNewListInput
        });
    }

    btnCancelar = async () => {
        await this.setState({
            showNewListInput: !this.state.showNewListInput
        });
    }

    newList = async () => {
        await this.setState({
            showNewListInput: !this.state.showNewListInput
        });
        this.inputName.current.focus();
    }

    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }

    render() {
        return (
            <div className="divLists" style={{ background: this.props.board.background }}>
                <div className="allLists">
                    {/* Aqui las listas */}
                    <div className="list">
                        <div className="newList" style={{ display: this.state.showNewListInput ? 'flex' : 'none' }}>
                            <div>
                                <div className="inputName">
                                    <input ref={this.inputName} onChange={this.handleChange} type="text" name="listName" id="newListName" />
                                </div>
                                <div className="divBtnAceptar">
                                    <p onClick={this.btnAceptar}>Aceptar</p>
                                    <p onClick={this.btnCancelar}>Cancel</p>
                                </div>
                            </div>
                        </div>
                        <div className="btnNewList" onClick={this.newList} style={{ display: this.state.showNewListInput ? 'none' : 'block' }}>
                            <p>+ Add new list</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardsReducer.filter(board => board._id === state.boardsReducer[0].boardID)[0]
    }
}

export default connect(mapStateToProps)(Lists);