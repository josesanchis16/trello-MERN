import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

//Importamos los componentes
import NewList from './newList/newList';
import NewTask from './newTask/newTask';
import SettingsBar from './actionBar/settingsBar/settings';
import People from './actionBar/people/people';

import BoardName from './actionBar/boardName/boardName';

//Importamos los settings
import settings from './../../../config/settings';

//Importamos la store
import store from './../../../config/redux/store';

//Importamos los estilos
import './Lists.css';

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            tasks: [],
            notification: '',
            showSettings: false
        }
    }

    async componentDidMount() {
        this.cargarListas();
    }

    callbackChild = async (notify) => {
        await this.setState({
            notification: notify
        });
        this.cargarListas();
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

    toggleFavorite = async () => {
        const res = await Axios.get(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/staredBoard/${this.props.board._id}`);
        const action = {
            type: "SETBOARD",
            payload: res.data
        }
        store.dispatch(action);
        await this.setState({
            stared: !this.state.stared
        });
    }

    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }

    showSettings = async () => {
        await this.setState({
            showSettings: !this.state.showSettings
        })
    }

    render() {
        return (
            <div className="divLists" style={{ background: this.props.board.background }}>
                {this.state.notification &&
                    <div className="notification" >
                        <p>{this.state.notification}</p>
                    </div>}

                {this.state.showSettings &&
                    <SettingsBar toggleSettings={this.showSettings} history={this.props.history} />}
                <div className="actionBar">
                    <div>
                        <BoardName board={this.props.board} callback={this.callbackChild} />
                        <div className="tableStar item pc" onClick={this.toggleFavorite}>
                            <div>
                                <i className="fas fa-star" style={{ color: this.props.board.stared ? '#ff9900' : '' }}></i>
                            </div>
                        </div>
                        <div className="tablePeople pc">
                            <div className="people item">
                                <People />
                            </div>
                            <div className="invitePeople item pc">
                                <p onClick={this.invitePeople}>Invite</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p onClick={this.showSettings} className="moreOption item">
                            <i className="fas fa-cog"></i>
                        </p>
                    </div>
                </div>
                <div className="allLists">
                    {/* Aqui las listas */}
                    {this.state.lists}
                    <NewList callback={this.callbackChild} board={this.props.board} />
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