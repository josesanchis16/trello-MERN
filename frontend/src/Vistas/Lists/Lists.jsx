import React from 'react';
import { connect } from 'react-redux';

//Importamos los componentes
import Header from '../../Components/Headers/Header';
import ListsContent from '../../Components/Contents/Lists/Lists';

class Lists extends React.Component {

    componentDidMount() {
        console.log(this.props.board);
    }
    render() {
        return (
            <div className="page">
                <Header history={this.props.history} />
                <ListsContent history={this.props.history} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardsReducer.filter(board => board._id === state.boardsReducer[0].boardID)[0]
    }
}

export default connect(mapStateToProps)(Lists);