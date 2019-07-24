import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

//Importamos la store
import store from '../../../../config/redux/store';

//Importamos las settings
import settings from '../../../../config/settings';

class newTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showNewTask: false
        }

        this.taskNameRef = React.createRef();
    }

    handleSubmit = async e => {
        await this.setState({
            showNewTask: !this.state.showNewTask
        });

        this.taskNameRef.current.focus();
    }

    createTask = (name, listId) => {
        return {
            _id: new Date().getTime(),
            board_id: this.props.board._id,
            list_id: listId,
            name: name,
            coments: [],
            members: [],
            checklist: [],
            fecha: '',
            attachment: []
        }
    }

    acceptAction = async(name) => {
        const taskName = name;

        const list = this.props.board.listas.filter(lista => lista._id === this.props.list_id)[0];

        const task = this.createTask(taskName, list._id);

        list.tareas.push(task);

        //ACtualizamos la lista
        await Axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/newTask`, {
            task
        });

        //Insertamos la task en la lista
        const action = {
            type: "NEWTASK",
            payload: task
        }
        store.dispatch(action);

        await this.setState({
            showNewTask: !this.state.showNewTask
        });

        this.props.callback('Task created');
    }

    handleInputTask = async (e) => {
        if (e.key === 'Enter') {
            this.acceptAction(e.target.value);
        }

        if (e.key === 'Escape') {

            await this.setState({
                showNewTask: !this.state.showNewTask
            });
        }
    }

    btnAceptar = () => {
        this.acceptAction(this.taskNameRef.current.value);
    }

    btnCancelar = async () => {
        this.taskNameRef.current.value = '';
        await this.setState({
            showNewTask : !this.state.showNewTask
        })
    }

    render() {
        return (
            <div className="newTask">
                <div className="newList" style={{ display: this.state.showNewTask ? 'block' : 'none' }}>
                    <div>
                        <div className="inputName">
                            <input ref={this.taskNameRef} onKeyUp={this.handleInputTask} type="text" name="taskName" id="test_name" />
                        </div>
                        <div className="divBtnAceptar">
                            <p onClick={this.btnAceptar}>Aceptar</p>
                            <p onClick={this.btnCancelar}>Cancel</p>
                        </div>
                    </div>
                </div>
                <p onClick={this.handleSubmit}  style={{ display: this.state.showNewTask ? 'none' : 'block' }} board_id={this.props.board._id} list_id={this.props.list_id}>+ Add new task</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardsReducer.filter(board => board._id === state.boardsReducer[0].boardID)[0],
    }
}

export default connect(mapStateToProps)(newTask);