import React from 'react';

//Importacion de componentes
import Header from '../../Components/Headers/Header';
import RegisterBody from '../../Components/Contents/RegisterForm/Register';

class Register extends React.Component {
    render() {
        return (
            <div className="page">
                <Header />
                <dir className="bodyContent">
                    <RegisterBody history={this.props.history}/>
                </dir>
            </div>
        )
    }
}

export default Register;