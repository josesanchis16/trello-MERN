import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

//Importamos los settings
import settings from './../../../../../../config/settings';

//Importamos la estore
import store from './../../../../../../config/redux/store';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descripcion: this.props.board.description,
            toggleDescriptionInput: false,
        }
        this.descripcionIinput = React.createRef();
    }

    componentDidMount(){
        this.descripcionIinput.current.value = this.state.descripcion;
    }

    toggleInput = async () => {
        await this.setState({
            toggleDescriptionInput: !this.state.toggleDescriptionInput
        })
    }

    changeDescription = async () => {
        const description = this.state.descripcion;
        const boardId = this.props.board._id;

        const res = await Axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/changeDescription`, {
            description,
            boardId
        });

        const action = {
            type: 'SETBOARD',
            payload: res.data
        }
        await store.dispatch(action);

        await this.setState({
            toggleDescriptionInput: false,
        });
    }

    handleCahnge = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <div className="mainDescripcion">


                <div className="textDescription" style={{ display: this.state.toggleDescriptionInput ? 'none' : 'flex' }}>
                    {this.state.descripcion && <p onClick={this.toggleInput}>{this.state.descripcion}</p>}
                    {!this.state.descripcion && <p onClick={this.toggleInput}>Click here to change description! </p>}
                </div>
                <div className="inputDescription" style={{ display: this.state.toggleDescriptionInput ? 'block' : 'none' }}>
                    <div className="input">
                        <textarea placeholder="Type something..." name="descripcion" onChange={this.handleCahnge} ref={this.descripcionIinput}></textarea>
                    </div>
                    <div className="buttons divBtnAceptar">
                        <p onClick={this.changeDescription}>Accept</p>
                        <p onClick={this.toggleInput}>Cancel</p>
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

export default connect(mapStateToProps)(Description);