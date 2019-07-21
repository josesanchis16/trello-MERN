import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

//Importamos los componentes
import NewTask from '../newTask/newTask';

//Importamos los estilos
import './Lists.css';

import store from '../../../config/redux/store';

import settings from '../../../config/settings';

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewListInput: false,
            lists: [],
            tasks: [],
            listName: '',
        }
        this.inputName = React.createRef();
    }

    async componentDidMount() {
        this.cargarListas();
    }

    callbackChild = async () => {
        await this.cargarListas();
        return true;
    }

    cargarListas = async () => {
        if (this.props.board) {
            const allLists = [];
            this.props.board.listas.map((list, index) => {
                if (list.tareas.length > 0) {

                    const allTasks = [];
                    list.tareas.map((tarea, index) => {

                        //Insertamos todas las tareas
                        allTasks.push(
                            <div className="task" key={index}>
                                <div className="taskName">
                                    {tarea.name}
                                </div>
                            </div>
                        );
                    });
                    //Insertamos todas las listas con las tareas de cada lista
                    allLists.push(
                        <div className="list" key={index + allTasks.length}>
                            <div className="listName">
                                <p>{list.name}</p>
                            </div>
                            <div className="listTasks">
                                <div>
                                    {allTasks}
                                </div>
                            </div>
                            <NewTask list_id={list._id} callback={this.callbackChild} />
                        </div>
                    );
                } else {
                    allLists.push(
                        <div className="list">
                            <div className="listName">
                                <p>{list.name}</p>
                            </div>
                            <NewTask list_id={list._id} callback={this.callbackChild} />
                        </div>
                    )
                }
            });

            await this.setState({
                lists: allLists
            })

        }
    }

    btnAceptar = async () => {

        if (this.state.listName.length > 0) {
            //const html = this.listHTML();

            const list = {
                _id: new Date().getTime(),
                parentID: this.props.board._id,
                name: this.state.listName,
                tareas: []
            };

            const newBoard = await Axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/newList`, {
                list
            });
            console.log(newBoard.data);
            if (newBoard.data) console.log('Se ha insertado en la base de datos');

            const action = {
                type: 'NEWLIST',
                payload: newBoard.data
            }
            store.dispatch(action);

            console.log('Se ha dispachado la accion en la store');

            //Tarea actual
            const tarea = this.props.board.listas[this.props.board.listas.length - 1];

            const listHTML =
                <div className="list">
                    <div className="listName">
                        <p>{tarea.name}</p>
                    </div>
                    <NewTask list_id={list._id} callback={this.callbackChild} />
                </div>;


            await this.setState({
                showNewListInput: !this.state.showNewListInput,
                lists: [...this.state.lists, listHTML]
            });

        }

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
                    {this.state.lists}
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