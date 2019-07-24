import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

//Imporatmos los settings
import settings from './../../../../../config/settings';

//Importamos los componentes
import Descripcion from './description/description';

class SettingsBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteSecurity: false
        }
    }

    deleteBoard = async () => {
        await this.setState({
            showDeleteSecurity: true,
        })
    }

    eraseBoard = async () => {
        const boardId = this.props.board._id;
        const res = await Axios.post(`${settings.backend.host_backend}${settings.backend.port_backend}/boards/deleteBoard`, {
            boardId
        });

        if (res.data){
            this.props.history.push('/');
        }
    }

    deleteCancel = async () => {
        await this.setState({
            showDeleteSecurity: false
        })
    }

    render() {
        return (
            <div className="settingsBar">
                <div onClick={this.props.toggleSettings} className="closeBtn">
                    <i className="fas fa-times"></i>
                </div>
                <div className="settingsButtons">
                    <div className="description buttonItem">
                        <h3>Description</h3>
                        <Descripcion />
                    </div>
                    <div className="settings buttonItem">
                        <h3>Settings</h3>
                        <div className="setting staredBoard">
                            <div className="subDivSettingItem settingItem">
                                <i className="fas fa-star"></i>
                                <p>Make board favorite</p>
                            </div>
                        </div>
                        <div className="setting peopleInvited">
                            <div className="subDivSettingItem settingItem">
                                <div className="subDivPeople">

                                </div>
                                <div className="subDivInvitation">
                                    <a href="">Invite</a>
                                </div>
                            </div>
                        </div>
                        <div className="setting changeBackground">
                            <div className="subDivSettingItem settingItem">
                                <i className="fas fa-image"></i>
                                <p>Change Background</p>
                            </div>
                        </div>
                        <div className="setting labels">
                            <div className="subDivSettingItem settingItem">
                                <i className="fas fa-tag"></i>
                                <p>Labels</p>
                            </div>
                        </div>
                        <div className="setting boardLink">
                            <div className="subDivSettingItem settingItem">
                                <p>Lint to board</p>
                                <div className="inputLink">
                                    <input type="text" value="https://todonow-mern.herokuapp.com/fljkfn14kj1" disabled />
                                    <i className="fas fa-clipboard"></i>
                                </div>
                            </div>
                        </div>
                        <hr />
                        {!this.state.showDeleteSecurity &&
                            <div onClick={this.deleteBoard} className="setting deleteBoard">
                                <div className="subDivSettingItem settingItem">
                                    <i className="fas fa-trash"></i>
                                    <p>Delete board</p>
                                </div>
                            </div>}
                        {this.state.showDeleteSecurity &&
                            <div className="setting confirmDeleteBoard">
                                <h3>Delete board?</h3>
                                <div onClick={this.deleteCancel} className="subDivSettingItem settingItem">
                                    <i className="fas fa-times"></i>
                                    <p>No</p>
                                </div>
                                <div onClick={this.eraseBoard} className="subDivSettingItem settingItem">
                                    <i className="fas fa-check"></i>
                                    <p>Yes</p>
                                </div>
                            </div>
                        }
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

export default connect(mapStateToProps)(SettingsBar);