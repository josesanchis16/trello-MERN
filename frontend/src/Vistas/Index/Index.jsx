import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Importacion de componentes
import Header from '../../Components/Headers/Header';
import IndexContent from '../../Components/Contents/Index/Index';

class Index extends React.Component {

    componentDidMount() {
        if (this.props.user) {
            this.props.history.push('/boards');
        }
    }

    render() {
        return (
            <div className="page">
                <Header history={this.props.history} />
                {this.props.user ? <Link to="/boards" /> : <IndexContent />}
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