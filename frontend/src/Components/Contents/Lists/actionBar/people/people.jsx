import React from 'react';

import { connect } from 'react-redux';

class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: this.props.board.people,
            peoplePerson: []
        }
    }

    componentDidMount() {
        this.state.people.map(async person => {
            const html =
                <div className="person" key={person._id}>
                    <abbr title={'@' + person.nick}>
                    <img src={person.avatar} alt={person.avatar} />
                    </abbr>
                </div>;
            await this.setState({
                peoplePerson: [
                    ...this.state.peoplePerson,
                    html
                ]
            });
        });
    }

    render() {
        return (
            <div className="listPeople">
                {this.state.peoplePerson}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardsReducer.filter(board => board._id === state.boardsReducer[0].boardID)[0]
    }
}

export default connect(mapStateToProps)(People);