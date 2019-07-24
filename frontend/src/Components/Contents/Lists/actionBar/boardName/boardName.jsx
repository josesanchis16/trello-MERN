import React from 'react';
import Axios from 'axios';

//Importamos las settings
import settings from '../../../../../config/settings';

class boardName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showName: false,
            boardName: this.props.board.name,
        }
        this.inputName = React.createRef();
        this.showName = React.createRef();
    }

    toggleInput = async () => {
        await this.setState({
            showName: !this.state.showName
        });

        this.inputName.current.value = this.state.boardName;
    }

    cancel = async () => {
        await this.setState({
            showName: !this.state.showName
        })
    }

    accept = async () => {

        const notify = await Axios.get(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/changeName/${this.props.board._id}/${this.inputName.current.value}`);

        await this.setState({
            showName: !this.state.showName
        });

        this.props.callback(notify.data);
    }

    handleChange = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="item changeName" style={{ display: this.state.showName ? 'flex' : 'none' }}>
                    <input type="text" ref={this.inputName} name="boardName" onChange={this.handleChange} />
                    <div className="botonera">
                        <i onClick={this.accept} className="fas fa-check"></i>
                        <i className="fas fa-times" onClick={this.cancel}></i>
                    </div>
                </div>
                <div className="tableName item" onClick={this.toggleInput} style={{ display: this.state.showName ? 'none' : 'flex' }}>
                    <div ref={this.showName}>{this.state.boardName}</div>
                </div>
            </div>
        )
    }
}

export default boardName;