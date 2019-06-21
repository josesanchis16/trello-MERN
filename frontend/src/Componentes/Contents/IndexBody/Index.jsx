import React from 'react';
import { Link } from 'react-router-dom';

//Importacion de estilo
import './Index.css';

class Index extends React.Component {
    render() {
        return (
            <div className="bodyContent">
                <section className="divIntro">
                    <div>
                        <img src="https://img.icons8.com/color/48/000000/carpet-man.png" alt="icon" />
                        <h2>Get started with TodoNow</h2>
                        <div className="divBotonera">
                            <Link to="/signup">Create an account!</Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Index;