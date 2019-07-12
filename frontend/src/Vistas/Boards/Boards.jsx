import React from 'react';
import { connect } from 'react-redux';

//Importacion de componentes
import Header from '../../Components/Headers/Header';
import BoardsContent from '../../Components/Contents/Boards/Boards';

class Boards extends React.Component {

    componentDidMount() {
        if (!this.props.user.loginToken) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="page">
                <Header history={this.props.history} />
                <BoardsContent history={this.props.history} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
        
    };
};

export default connect(mapStateToProps)(Boards);