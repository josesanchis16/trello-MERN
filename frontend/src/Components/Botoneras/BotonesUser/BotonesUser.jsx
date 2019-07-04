import React from 'react';

class BotonesUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user.data,
        }
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