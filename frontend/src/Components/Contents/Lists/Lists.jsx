import React from 'react';
import { connect } from 'react-redux';

//Importamos los componentes
import NewList from './newList/newList';
import NewTask from './newTask/newTask';

//Importamos los estilos
import './Lists.css';

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            tasks: [],
        }
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

    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }

    render() {
        return (
            <div className="divLists" style={{ background: this.props.board.background }}>
                <div className="actionBar">
                    <div>
                        <div className="tableName item">
                            <div>{this.props.board.name}</div>
                        </div>
                        <div className="tableStar item">

                            <i className="far fa-star"></i>
                        </div>
                        <div className="tablePeople">
                            <div className="people item">
                                {this.state.people}
                            </div>
                            <div className="invitePeople item">
                                <p onClick={this.invitePeople}>Invite</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="moreOption item">+</p>
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