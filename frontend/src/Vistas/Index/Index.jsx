import React from 'react';
import { connect } from 'react-redux';

//Importacion de componentes
import Header from '../../Components/Headers/Header';
import IndexContent from '../../Components/Contents/Index/Index';
import BoardsContent from '../../Components/Contents/Boards/Boards';

//Importacion de estilos
import './Index.css';

class Index extends React.Component {

    render() {
        return (
            <div className="page">
                <Header user={this.props.user} />
                {this.props.user ? <BoardsContent user={this.props.user} /> : <IndexContent />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.loginToken
    };
};

export default connect(mapStateToProps)(Index);