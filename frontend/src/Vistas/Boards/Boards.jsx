import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Importacion de componentes
import Header from '../../Components/Headers/Header';
import IndexContent from '../../Components/Contents/Index/Index';
import BoardsContent from '../../Components/Contents/Boards/Boards';

class Boards extends React.Component {

    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="page">
                <Header history={this.props.history} />
                <BoardsContent />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.loginToken
    };
};

export default connect(mapStateToProps)(Boards);