import React from 'react';
import Axios from 'axios';

import store from '../../../../config/redux/store';

import settings from '../../../../config/settings';

class newList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewListInput: false,
            listName: '',
        }
        this.inputName = React.createRef();
    }

    btnAceptar = async () => {

        const listName = this.inputName.current.value;
        console.log(listName);

        if (listName.length > 0) {
            //const html = this.listHTML();

            const list = {
                _id: new Date().getTime(),
                parentID: this.props.board._id,
                name: listName,
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
            
            this.props.callback();
        }

    }

    btnCancelar = async () => {
        await this.setState({
            showNewListInput: !this.state.showNewListInput
        });
    }

    newList = async () => {
        await this.setState({
            showNewListInput: !this.state.showNewListInput,
            listName : ''
        });
        this.inputName.current.focus();
    }

    render() {
        return (
            <div className="list" onClick={this.newList}>
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
                <div className="btnNewList" style={{ display: this.state.showNewListInput ? 'none' : 'block' }}>
                    <p>+ Add new list</p>
                </div>
            </div>
        )
    }
}

export default newList;