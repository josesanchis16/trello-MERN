import React from 'react';

import { connect } from 'react-redux';

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
    }

    componentDidMount() {
        console.log('Estoy aqui: ' + this.props.location);
    }

    render() {
        return (
            <div className="">Prueba lists</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lists: state.boardsReducer
    }
}

export default connect(mapStateToProps)(Lists);