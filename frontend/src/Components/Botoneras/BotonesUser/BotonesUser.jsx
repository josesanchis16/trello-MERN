import React from 'react';

class BotonesUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
        }
        console.log(this.state.user);
    }

    render() {
        return (
            <div>
                {this.state.user && this.state.user.info.avatar}
            </div>
        );
    }
}

export default BotonesUser;