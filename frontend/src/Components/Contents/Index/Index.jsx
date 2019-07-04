import React from 'react';

import { Link } from 'react-router-dom';

class Index extends React.Component {
    render() {
        return (
            <div className="bodyContent">
                <section className="divInnerWindow">
                    <img src="https://img.icons8.com/color/48/000000/carpet-man.png" alt="icon" />
                    <h2>Get started with TodoNow</h2>
                    <div className="divBotonera">
                        <button><Link to="/signup">Create an account!</Link></button>
                    </div>
                </section>
            </div>
        );
    }
}

export default Index;