import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

//Importamos los settings
import settings from './../../../../../../config/settings';

//Importamos la estore
import store from './../../../../../../config/redux/store';

//Iimportamos los settings
class StaredBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stared: this.props.board.stared,
        }
    }

    toggleFavorite = async () => {
        const res = await Axios.get(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/staredBoard/${this.props.board._id}`);
        const action = {
            type: "SETBOARD",
            payload : res.data
        }
        store.dispatch(action);
        await this.setState({
            stared : !this.state.stared
        });
    }

    render() {
        return (
            <div className="setting staredBoard" onClick={this.toggleFavorite}>
                <div className="subDivSettingItem settingItem">
                    <i className="fas fa-star"></i>
                    {!this.state.stared && <p>Make favorite</p>}
                    {this.state.stared && <p>Unlike board</p>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardsReducer.filter(board => board._id === state.boardsReducer[0].boardID)[0]
    }
}

export default connect(mapStateToProps)(StaredBoard);